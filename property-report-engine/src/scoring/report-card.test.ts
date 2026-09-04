import { describe, expect, it } from "vitest";
import { ManualPropertyProvider } from "@/providers/manual-provider";
import { scoreReportCard } from "./report-card";

describe("scoreReportCard", () => {
  it("excludes unavailable categories and rebalances remaining weights", async () => {
    const property = await new ManualPropertyProvider().lookup({ address: "123 Main St" });
    property.estimatedValue = { value: 500000, provenance: "third_party_estimate" };
    const result = scoreReportCard({
      property, purchasePrice: 475000,
      mortgage: { downPayment: 0, loanAmount: 0, monthlyPrincipalAndInterest: 0, monthlyTaxes: 0,
        monthlyInsurance: 0, monthlyMortgageInsurance: 0, monthlyHoa: 0, estimatedPiti: 0,
        estimatedTotalHousingPayment: 3000, estimatedCashToClose: 0 },
    });
    expect(result.overallScore).not.toBeNull();
    expect(result.categories.filter((c) => c.score === null)).toHaveLength(5);
  });
});
