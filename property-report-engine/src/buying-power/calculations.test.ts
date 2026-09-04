import { describe, expect, it } from "vitest";
import { calculateMonthlyPrincipalAndInterest, calculateRemainingLoanBalance, calculateScenario, calculateScenarioDifference } from "./calculations";
import type { BuyingPowerScenarioInput, BuyingPowerSharedAssumptions } from "./types";
const shared: BuyingPowerSharedAssumptions = { borrowerName: "", loanProgram: "conventional", termYears: 30, interestRate: 6.5, apr: 6.72, downPaymentPercent: 5, annualPropertyTaxes: 3600, annualHomeownersInsurance: 1800, monthlyMortgageInsurance: 90, monthlyHoa: 75, closingCosts: 9000, sellerConcessions: 2000, discountPointsPercent: 0, lenderCredits: 500, prepaidEscrows: 2500, targetMonthlyPayment: 3400, holdingPeriodYears: 5 };
const scenario = (price: number, overrides = {}): BuyingPowerScenarioInput => ({ id: String(price), name: "Test", purchasePrice: price, notes: "", overrides });
describe("buying power calculations", () => {
  it("handles amortization and zero percent", () => { expect(calculateMonthlyPrincipalAndInterest(360000, 6.5, 30)).toBeCloseTo(2275.44, 2); expect(calculateMonthlyPrincipalAndInterest(360000, 0, 30)).toBe(1000); expect(calculateRemainingLoanBalance(360000, 6.5, 30, 60)).toBeCloseTo(336999.52, 0); });
  it("calculates inherited cash, target, and five-year totals", () => { const r = calculateScenario(scenario(460000), shared); expect(r.downPayment).toBe(23000); expect(r.loanAmount).toBe(437000); expect(r.cashToClose).toBe(32000); expect(r.origins.interestRate).toBe("inherited"); expect(r.principalPaidAtHoldingPeriod).toBeGreaterThan(0); expect(r.interestPaidAtHoldingPeriod).toBeGreaterThan(0); expect(r.targetPaymentDifference).not.toBeNull(); });
  it("honors overrides and flags unused seller credit", () => { const r = calculateScenario(scenario(470000, { interestRate: 6.125, sellerConcessions: 20000 }), shared); expect(r.interestRate).toBe(6.125); expect(r.origins.interestRate).toBe("overridden"); expect(r.potentialUnusedSellerCredit).toBe(8500); });
  it("calculates differences", () => { const a = calculateScenario(scenario(460000), shared); const b = calculateScenario(scenario(470000), shared); expect(calculateScenarioDifference(b, a).loanAmount).toBe(9500); });
  it("rejects negative values", () => { expect(() => calculateScenario(scenario(-1), shared)).toThrow(/non-negative/); });
});
