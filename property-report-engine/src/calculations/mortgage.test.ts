import { describe, expect, it } from "vitest";
import { calculateMortgage } from "./mortgage";

const base = {
  purchasePrice: 450000, downPaymentPercent: 20, annualInterestRate: 6.5, termYears: 30,
  annualPropertyTaxes: 2700, annualHomeownersInsurance: 1800, monthlyMortgageInsurance: 0,
  monthlyHoa: 85, sellerConcessions: 0, closingCosts: 9000, discountPoints: 0,
  lenderCredits: 0, program: "conventional" as const,
};

describe("calculateMortgage", () => {
  it("calculates a fixed-rate payment and cash to close", () => {
    const result = calculateMortgage(base);
    expect(result.loanAmount).toBe(360000);
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(2275.44, 2);
    expect(result.estimatedTotalHousingPayment).toBeCloseTo(2735.44, 2);
    expect(result.estimatedCashToClose).toBe(99000);
  });
  it("supports a zero interest rate", () => {
    expect(calculateMortgage({ ...base, annualInterestRate: 0 }).monthlyPrincipalAndInterest).toBe(1000);
  });
});
