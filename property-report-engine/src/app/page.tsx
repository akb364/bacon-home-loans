"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { calculateMortgage } from "@/calculations/mortgage";
import type { LoanAssumptions, LoanProgram } from "@/domain/loan";
import type { NormalizedProperty, SourcedValue } from "@/domain/property";
import { ManualPropertyProvider } from "@/providers/manual-provider";
import { DEFAULT_WEIGHTS, label, scoreReportCard } from "@/scoring/report-card";

type FormState = {
  address: string; city: string; postalCode: string; purchasePrice: number; estimatedValue: number;
  estimatedRent: number; bedrooms: number; bathrooms: number; squareFeet: number; yearBuilt: number;
  annualTaxes: number; monthlyHoa: number; annualAppreciation: number; daysOnMarket: number;
  downPaymentPercent: number; rate: number; termYears: number; insurance: number; mortgageInsurance: number;
  monthlyIncome: number; program: LoanProgram;
};

const INITIAL: FormState = {
  address: "", city: "", postalCode: "", purchasePrice: 450000, estimatedValue: 0, estimatedRent: 0,
  bedrooms: 0, bathrooms: 0, squareFeet: 0, yearBuilt: 0, annualTaxes: 0, monthlyHoa: 0,
  annualAppreciation: 0, daysOnMarket: 0, downPaymentPercent: 20, rate: 6.5, termYears: 30,
  insurance: 1800, mortgageInsurance: 0, monthlyIncome: 0, program: "conventional",
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US");
const sourced = (value: number): SourcedValue<number> => value > 0
  ? { value, provenance: "user_entered" } : { value: null, provenance: "unavailable" };

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [property, setProperty] = useState<NormalizedProperty | null>(null);
  const [view, setView] = useState<"intake" | "report">("intake");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("bhl-report-draft");
    if (raw) try { setForm({ ...INITIAL, ...JSON.parse(raw) }); } catch { /* invalid old draft */ }
  }, []);

  const loan: LoanAssumptions = useMemo(() => ({
    purchasePrice: form.purchasePrice, downPaymentPercent: form.downPaymentPercent,
    annualInterestRate: form.rate, termYears: form.termYears, annualPropertyTaxes: form.annualTaxes,
    annualHomeownersInsurance: form.insurance, monthlyMortgageInsurance: form.mortgageInsurance,
    monthlyHoa: form.monthlyHoa, sellerConcessions: 0, closingCosts: form.purchasePrice * 0.02,
    discountPoints: 0, lenderCredits: 0, program: form.program,
  }), [form]);
  const mortgage = useMemo(() => calculateMortgage(loan), [loan]);
  const reportCard = useMemo(() => property ? scoreReportCard({
    property, purchasePrice: form.purchasePrice, mortgage, monthlyIncome: form.monthlyIncome || undefined,
  }) : null, [form.monthlyIncome, form.purchasePrice, mortgage, property]);

  const change = (key: keyof FormState, value: string) => setForm((current) => ({
    ...current, [key]: typeof current[key] === "number" ? Number(value) : value,
  }) as FormState);

  async function generate() {
    const base = await new ManualPropertyProvider().lookup({
      address: form.address, city: form.city, state: "AZ", postalCode: form.postalCode,
    });
    base.bedrooms = sourced(form.bedrooms); base.bathrooms = sourced(form.bathrooms);
    base.squareFeet = sourced(form.squareFeet); base.yearBuilt = sourced(form.yearBuilt);
    base.annualPropertyTaxes = sourced(form.annualTaxes); base.monthlyHoa = sourced(form.monthlyHoa);
    base.estimatedValue = sourced(form.estimatedValue); base.estimatedRent = sourced(form.estimatedRent);
    base.market.annualAppreciationRate = sourced(form.annualAppreciation);
    base.market.daysOnMarket = sourced(form.daysOnMarket);
    setProperty(base); setView("report");
  }

  function saveDraft() {
    localStorage.setItem("bhl-report-draft", JSON.stringify(form));
    const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setSavedAt(now);
  }

  return (
    <main>
      <header className="app-header no-print">
        <a className="brand" href="#"><span className="brand-mark">B</span><span>Bacon Home Loans<small>Property Report Engine</small></span></a>
        <div className="header-actions">
          <span className="status-dot"><i /> API-free manual workspace</span>
          <Link className="button ghost" href="/buying-power">Buying power</Link>
          <button className="button ghost" onClick={saveDraft}>Save draft</button>
          {view === "report" && <button className="button primary" onClick={() => window.print()}>Export PDF</button>}
        </div>
      </header>

      {view === "intake" ? (
        <div className="workspace">
          <aside className="rail">
            <span className="eyebrow">New report</span>
            <h1>Build a property report card.</h1>
            <p>Research the property using sources you trust, then enter only what you can support. Missing information stays unavailable and is excluded from scoring.</p>
            <ol><li className="active"><b>1</b>Property</li><li><b>2</b>Financing</li><li><b>3</b>Review & generate</li></ol>
            <div className="rail-note"><strong>No API required</strong><span>Your draft stays in this browser. Every entered value is labeled as user-provided.</span></div>
          </aside>
          <section className="intake">
            <div className="intake-top"><div><span className="eyebrow">Report card MVP</span><h2>Property & financing</h2></div><span className="autosave">{savedAt ? `Saved at ${savedAt}` : "Draft stored on this device"}</span></div>
            <FormSection number="01" title="Property location" description="This becomes the report title. Research and enter the property information manually.">
              <Field label="Street address" wide><input value={form.address} onChange={(e) => change("address", e.target.value)} placeholder="1234 E Desert View Drive" /></Field>
              <Field label="City"><input value={form.city} onChange={(e) => change("city", e.target.value)} placeholder="Scottsdale" /></Field>
              <Field label="State"><input value="Arizona" disabled /></Field>
              <Field label="ZIP code"><input value={form.postalCode} onChange={(e) => change("postalCode", e.target.value)} placeholder="85250" inputMode="numeric" /></Field>
            </FormSection>
            <FormSection number="02" title="Property facts" description="Use verified records when available; blanks remain unavailable.">
              <MoneyField label="Purchase price" field="purchasePrice" value={form.purchasePrice} change={change} />
              <MoneyField label="Estimated market value" field="estimatedValue" value={form.estimatedValue} change={change} hint="Enter from your chosen research source" />
              <MoneyField label="Estimated monthly rent" field="estimatedRent" value={form.estimatedRent} change={change} />
              <NumberField label="Bedrooms" field="bedrooms" value={form.bedrooms} change={change} />
              <NumberField label="Bathrooms" field="bathrooms" value={form.bathrooms} change={change} step="0.5" />
              <NumberField label="Square feet" field="squareFeet" value={form.squareFeet} change={change} />
              <NumberField label="Year built" field="yearBuilt" value={form.yearBuilt} change={change} />
              <MoneyField label="Annual property taxes" field="annualTaxes" value={form.annualTaxes} change={change} />
              <MoneyField label="Monthly HOA" field="monthlyHoa" value={form.monthlyHoa} change={change} />
              <NumberField label="Historical appreciation %" field="annualAppreciation" value={form.annualAppreciation} change={change} step="0.1" />
              <NumberField label="Local days on market" field="daysOnMarket" value={form.daysOnMarket} change={change} />
            </FormSection>
            <FormSection number="03" title="Financing assumptions" description="These figures are estimates, not a loan quote or approval.">
              <Field label="Loan program"><select value={form.program} onChange={(e) => change("program", e.target.value)}><option value="conventional">Conventional</option><option value="fha">FHA</option><option value="va">VA</option><option value="usda">USDA</option><option value="other">Other</option></select></Field>
              <NumberField label="Down payment %" field="downPaymentPercent" value={form.downPaymentPercent} change={change} step="0.5" />
              <NumberField label="Interest rate %" field="rate" value={form.rate} change={change} step="0.125" />
              <Field label="Loan term"><select value={form.termYears} onChange={(e) => change("termYears", e.target.value)}><option value="30">30 years</option><option value="20">20 years</option><option value="15">15 years</option></select></Field>
              <MoneyField label="Annual insurance" field="insurance" value={form.insurance} change={change} />
              <MoneyField label="Monthly mortgage insurance" field="mortgageInsurance" value={form.mortgageInsurance} change={change} />
              <MoneyField label="Gross monthly income" field="monthlyIncome" value={form.monthlyIncome} change={change} hint="Optional; enables affordability score" />
            </FormSection>
            <div className="generate-bar"><div><span>Estimated payment</span><strong>{usd.format(mortgage.estimatedTotalHousingPayment)}<small>/mo</small></strong></div><button className="button primary large" disabled={!form.address || !form.purchasePrice} onClick={generate}>Generate report card <span>→</span></button></div>
          </section>
        </div>
      ) : property && reportCard ? (
        <Report property={property} form={form} mortgage={mortgage} reportCard={reportCard} onEdit={() => setView("intake")} />
      ) : null}
    </main>
  );
}

function FormSection({ number: n, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="form-section"><div className="section-heading"><span>{n}</span><div><h3>{title}</h3><p>{description}</p></div></div><div className="fields">{children}</div></section>;
}
function Field({ label, hint, wide, children }: { label: string; hint?: string; wide?: boolean; children: React.ReactNode }) { return <label className={wide ? "field wide" : "field"}><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>; }
function NumberField({ label, field, value, change, step = "1" }: { label: string; field: keyof FormState; value: number; change: (k: keyof FormState, v: string) => void; step?: string }) { return <Field label={label}><input type="number" min="0" step={step} value={value || ""} onChange={(e) => change(field, e.target.value)} placeholder="Unavailable" /></Field>; }
function MoneyField({ label, field, value, change, hint }: { label: string; field: keyof FormState; value: number; change: (k: keyof FormState, v: string) => void; hint?: string }) { return <Field label={label} hint={hint}><div className="money"><span>$</span><input type="number" min="0" value={value || ""} onChange={(e) => change(field, e.target.value)} placeholder="Unavailable" /></div></Field>; }

function Report({ property, form, mortgage, reportCard, onEdit }: { property: NormalizedProperty; form: FormState; mortgage: ReturnType<typeof calculateMortgage>; reportCard: ReturnType<typeof scoreReportCard>; onEdit: () => void }) {
  const available = (value: number | null, format = number.format) => value === null ? "Unavailable" : format(value);
  return <div className="report-shell">
    <div className="report-toolbar no-print"><button className="text-button" onClick={onEdit}>← Edit assumptions</button><span>Browser report · Ready to print</span></div>
    <article className="report">
      <header className="report-hero"><div className="report-brand"><span className="brand-mark light">B</span><div>Bacon Home Loans<small>Property financial report card</small></div></div><div className="report-date">Prepared {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div><div className="address-block"><span>Arizona property analysis</span><h1>{property.address.line1}</h1><p>{[property.address.city, "AZ", property.address.postalCode].filter(Boolean).join(", ").replace(", AZ,", ", AZ ")}</p></div><div className="hero-facts"><div><span>Purchase price</span><strong>{usd.format(form.purchasePrice)}</strong></div><div><span>Property</span><strong>{form.bedrooms || "—"} bd · {form.bathrooms || "—"} ba</strong></div><div><span>Living area</span><strong>{form.squareFeet ? `${number.format(form.squareFeet)} sq ft` : "Unavailable"}</strong></div></div></header>
      <section className="score-section"><div className="overall"><div className="score-ring"><strong>{reportCard.overallScore ?? "—"}</strong><span>/ 100</span></div><div><span className="eyebrow">Overall financial score</span><h2>{reportCard.overallScore === null ? "Insufficient data" : `${reportCard.overallGrade} property profile`}</h2><p>Proprietary analytical score based only on the available inputs shown below.</p></div></div><div className="score-grid">{reportCard.categories.map((category) => <div className="score-card" key={category.category}><span>{label(category.category)}</span><strong>{category.grade}</strong><div className="bar"><i style={{ width: `${category.score ?? 0}%` }} /></div><small>{category.score === null ? "Data needed" : `${category.score} / 100`}</small></div>)}</div></section>
      <section className="report-section take"><span className="eyebrow">Austin&apos;s take</span><blockquote>“{reportCard.narrative}”</blockquote></section>
      <section className="report-section"><div className="report-section-title"><div><span className="eyebrow">Property overview</span><h2>The numbers at a glance</h2></div><span className="source-key">● Manually researched inputs & calculated estimates</span></div><div className="metrics"><Metric label="Estimated market value" value={available(property.estimatedValue.value, usd.format)} /><Metric label="Price vs. estimate" value={property.estimatedValue.value ? `${((form.purchasePrice / property.estimatedValue.value - 1) * 100).toFixed(1)}%` : "Unavailable"} /><Metric label="Price per sq. ft." value={form.squareFeet ? usd.format(form.purchasePrice / form.squareFeet) : "Unavailable"} /><Metric label="Estimated rent" value={available(property.estimatedRent.value, usd.format)} /><Metric label="Historical appreciation" value={property.market.annualAppreciationRate.value === null ? "Unavailable" : `${property.market.annualAppreciationRate.value.toFixed(1)}% / yr`} /><Metric label="Local days on market" value={available(property.market.daysOnMarket.value)} /></div></section>
      <section className="report-section payment-section"><div><span className="eyebrow">Financing snapshot</span><h2>Estimated monthly housing payment</h2><div className="payment-total">{usd.format(mortgage.estimatedTotalHousingPayment)}<small> / month</small></div><p>Based on {form.downPaymentPercent}% down, a {form.termYears}-year {form.program} loan and a {form.rate}% user-entered interest rate.</p></div><div className="payment-breakdown"><Row label="Principal & interest" value={mortgage.monthlyPrincipalAndInterest} /><Row label="Property taxes" value={mortgage.monthlyTaxes} /><Row label="Homeowners insurance" value={mortgage.monthlyInsurance} /><Row label="Mortgage insurance" value={mortgage.monthlyMortgageInsurance} /><Row label="HOA" value={mortgage.monthlyHoa} /><Row label="Estimated cash to close" value={mortgage.estimatedCashToClose} emphasis /></div></section>
      <section className="report-section assumptions"><span className="eyebrow">Assumptions & methodology</span><h2>How this report was built</h2><div className="assumption-grid"><p><strong>Scoring.</strong> Available categories use configurable weights: {DEFAULT_WEIGHTS.map((w) => `${label(w.category)} ${w.weight}%`).join(", ")}. Missing categories are excluded and weights are proportionally rebalanced.</p><p><strong>Mortgage calculation.</strong> Principal and interest uses standard fixed-rate amortization. Taxes, insurance, mortgage insurance, and HOA are added as entered. Closing costs are provisionally estimated at 2% for this MVP.</p></div></section>
      <footer className="disclosure"><strong>Important disclosure</strong><p>This proprietary report card is for educational and marketing purposes only. It is not an appraisal, property inspection, underwriting decision, loan approval, or guarantee of property value, rent, appreciation, investment return, interest rate, payment, or closing costs. Figures labeled as estimates or projections may change. Verify property, market, loan-program, and cost information with appropriate licensed professionals before making a decision.</p><div><span>Austin Bacon · Bacon Home Loans</span><span>Artemis Mortgage · Arizona</span><span>For compliance review before publication</span></div></footer>
    </article>
  </div>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div>; }
function Row({ label, value, emphasis }: { label: string; value: number; emphasis?: boolean }) { return <div className={emphasis ? "payment-row emphasis" : "payment-row"}><span>{label}</span><strong>{usd.format(value)}</strong></div>; }
