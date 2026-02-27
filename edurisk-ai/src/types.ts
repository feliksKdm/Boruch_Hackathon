export enum StudentOutcome {
  DROPOUT = "Dropout",
  ENROLLED = "Enrolled",
  GRADUATE = "Graduate",
}

export interface StudentData {
  // Demographics
  ageAtEnrollment: number;
  gender: "Male" | "Female";
  nationality: string;
  displaced: boolean;
  educationalSpecialNeeds: boolean;
  
  // Socio-economic
  debtor: boolean;
  tuitionFeesUpToDate: boolean;
  scholarshipHolder: boolean;
  parentalEducation: "None" | "Primary" | "Secondary" | "Higher";
  
  // Academic (1st Semester)
  unitsEnrolled1st: number;
  unitsApproved1st: number;
  unitsEvaluated1st: number;
  unitsWithoutEvaluations1st: number;
  gradeAverage1st: number;
  
  // Macroeconomic
  unemploymentRate: number;
  inflationRate: number;
  gdp: number;
}

export interface PredictionResult {
  outcome: StudentOutcome;
  confidence: number;
  riskScore: number; // 0-100
  probabilities: {
    [key in StudentOutcome]: number;
  };
  reasoning: string;
  recommendations: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  data: StudentData;
  prediction?: PredictionResult;
  lastUpdated: string;
}

export interface DashboardStats {
  totalStudents: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  averageRiskScore: number;
  outcomeDistribution: {
    [key in StudentOutcome]: number;
  };
}
