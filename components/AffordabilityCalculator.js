import { useMemo, useState } from "react";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1
});

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function currency(value) {
  return currencyFormatter.format(Math.max(0, value));
}

function monthlyPrincipalAndInterest(loanAmount, annualRate, years) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (loanAmount <= 0 || months <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return loanAmount / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

function estimateMaxPrice({
  income,
  debts,
  downPayment,
  rate,
  term,
  targetDti,
  taxRate,
  insurance,
  hoa
}) {
  const maxMonthlyDebt = (income / 12) * (targetDti / 100);
  const availableForHousing = maxMonthlyDebt - debts - insurance - hoa;

  if (availableForHousing <= 0) {
    return 0;
  }

  let low = Math.max(downPayment, 0);
  let high = 2000000;

  for (let index = 0; index < 70; index += 1) {
    const price = (low + high) / 2;
    const loanAmount = Math.max(price - downPayment, 0);
    const principalAndInterest = monthlyPrincipalAndInterest(loanAmount, rate, term);
    const propertyTax = (price * (taxRate / 100)) / 12;
    const totalHousing = principalAndInterest + propertyTax + insurance + hoa;

    if (totalHousing + debts <= maxMonthlyDebt) {
      low = price;
    } else {
      high = price;
    }
  }

  return low;
}

export default function AffordabilityCalculator({ compact = false }) {
  const [income, setIncome] = useState(85000);
  const [debts, setDebts] = useState(450);
  const [downPayment, setDownPayment] = useState(20000);
  const [rate, setRate] = useState(6.75);
  const [targetDti, setTargetDti] = useState(43);
  const [taxRate, setTaxRate] = useState(0.62);
  const [insurance, setInsurance] = useState(170);
  const [hoa, setHoa] = useState(0);

  const term = 30;

  const result = useMemo(() => {
    const values = {
      income: toNumber(income),
      debts: toNumber(debts),
      downPayment: toNumber(downPayment),
      rate: toNumber(rate),
      term,
      targetDti: toNumber(targetDti),
      taxRate: toNumber(taxRate),
      insurance: toNumber(insurance),
      hoa: toNumber(hoa)
    };
    const price = estimateMaxPrice(values);
    const loanAmount = Math.max(price - values.downPayment, 0);
    const principalAndInterest = monthlyPrincipalAndInterest(loanAmount, values.rate, values.term);
    const propertyTax = (price * (values.taxRate / 100)) / 12;
    const totalHousing = principalAndInterest + propertyTax + values.insurance + values.hoa;
    const totalDebt = totalHousing + values.debts;
    const monthlyIncome = values.income / 12;
    const dti = monthlyIncome > 0 ? totalDebt / monthlyIncome : 0;

    return {
      price,
      loanAmount,
      principalAndInterest,
      propertyTax,
      totalHousing,
      totalDebt,
      dti
    };
  }, [income, debts, downPayment, rate, targetDti, taxRate, insurance, hoa]);

  const fields = [
    {
      label: "Annual household income",
      value: income,
      onChange: setIncome,
      prefix: "$",
      step: 1000
    },
    {
      label: "Monthly debt payments",
      value: debts,
      onChange: setDebts,
      prefix: "$",
      step: 25
    },
    {
      label: "Available down payment",
      value: downPayment,
      onChange: setDownPayment,
      prefix: "$",
      step: 1000
    },
    {
      label: "Interest rate estimate",
      value: rate,
      onChange: setRate,
      suffix: "%",
      step: 0.125
    },
    {
      label: "Target debt-to-income",
      value: targetDti,
      onChange: setTargetDti,
      suffix: "%",
      step: 1
    },
    {
      label: "Arizona property tax estimate",
      value: taxRate,
      onChange: setTaxRate,
      suffix: "%",
      step: 0.01
    },
    {
      label: "Monthly homeowners insurance",
      value: insurance,
      onChange: setInsurance,
      prefix: "$",
      step: 10
    },
    {
      label: "Monthly HOA dues",
      value: hoa,
      onChange: setHoa,
      prefix: "$",
      step: 25
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.label} className="block">
              <span className="label">{field.label}</span>
              <span className="mt-2 flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-saguaro-500 focus-within:ring-4 focus-within:ring-saguaro-500/10">
                {field.prefix ? (
                  <span className="grid w-11 place-items-center border-r border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                    {field.prefix}
                  </span>
                ) : null}
                <input
                  type="number"
                  min="0"
                  step={field.step}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold text-ink outline-none"
                />
                {field.suffix ? (
                  <span className="grid w-11 place-items-center border-l border-slate-200 bg-slate-50 text-sm font-bold text-slate-500">
                    {field.suffix}
                  </span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Estimates use a 30-year term and do not include mortgage insurance, closing costs,
          temporary buydowns, seller credits, or down payment assistance.
        </p>
      </div>

      <aside className="rounded-md bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-desert-100">
          Estimated Arizona Buying Power
        </p>
        <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          {currency(result.price)}
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          Based on the numbers entered, this is the estimated purchase price that keeps total
          monthly debt near {percentFormatter.format(toNumber(targetDti) / 100)} of gross income.
        </p>

        <div className="mt-6 space-y-3 border-t border-white/15 pt-5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">Estimated loan amount</span>
            <span className="font-black">{currency(result.loanAmount)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">Principal and interest</span>
            <span className="font-black">{currency(result.principalAndInterest)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">Property tax</span>
            <span className="font-black">{currency(result.propertyTax)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">Total housing payment</span>
            <span className="font-black">{currency(result.totalHousing)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md bg-white/10 p-3 text-sm">
            <span className="font-bold text-white">Estimated DTI</span>
            <span className="font-black">{percentFormatter.format(result.dti)}</span>
          </div>
        </div>

        {!compact ? (
          <Link
            href="/contact"
            className="mt-6 block rounded-md bg-desert-500 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-desert-600"
          >
            Review My Real Numbers
          </Link>
        ) : null}
      </aside>
    </div>
  );
}
