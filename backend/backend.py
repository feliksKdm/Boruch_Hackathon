from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import Dict, Any
import joblib
import pandas as pd
import numpy as np
import io

# helper functions (copied from predict.py) to avoid import issues

def clean_column_names(df: pd.DataFrame, rename_dict: dict) -> pd.DataFrame:
    df = df.copy()
    return df.rename(columns=rename_dict)


def add_feature_engineering(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # sem1 rates
    if {"sem1_enrolled", "sem1_approved"}.issubset(df.columns):
        df["sem1_approval_rate"] = df["sem1_approved"] / df["sem1_enrolled"].replace({0: np.nan})

    if {"sem1_evaluations", "sem1_approved"}.issubset(df.columns):
        df["sem1_success_ratio"] = df["sem1_approved"] / df["sem1_evaluations"].replace({0: np.nan})

    if {"sem1_without_eval", "sem1_enrolled"}.issubset(df.columns):
        df["sem1_noeval_rate"] = df["sem1_without_eval"] / df["sem1_enrolled"].replace({0: np.nan})

    # sem2 rates
    if {"sem2_enrolled", "sem2_approved"}.issubset(df.columns):
        df["sem2_approval_rate"] = df["sem2_approved"] / df["sem2_enrolled"].replace({0: np.nan})

    if {"sem2_evaluations", "sem2_approved"}.issubset(df.columns):
        df["sem2_success_ratio"] = df["sem2_approved"] / df["sem2_evaluations"].replace({0: np.nan})

    if {"sem2_without_eval", "sem2_enrolled"}.issubset(df.columns):
        df["sem2_noeval_rate"] = df["sem2_without_eval"] / df["sem2_enrolled"].replace({0: np.nan})

    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    return df

app = FastAPI(title="Student Success Predictor")

model_bundle = None

@app.on_event("startup")
def load_model():
    global model_bundle
    try:
        model_bundle = joblib.load("student_success_multiclass.pkl")
        print("Loaded model bundle")
    except Exception as e:
        # startup failures should be visible in logs
        print(f"Failed to load model: {e}")
        model_bundle = None


@app.post("/predict")
def predict(student: Dict[str, Any]):
    """Single-student prediction. Accepts a JSON object with feature keys (snake_case)."""
    if model_bundle is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # convert to DataFrame for consistency with training pipeline
    X = pd.DataFrame([student])
    X = add_feature_engineering(X)

    pipe = model_bundle["pipeline"]
    classes = model_bundle["classes"]

    prob = pipe.predict_proba(X)[0]
    idx = int(np.argmax(prob))

    prediction = classes[idx]
    confidence = float(prob[idx]) * 100

    dropout_idx = classes.index("Dropout")
    dropout_risk = float(prob[dropout_idx]) * 100

    return {
        "prediction": prediction,
        "confidence": round(confidence, 1),
        "dropout_risk_score": round(dropout_risk, 1),
        "probs_percent": {classes[i]: round(float(prob[i]) * 100, 1) for i in range(len(classes))},
    }


@app.post("/predict_csv")
async def predict_csv(file: UploadFile = File(...)):
    """Batch prediction from uploaded CSV file. Returns a CSV with extra columns added."""
    if model_bundle is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    content = await file.read()
    try:
        df = pd.read_csv(io.StringIO(content.decode("utf-8")))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not parse CSV: {e}")

    # apply same cleaning/engineering as training
    rename_dict = model_bundle.get("rename_dict", {})
    df = clean_column_names(df, rename_dict)
    df = add_feature_engineering(df)

    if "target" in df.columns:
        df_features = df.drop(columns=["target"])
    else:
        df_features = df

    pipe = model_bundle["pipeline"]
    classes = model_bundle["classes"]

    probs = pipe.predict_proba(df_features)
    preds = np.argmax(probs, axis=1)

    pred_labels = [classes[i] for i in preds]
    confidence = np.max(probs, axis=1) * 100

    dropout_idx = classes.index("Dropout")
    dropout_risk = probs[:, dropout_idx] * 100

    out = df.copy()
    out["prediction"] = pred_labels
    out["confidence"] = np.round(confidence, 1)
    out["dropout_risk_score"] = np.round(dropout_risk, 1)
    for i, c in enumerate(classes):
        out[f"prob_{c.lower()}"] = np.round(probs[:, i] * 100, 1)

    stream = io.StringIO()
    out.to_csv(stream, index=False)
    stream.seek(0)

    filename = f"predictions_{file.filename}"
    return StreamingResponse(iter([stream.getvalue()]), media_type="text/csv", headers={"Content-Disposition": f"attachment; filename=\"{filename}\""})


from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

# mount a static directory (optional, for future assets)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def root():
    # serve the simple frontend page
    try:
        with open("frontend.html", "r", encoding="utf-8") as f:
            return HTMLResponse(f.read())
    except FileNotFoundError:
        return HTMLResponse("<h1>Frontend not found</h1>", status_code=404)
