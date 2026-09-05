import Decimal from "decimal.js";

const D = (value: Decimal.Value) => new Decimal(value);
export const money = (value: Decimal.Value) => D(value).toDecimalPlaces(2).toNumber();
export const nonnegative = (value: number, name: string) => {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative number`);
  return D(value);
};

export function calculateLoanAmount(price: number, downPayment: number) {
  return money(Decimal.max(0, nonnegative(price, "Purchase price").minus(nonnegative(downPayment, "Down payment"))));
}

export function calculateMonthlyPrincipalAndInterest(principal: number, annualRate: number, termYears: number) {
  const loan = nonnegative(principal, "Loan amount");
  const rate = nonnegative(annualRate, "Interest rate").div(100).div(12);
  if (!Number.isFinite(termYears) || termYears <= 0) throw new Error("Loan term must be greater than zero");
  const periods = termYears * 12;
  if (loan.eq(0)) return 0;
  if (rate.eq(0)) return money(loan.div(periods));
  const factor = rate.plus(1).pow(periods);
  return money(loan.mul(rate).mul(factor).div(factor.minus(1)));
}

export function calculateRemainingLoanBalance(principal: number, annualRate: number, termYears: number, paymentsMade: number) {
  const loan = nonnegative(principal, "Loan amount");
  const rate = nonnegative(annualRate, "Interest rate").div(100).div(12);
  const periods = termYears * 12;
  const paid = Math.min(Math.max(0, Math.floor(paymentsMade)), periods);
  if (paid >= periods || loan.eq(0)) return 0;
  if (rate.eq(0)) return money(loan.mul(D(1).minus(D(paid).div(periods))));
  const factor = rate.plus(1);
  return money(loan.mul(factor.pow(periods).minus(factor.pow(paid))).div(factor.pow(periods).minus(1)));
}
