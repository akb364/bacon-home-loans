import Decimal from "decimal.js";
import type { LoanAssumptions, MortgageResult } from "@/domain/loan";
import { calculateLoanAmount, calculateMonthlyPrincipalAndInterest, money } from "./mortgage-primitives";

/** Generic estimator only. Program-specific fees and eligibility are intentionally not inferred. */
export function calculateMortgage(input: LoanAssumptions): MortgageResult {
  const price = new Decimal(input.purchasePrice);
  const downPayment = price.mul(input.downPaymentPercent).div(100);
  const loanAmount = calculateLoanAmount(input.purchasePrice, downPayment.toNumber());
  const principalAndInterest = calculateMonthlyPrincipalAndInterest(loanAmount, input.annualInterestRate, input.termYears);
  const taxes = new Decimal(input.annualPropertyTaxes).div(12);
  const insurance = new Decimal(input.annualHomeownersInsurance).div(12);
  const piti = new Decimal(principalAndInterest).plus(taxes).plus(insurance).plus(input.monthlyMortgageInsurance);
  const housing = piti.plus(input.monthlyHoa);
  const points = new Decimal(loanAmount).mul(input.discountPoints).div(100);
  const eligibleCosts = new Decimal(input.closingCosts).plus(points);
  const sellerApplied = Decimal.min(input.sellerConcessions, eligibleCosts);
  const afterSeller = Decimal.max(0, eligibleCosts.minus(sellerApplied));
  const lenderApplied = Decimal.min(input.lenderCredits, afterSeller);
  const cashToClose = downPayment.plus(afterSeller.minus(lenderApplied));
  return { downPayment: money(downPayment), loanAmount: money(loanAmount), monthlyPrincipalAndInterest: money(principalAndInterest), monthlyTaxes: money(taxes), monthlyInsurance: money(insurance), monthlyMortgageInsurance: money(input.monthlyMortgageInsurance), monthlyHoa: money(input.monthlyHoa), estimatedPiti: money(piti), estimatedTotalHousingPayment: money(housing), estimatedCashToClose: money(Decimal.max(0, cashToClose)) };
}
