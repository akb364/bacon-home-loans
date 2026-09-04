import Decimal from "decimal.js";
import type { LoanAssumptions, MortgageResult } from "@/domain/loan";

const money = (value: Decimal.Value) => new Decimal(value).toDecimalPlaces(2).toNumber();

/** Standard fixed-rate amortization. Rates are percentages (6.5 means 6.5%). */
export function calculateMortgage(input: LoanAssumptions): MortgageResult {
  const price = new Decimal(input.purchasePrice);
  const downPayment = price.mul(input.downPaymentPercent).div(100);
  const loanAmount = Decimal.max(0, price.minus(downPayment));
  const payments = input.termYears * 12;
  const monthlyRate = new Decimal(input.annualInterestRate).div(100).div(12);

  let principalAndInterest = new Decimal(0);
  if (loanAmount.gt(0) && payments > 0) {
    principalAndInterest = monthlyRate.eq(0)
      ? loanAmount.div(payments)
      : loanAmount.mul(monthlyRate).mul(monthlyRate.plus(1).pow(payments))
          .div(monthlyRate.plus(1).pow(payments).minus(1));
  }

  const taxes = new Decimal(input.annualPropertyTaxes).div(12);
  const insurance = new Decimal(input.annualHomeownersInsurance).div(12);
  const piti = principalAndInterest.plus(taxes).plus(insurance).plus(input.monthlyMortgageInsurance);
  const housing = piti.plus(input.monthlyHoa);
  const financedPoints = loanAmount.mul(input.discountPoints).div(100);
  const cashToClose = downPayment.plus(input.closingCosts).plus(financedPoints)
    .minus(input.sellerConcessions).minus(input.lenderCredits);

  return {
    downPayment: money(downPayment), loanAmount: money(loanAmount),
    monthlyPrincipalAndInterest: money(principalAndInterest), monthlyTaxes: money(taxes),
    monthlyInsurance: money(insurance), monthlyMortgageInsurance: money(input.monthlyMortgageInsurance),
    monthlyHoa: money(input.monthlyHoa), estimatedPiti: money(piti),
    estimatedTotalHousingPayment: money(housing),
    estimatedCashToClose: money(Decimal.max(0, cashToClose)),
  };
}
