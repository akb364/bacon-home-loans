export interface ComplianceIdentity { loanOfficerName: string; loanOfficerTitle: string; loanOfficerNmlsId: string; companyName: string; companyNmlsId: string; companyState: string; companyLicenseType: string; companyStateLicenseNumber: string; }
export interface EmployerApproval { approvalConfirmed: boolean; approvedBy: string; approvedAt: string; approvalReference: string; }
export interface BuyerAdvertisingCompliance { identity: ComplianceIdentity; rateAsOf: string; aprs: Array<number | null>; termMonths: number; approval: EmployerApproval; }

export function validateBuyerAdvertising(input: BuyerAdvertisingCompliance) {
  const errors: string[] = []; const i = input.identity; const a = input.approval;
  if (!i.loanOfficerName.trim()) errors.push("Loan officer name is required.");
  if (!i.loanOfficerNmlsId.trim()) errors.push("Loan officer NMLS ID is required.");
  if (!i.companyName.trim()) errors.push("Company name is required.");
  if (!i.companyState.trim()) errors.push("Company state is required.");
  if (!i.companyLicenseType.trim()) errors.push("Company state license type is required.");
  if (!i.companyStateLicenseNumber.trim()) errors.push("Company state license number is required.");
  if (!input.rateAsOf.trim()) errors.push("Rate as-of date and time are required.");
  if (!input.termMonths || input.termMonths <= 0) errors.push("A valid repayment period is required.");
  if (input.aprs.some((apr) => apr === null || !Number.isFinite(apr) || apr <= 0)) errors.push("A verified APR is required for every scenario.");
  if (!a.approvalConfirmed || !a.approvedBy.trim() || !a.approvedAt.trim() || !a.approvalReference.trim()) errors.push("A complete employer approval record is required.");
  return { valid: errors.length === 0, errors };
}
