import { describe, expect, it } from "vitest";
import { validateClientReady } from "./compliance";
import { calculateScenario } from "./calculations";
import type { BuyingPowerSharedAssumptions, DisclosureConfig } from "./types";

const shared: BuyingPowerSharedAssumptions = { borrowerName: "", loanProgram: "conventional", termYears: 30, interestRate: 7, apr: null, downPaymentPercent: 5, annualPropertyTaxes: 5000, annualHomeownersInsurance: 1800, monthlyMortgageInsurance: 150, monthlyHoa: 0, closingCosts: 10000, sellerConcessions: 0, discountPointsPercent: 0, lenderCredits: 0, prepaidEscrows: 2000, targetMonthlyPayment: null, holdingPeriodYears: 5 };
const config: DisclosureConfig = { loanOfficerName: "Austin Bacon", loanOfficerTitle: "Mortgage Loan Originator", loanOfficerNmlsId: "2728600", companyName: "Artemis Mortgage", companyLicenseType: "Arizona Mortgage Broker License", companyLicenseNumber: "TEST", companyState: "Arizona", customDisclosure: "" };
const inclusions = { propertyTaxes: true, homeownersInsurance: true, mortgageInsurance: true, hoa: true };
const timestamp = "2026-09-04T10:00";
const scenario = (apr?: number) => calculateScenario({ id: "a", name: "5% Down", purchasePrice: 769000, notes: "", overrides: { downPaymentPercent: 5, apr } }, shared);

describe("client-ready validation", () => {
  it("blocks missing scenario APR", () => expect(validateClientReady(config, shared, [scenario()], inclusions, timestamp).errors).toContain("5% Down: scenario-specific APR is required."));
  it("blocks missing licensing", () => expect(validateClientReady({ ...config, loanOfficerNmlsId: "", companyLicenseNumber: "" }, shared, [scenario(7.1)], inclusions, timestamp).valid).toBe(false));
  it("blocks a missing rate timestamp", () => expect(validateClientReady(config, shared, [scenario(7.1)], inclusions, "").errors).toContain("Rate as-of date and time are required."));
  it("accepts complete scenario-specific disclosures", () => expect(validateClientReady(config, shared, [scenario(7.1)], inclusions, timestamp).valid).toBe(true));
});
