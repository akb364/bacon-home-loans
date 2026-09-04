import Decimal from "decimal.js";
import type { BuyingPowerScenarioInput, BuyingPowerScenarioResult, BuyingPowerSharedAssumptions, ScenarioDifference } from "./types";

const D = (value: Decimal.Value) => new Decimal(value);
const money = (value: Decimal.Value) => D(value).toDecimalPlaces(2).toNumber();
const nonnegative = (value: number, name: string) => { if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative number`); return D(value); };

export function calculateLoanAmount(price: number, downPayment: number): number { return money(Decimal.max(0, nonnegative(price, "Purchase price").minus(nonnegative(downPayment, "Down payment")))); }
export function calculateMonthlyPrincipalAndInterest(principal: number, annualRate: number, termYears: number): number {
  const loan = nonnegative(principal, "Loan amount"); const rate = nonnegative(annualRate, "Interest rate").div(100).div(12);
  if (!Number.isFinite(termYears) || termYears <= 0) throw new Error("Loan term must be greater than zero");
  const periods = termYears * 12; if (loan.eq(0)) return 0; if (rate.eq(0)) return money(loan.div(periods));
  const factor = rate.plus(1).pow(periods); return money(loan.mul(rate).mul(factor).div(factor.minus(1)));
}
export function calculateRemainingLoanBalance(principal: number, annualRate: number, termYears: number, paymentsMade: number): number {
  const loan = nonnegative(principal, "Loan amount"); const rate = nonnegative(annualRate, "Interest rate").div(100).div(12); const periods = termYears * 12;
  const paid = Math.min(Math.max(0, Math.floor(paymentsMade)), periods); if (paid >= periods || loan.eq(0)) return 0;
  if (rate.eq(0)) return money(loan.mul(D(1).minus(D(paid).div(periods)))); const factor = rate.plus(1);
  return money(loan.mul(factor.pow(periods).minus(factor.pow(paid))).div(factor.pow(periods).minus(1)));
}
export function calculateScenario(scenario: BuyingPowerScenarioInput, shared: BuyingPowerSharedAssumptions): BuyingPowerScenarioResult {
  const price = nonnegative(scenario.purchasePrice, "Purchase price"); const override = scenario.overrides;
  const inherited = <T>(key: keyof typeof override, fallback: T): T => (override[key] ?? fallback) as T;
  const origin = (key: keyof typeof override) => override[key] === undefined ? "inherited" as const : "overridden" as const;
  const downPayment = override.downPaymentAmount === undefined ? price.mul(shared.downPaymentPercent).div(100) : nonnegative(override.downPaymentAmount, "Down payment");
  const loanAmount = D(calculateLoanAmount(price.toNumber(), downPayment.toNumber())); const rate = inherited("interestRate", shared.interestRate);
  const taxes = D(inherited("annualPropertyTaxes", shared.annualPropertyTaxes)).div(12); const insurance = D(inherited("annualHomeownersInsurance", shared.annualHomeownersInsurance)).div(12);
  const mi = D(inherited("monthlyMortgageInsurance", shared.monthlyMortgageInsurance)); const hoa = D(inherited("monthlyHoa", shared.monthlyHoa));
  const pi = D(calculateMonthlyPrincipalAndInterest(loanAmount.toNumber(), rate, shared.termYears)); const payment = pi.plus(taxes).plus(insurance).plus(mi).plus(hoa);
  const closing = D(inherited("closingCosts", shared.closingCosts)); const concessions = D(inherited("sellerConcessions", shared.sellerConcessions)); const points = loanAmount.mul(shared.discountPointsPercent).div(100);
  const modeledCreditCapacity = closing.plus(shared.prepaidEscrows).plus(points); const appliedConcessions = Decimal.min(concessions, modeledCreditCapacity); const unusedCredit = Decimal.max(0, concessions.minus(modeledCreditCapacity));
  const cash = Decimal.max(0, downPayment.plus(closing).plus(shared.prepaidEscrows).plus(points).minus(appliedConcessions).minus(shared.lenderCredits));
  const holdingPayments = shared.holdingPeriodYears * 12; const remaining = D(calculateRemainingLoanBalance(loanAmount.toNumber(), rate, shared.termYears, holdingPayments));
  const principalPaid = loanAmount.minus(remaining); const totalPayments = pi.mul(Math.min(holdingPayments, shared.termYears * 12)); const interestPaid = Decimal.max(0, totalPayments.minus(principalPaid));
  return { id: scenario.id, name: scenario.name, notes: scenario.notes, purchasePrice: money(price), downPayment: money(downPayment), loanAmount: money(loanAmount), ltvPercent: price.gt(0) ? money(loanAmount.div(price).mul(100)) : null,
    interestRate: rate, apr: override.apr ?? shared.apr, monthlyPrincipalAndInterest: money(pi), monthlyTaxes: money(taxes), monthlyInsurance: money(insurance), monthlyMortgageInsurance: money(mi), monthlyHoa: money(hoa), totalMonthlyHousingPayment: money(payment),
    closingCosts: money(closing), prepaidEscrows: money(shared.prepaidEscrows), discountPoints: money(points), sellerConcessions: money(concessions), lenderCredits: money(shared.lenderCredits), cashToClose: money(cash), potentialUnusedSellerCredit: money(unusedCredit),
    remainingBalanceAtHoldingPeriod: money(remaining), principalPaidAtHoldingPeriod: money(principalPaid), interestPaidAtHoldingPeriod: money(interestPaid), targetPaymentDifference: shared.targetMonthlyPayment === null ? null : money(payment.minus(shared.targetMonthlyPayment)),
    origins: { purchasePrice: "manual", downPayment: override.downPaymentAmount === undefined ? "calculated" : "overridden", interestRate: origin("interestRate"), apr: origin("apr"), propertyTaxes: origin("annualPropertyTaxes"), homeownersInsurance: origin("annualHomeownersInsurance"), mortgageInsurance: origin("monthlyMortgageInsurance"), hoa: origin("monthlyHoa"), closingCosts: origin("closingCosts"), sellerConcessions: origin("sellerConcessions") } };
}
export function calculateScenarioDifference(current: BuyingPowerScenarioResult, prior: BuyingPowerScenarioResult): ScenarioDifference { return { purchasePrice: money(D(current.purchasePrice).minus(prior.purchasePrice)), loanAmount: money(D(current.loanAmount).minus(prior.loanAmount)), monthlyPayment: money(D(current.totalMonthlyHousingPayment).minus(prior.totalMonthlyHousingPayment)), cashToClose: money(D(current.cashToClose).minus(prior.cashToClose)) }; }
