import Decimal from "decimal.js";
import { calculateLoanAmount, calculateMonthlyPrincipalAndInterest, calculateRemainingLoanBalance, money, nonnegative } from "@/calculations/mortgage-primitives";
import type { BuyingPowerScenarioInput, BuyingPowerScenarioResult, BuyingPowerSharedAssumptions, PaymentInclusions, ScenarioDifference } from "./types";

export { calculateLoanAmount, calculateMonthlyPrincipalAndInterest, calculateRemainingLoanBalance } from "@/calculations/mortgage-primitives";
const D = (value: Decimal.Value) => new Decimal(value);
const ALL_INCLUDED: PaymentInclusions = { propertyTaxes: true, homeownersInsurance: true, mortgageInsurance: true, hoa: true };

export function formatPercent(value: number) { return `${Number(value.toFixed(3))}%`; }

export function calculateScenario(scenario: BuyingPowerScenarioInput, shared: BuyingPowerSharedAssumptions, inclusions: PaymentInclusions = ALL_INCLUDED): BuyingPowerScenarioResult {
  const price = nonnegative(scenario.purchasePrice, "Purchase price");
  const override = scenario.overrides;
  const inherited = <T>(key: keyof typeof override, fallback: T): T => (override[key] ?? fallback) as T;
  const origin = (key: keyof typeof override) => override[key] === undefined ? "inherited" as const : "overridden" as const;
  const downPaymentPercent = inherited("downPaymentPercent", shared.defaultDownPaymentPercent);
  const downPayment = price.mul(nonnegative(downPaymentPercent, "Down payment percent")).div(100);
  const baseLoanAmount = D(calculateLoanAmount(price.toNumber(), downPayment.toNumber()));
  const financedUpfrontFee = override.financedUpfrontFee;
  const totalLoanAmount = override.totalLoanAmount ?? baseLoanAmount.plus(financedUpfrontFee ?? 0).toNumber();
  const rate = inherited("interestRate", shared.defaultInterestRate);
  const taxes = D(shared.annualPropertyTaxes).div(12); const insurance = D(shared.annualHomeownersInsurance).div(12);
  const mi = D(inherited("monthlyMortgageInsurance", shared.defaultMonthlyMortgageInsurance)); const hoa = D(shared.monthlyHoa);
  const pi = D(calculateMonthlyPrincipalAndInterest(totalLoanAmount, rate, shared.termYears));
  const payment = pi.plus(inclusions.propertyTaxes ? taxes : 0).plus(inclusions.homeownersInsurance ? insurance : 0).plus(inclusions.mortgageInsurance ? mi : 0).plus(inclusions.hoa ? hoa : 0);
  const closing = D(inherited("closingCosts", shared.defaultClosingCosts));
  const pointsPercent = inherited("discountPointsPercent", shared.defaultDiscountPointsPercent);
  const points = D(totalLoanAmount).mul(pointsPercent).div(100);
  const eligibleCosts = closing.plus(shared.prepaidEscrows).plus(points);
  const sellerEntered = D(inherited("sellerConcessions", shared.defaultSellerConcessions));
  const sellerApplied = Decimal.min(sellerEntered, eligibleCosts);
  const afterSeller = Decimal.max(0, eligibleCosts.minus(sellerApplied));
  const lenderEntered = D(inherited("lenderCredits", shared.defaultLenderCredits));
  const lenderApplied = Decimal.min(lenderEntered, afterSeller);
  const deposit = D(inherited("earnestMoneyDeposit", shared.earnestMoneyDeposit ?? 0));
  const cash = Decimal.max(0, downPayment.plus(afterSeller.minus(lenderApplied)).minus(deposit));
  const holdingPayments = shared.holdingPeriodYears * 12;
  const remaining = D(calculateRemainingLoanBalance(totalLoanAmount, rate, shared.termYears, holdingPayments));
  const principalPaid = D(totalLoanAmount).minus(remaining); const totalPayments = pi.mul(Math.min(holdingPayments, shared.termYears * 12));
  return { id: scenario.id, name: scenario.name, notes: scenario.notes, purchasePrice: money(price), downPaymentPercent: money(downPaymentPercent), downPayment: money(downPayment), baseLoanAmount: money(baseLoanAmount), financedUpfrontFee: financedUpfrontFee ?? null, totalLoanAmount: money(totalLoanAmount), ltvPercent: price.gt(0) ? money(D(totalLoanAmount).div(price).mul(100)) : null, interestRate: rate, apr: override.apr ?? null, monthlyPrincipalAndInterest: money(pi), monthlyTaxes: money(taxes), monthlyInsurance: money(insurance), monthlyMortgageInsurance: money(mi), monthlyHoa: money(hoa), totalMonthlyHousingPayment: money(payment), closingCosts: money(closing), prepaidEscrows: money(shared.prepaidEscrows), discountPoints: money(points), sellerConcessionsEntered: money(sellerEntered), sellerConcessionsApplied: money(sellerApplied), unusedSellerConcessions: money(sellerEntered.minus(sellerApplied)), lenderCreditsEntered: money(lenderEntered), lenderCreditsApplied: money(lenderApplied), unusedLenderCredits: money(lenderEntered.minus(lenderApplied)), earnestMoneyDeposit: money(deposit), cashToClose: money(cash), remainingBalanceAtHoldingPeriod: money(remaining), principalPaidAtHoldingPeriod: money(principalPaid), interestPaidAtHoldingPeriod: money(Decimal.max(0, totalPayments.minus(principalPaid))), targetPaymentDifference: shared.targetMonthlyPayment === null ? null : money(payment.minus(shared.targetMonthlyPayment)), origins: { purchasePrice: "manual", downPayment: origin("downPaymentPercent"), interestRate: origin("interestRate"), apr: origin("apr"), mortgageInsurance: origin("monthlyMortgageInsurance"), closingCosts: origin("closingCosts"), sellerConcessions: origin("sellerConcessions"), lenderCredits: origin("lenderCredits"), discountPoints: origin("discountPointsPercent"), totalLoanAmount: origin("totalLoanAmount") } };
}

export function calculateScenarioDifference(current: BuyingPowerScenarioResult, prior: BuyingPowerScenarioResult): ScenarioDifference { return { purchasePrice: money(D(current.purchasePrice).minus(prior.purchasePrice)), loanAmount: money(D(current.totalLoanAmount).minus(prior.totalLoanAmount)), monthlyPayment: money(D(current.totalMonthlyHousingPayment).minus(prior.totalMonthlyHousingPayment)), cashToClose: money(D(current.cashToClose).minus(prior.cashToClose)) }; }
