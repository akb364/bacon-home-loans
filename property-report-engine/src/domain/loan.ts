export type LoanProgram = "conventional" | "fha" | "va" | "usda" | "other";

export interface LoanAssumptions {
  purchasePrice: number;
  downPaymentPercent: number;
  annualInterestRate: number;
  apr?: number;
  termYears: number;
  annualPropertyTaxes: number;
  annualHomeownersInsurance: number;
  monthlyMortgageInsurance: number;
  monthlyHoa: number;
  sellerConcessions: number;
  closingCosts: number;
  discountPoints: number;
  lenderCredits: number;
  program: LoanProgram;
}

export interface MortgageResult {
  downPayment: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyMortgageInsurance: number;
  monthlyHoa: number;
  estimatedPiti: number;
  estimatedTotalHousingPayment: number;
  estimatedCashToClose: number;
}
