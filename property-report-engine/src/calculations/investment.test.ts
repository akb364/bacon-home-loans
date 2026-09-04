import { describe, expect, it } from "vitest";
import { calculateInvestment } from "./investment";

describe("calculateInvestment", () => {
  it("calculates standard operating and return metrics", () => {
    const result = calculateInvestment({ purchasePrice: 300000, monthlyRent: 2500,
      vacancyPercent: 5, annualOperatingExpenses: 7500, annualDebtService: 16800,
      totalCashRequired: 75000 });
    expect(result.grossScheduledRent).toBe(30000);
    expect(result.effectiveGrossIncome).toBe(28500);
    expect(result.netOperatingIncome).toBe(21000);
    expect(result.annualCashFlow).toBe(4200);
    expect(result.capRatePercent).toBe(7);
    expect(result.cashOnCashReturnPercent).toBe(5.6);
    expect(result.dscr).toBe(1.25);
  });

  it("returns unavailable ratios for zero denominators", () => {
    const result = calculateInvestment({ purchasePrice: 0, monthlyRent: 0,
      vacancyPercent: 0, annualOperatingExpenses: 0, annualDebtService: 0,
      totalCashRequired: 0 });
    expect(result.capRatePercent).toBeNull();
    expect(result.dscr).toBeNull();
    expect(result.breakEvenOccupancyPercent).toBeNull();
  });
});
