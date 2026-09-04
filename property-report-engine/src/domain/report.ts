import type { LoanAssumptions, MortgageResult } from "./loan";
import type { NormalizedProperty } from "./property";

export type ScoreCategory =
  | "priceVsMarket"
  | "affordability"
  | "appreciation"
  | "rentalPotential"
  | "marketConditions"
  | "taxesAndHoa";

export interface ScoreWeight {
  category: ScoreCategory;
  weight: number;
}

export interface CategoryScore {
  category: ScoreCategory;
  score: number | null;
  grade: string;
  explanation: string;
}

export interface ReportCardResult {
  overallScore: number | null;
  overallGrade: string;
  categories: CategoryScore[];
  narrative: string;
}

export interface PropertyReportSnapshot {
  id: string;
  createdAt: string;
  property: NormalizedProperty;
  loanAssumptions: LoanAssumptions;
  mortgage: MortgageResult;
  reportCard: ReportCardResult;
  scoringWeights: ScoreWeight[];
}
