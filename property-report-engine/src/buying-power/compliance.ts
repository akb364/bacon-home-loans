import type { BuyingPowerScenarioResult, BuyingPowerSharedAssumptions, DisclosureConfig, PaymentInclusions } from "./types";
export function validateClientReady(disclosure: DisclosureConfig, shared: BuyingPowerSharedAssumptions, scenarios: BuyingPowerScenarioResult[], inclusions: PaymentInclusions, rateAsOf: string) {
  const errors: string[] = [];
  if (!disclosure.loanOfficerName.trim()) errors.push("Loan officer name is required.");
  if (!disclosure.loanOfficerNmlsId.trim()) errors.push("Loan officer NMLS ID is required.");
  if (!disclosure.companyName.trim()) errors.push("Company name is required.");
  if (!disclosure.companyLicenseType.trim()) errors.push("Company license type is required.");
  if (!disclosure.companyLicenseNumber.trim()) errors.push("Company license number is required.");
  if (!disclosure.companyState.trim()) errors.push("Company state is required.");
  if (!rateAsOf.trim()) errors.push("Rate as-of date and time are required.");
  if (!shared.termYears || shared.termYears <= 0) errors.push("A valid loan term is required.");
  if (!Number.isFinite(shared.interestRate) || shared.interestRate <= 0) errors.push("A valid interest rate is required.");
  if (!Object.values(inclusions).every((value) => typeof value === "boolean")) errors.push("Payment inclusions must be identified.");
  scenarios.forEach((scenario) => {
    const name = scenario.name || "Scenario";
    if (!scenario.purchasePrice || scenario.purchasePrice <= 0) errors.push(`${name}: purchase price is required.`);
    if (!scenario.loanAmount || scenario.loanAmount <= 0) errors.push(`${name}: loan amount is required.`);
    if (!scenario.downPayment || scenario.downPayment <= 0) errors.push(`${name}: down payment is required.`);
    if (!scenario.interestRate || scenario.interestRate <= 0) errors.push(`${name}: interest rate is required.`);
    if (scenario.apr === null || !Number.isFinite(scenario.apr) || scenario.apr <= 0 || scenario.origins.apr !== "overridden") errors.push(`${name}: scenario-specific APR is required.`);
    if (!scenario.totalMonthlyHousingPayment || scenario.totalMonthlyHousingPayment <= 0) errors.push(`${name}: payment is required.`);
    if (!Number.isFinite(scenario.cashToClose) || scenario.cashToClose < 0) errors.push(`${name}: cash to close is invalid.`);
  });
  return { valid: errors.length === 0, errors };
}
