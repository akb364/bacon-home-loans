import { validateBuyerAdvertising } from "@/domain/compliance";
import type { ApprovalRecord, BuyingPowerScenarioResult, BuyingPowerSharedAssumptions, DisclosureConfig, PaymentInclusions } from "./types";

export function validateClientExport(disclosure: DisclosureConfig, approval: ApprovalRecord, shared: BuyingPowerSharedAssumptions, scenarios: BuyingPowerScenarioResult[], inclusions: PaymentInclusions, rateAsOf: string) {
  const errors = validateBuyerAdvertising({ identity: disclosure, rateAsOf, aprs: scenarios.map((s) => s.apr), termMonths: shared.termYears * 12, approval }).errors.filter((error) => error !== "A complete employer approval record is required.");
  if (!inclusions.propertyTaxes || !inclusions.homeownersInsurance) errors.push("Client exports must include property taxes and homeowners insurance in the advertised payment.");
  scenarios.forEach((scenario) => {
    const name = scenario.name || "Scenario";
    if (scenario.origins.apr !== "overridden") errors.push(`${name}: scenario-specific APR must be manually verified or imported.`);
    if (!scenario.purchasePrice || !scenario.totalLoanAmount || !scenario.interestRate || !scenario.totalMonthlyHousingPayment) errors.push(`${name}: required pricing values are missing.`);
    if ([scenario.cashToClose, scenario.downPayment, scenario.totalLoanAmount].some((value) => !Number.isFinite(value) || value < 0)) errors.push(`${name}: calculation contains an invalid value.`);
  });
  if (["fha", "va", "usda"].includes(shared.loanProgram) && scenarios.some((s) => s.origins.totalLoanAmount !== "overridden")) errors.push("Government-loan client export requires a verified total financed loan amount for every scenario; no program fee was inferred.");
  return { valid: errors.length === 0, errors: [...new Set(errors)] };
}
