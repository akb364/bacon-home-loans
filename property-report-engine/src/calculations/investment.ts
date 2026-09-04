import Decimal from "decimal.js";

export interface InvestmentInputs {
  purchasePrice: number;
  monthlyRent: number;
  vacancyPercent: number;
  annualOperatingExpenses: number;
  annualDebtService: number;
  totalCashRequired: number;
}

export interface InvestmentResult {
  grossScheduledRent: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  annualCashFlow: number;
  capRatePercent: number | null;
  cashOnCashReturnPercent: number | null;
  dscr: number | null;
  breakEvenOccupancyPercent: number | null;
}

const rounded = (value: Decimal.Value, places = 2) => new Decimal(value).toDecimalPlaces(places).toNumber();
const ratio = (top: Decimal, bottom: Decimal) => bottom.gt(0) ? top.div(bottom) : null;

/** Unlevered and levered rental metrics. No missing input is silently substituted. */
export function calculateInvestment(input: InvestmentInputs): InvestmentResult {
  const gross = new Decimal(input.monthlyRent).mul(12);
  const effective = gross.mul(new Decimal(1).minus(new Decimal(input.vacancyPercent).div(100)));
  const operating = new Decimal(input.annualOperatingExpenses);
  const debtService = new Decimal(input.annualDebtService);
  const noi = effective.minus(operating);
  const cashFlow = noi.minus(debtService);
  const capRate = ratio(noi, new Decimal(input.purchasePrice));
  const cashOnCash = ratio(cashFlow, new Decimal(input.totalCashRequired));
  const dscr = ratio(noi, debtService);
  const breakEven = ratio(operating.plus(debtService), gross);

  return {
    grossScheduledRent: rounded(gross), effectiveGrossIncome: rounded(effective),
    netOperatingIncome: rounded(noi), annualCashFlow: rounded(cashFlow),
    capRatePercent: capRate ? rounded(capRate.mul(100)) : null,
    cashOnCashReturnPercent: cashOnCash ? rounded(cashOnCash.mul(100)) : null,
    dscr: dscr ? rounded(dscr, 3) : null,
    breakEvenOccupancyPercent: breakEven ? rounded(breakEven.mul(100)) : null,
  };
}
