import { GoogleGenAI, Type } from "@google/genai";
import { StudentData, PredictionResult, StudentOutcome } from "../types";

const GEMINI_MODEL = "gemini-3-flash-preview";

export async function predictStudentOutcome(data: StudentData): Promise<PredictionResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  // Feature Engineering as described in the prompt
  const approvalRate = data.unitsEnrolled1st > 0 ? data.unitsApproved1st / data.unitsEnrolled1st : 0;
  const successRatio = data.unitsEvaluated1st > 0 ? data.unitsApproved1st / data.unitsEvaluated1st : 0;
  const noEvaluationRate = data.unitsEnrolled1st > 0 ? data.unitsWithoutEvaluations1st / data.unitsEnrolled1st : 0;

  const prompt = `
    Act as a specialized Student Outcome Prediction Model (XGBoost simulation).
    Analyze the following student data from their first semester to predict their academic outcome: Dropout, Enrolled, or Graduate.
    
    Student Data:
    - Age: ${data.ageAtEnrollment}
    - Gender: ${data.gender}
    - Debtor: ${data.debtor}
    - Tuition Up to Date: ${data.tuitionFeesUpToDate}
    - Scholarship: ${data.scholarshipHolder}
    - 1st Sem Units Enrolled: ${data.unitsEnrolled1st}
    - 1st Sem Units Approved: ${data.unitsApproved1st}
    - 1st Sem Grade Average: ${data.gradeAverage1st}
    - Approval Rate: ${approvalRate.toFixed(2)}
    - Success Ratio: ${successRatio.toFixed(2)}
    - No Evaluation Rate: ${noEvaluationRate.toFixed(2)}
    - Macro: GDP ${data.gdp}, Unemployment ${data.unemploymentRate}%
    
    Logic Guidelines:
    1. High Dropout Risk: Low approval rates (<0.5), tuition not up to date, debtor status, high age at enrollment.
    2. High Graduate Probability: High approval rates (>0.8), scholarship holder, tuition up to date.
    3. Enrolled: Moderate performance, still in the system.
    
    Calculate a Risk Score (0-100%) specifically for 'Dropout'.
    Provide a probability distribution across all three classes.
  `;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          outcome: { type: Type.STRING, enum: Object.values(StudentOutcome) },
          confidence: { type: Type.NUMBER },
          riskScore: { type: Type.NUMBER },
          probabilities: {
            type: Type.OBJECT,
            properties: {
              [StudentOutcome.DROPOUT]: { type: Type.NUMBER },
              [StudentOutcome.ENROLLED]: { type: Type.NUMBER },
              [StudentOutcome.GRADUATE]: { type: Type.NUMBER },
            },
            required: [StudentOutcome.DROPOUT, StudentOutcome.ENROLLED, StudentOutcome.GRADUATE],
          },
          reasoning: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["outcome", "confidence", "riskScore", "probabilities", "reasoning", "recommendations"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse prediction result", e);
    throw new Error("Prediction failed");
  }
}
