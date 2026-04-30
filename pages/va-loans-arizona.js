import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const benefits = [
  "Potential no down payment for eligible borrowers",
  "No monthly private mortgage insurance",
  "Designed for eligible Veterans, service members, and some surviving spouses",
  "Certificate of Eligibility review is an early step"
];

const steps = [
  "Confirm VA loan eligibility and Certificate of Eligibility",
  "Review income, debts, credit, and residual income",
  "Compare total payment, funding fee, and seller concessions",
  "Coordinate appraisal and closing timeline with the real estate agent"
];

const pros = [
  "Potential zero down payment",
  "No monthly PMI",
  "Full entitlement may remove county loan limit concerns",
  "Can be reused if entitlement is available or restored"
];

const cons = [
  "VA funding fee may apply unless exempt",
  "Property must meet VA appraisal and minimum property requirements",
  "Eligibility and entitlement need to be verified",
  "Some sellers misunderstand VA loans, so offer positioning matters"
];

const faqs = [
  {
    question: "Who can use a VA loan?",
    answer:
      "VA loans are for eligible Veterans, active-duty service members, certain National Guard or Reserve members, and some surviving spouses. A Certificate of Eligibility helps confirm eligibility."
  },
  {
    question: "Does VA require a down payment?",
    answer:
      "Many VA-backed purchase loans are made without a down payment, but down payment requirements can depend on entitlement, lender review, purchase price, and property details."
  },
  {
    question: "Does a VA loan have mortgage insurance?",
    answer:
      "VA loans do not have monthly private mortgage insurance, but a VA funding fee may apply unless the borrower is exempt."
  }
];

export default function VaLoansArizona() {
  return (
    <Layout>
      <Seo
        title="VA Loans Arizona"
        description="Learn about VA loans in Arizona with Austin Bacon, NMLS ID 2728600, including eligibility, no down payment potential, funding fee, pros, and cons."
        path="/va-loans-arizona"
      />
      <PageHero
        eyebrow="VA Loans"
        title="VA home loan guidance for Arizona buyers."
        description="VA financing can be one of the strongest home buying benefits available to eligible borrowers, especially when the loan is explained clearly and positioned well in the offer."
        primaryLabel="See What You Qualify For"
        secondaryHref="/contact"
        secondaryLabel="Check VA Eligibility"
      >
        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="rounded-md bg-white p-4">
              <p className="text-sm font-bold leading-6 text-slate-700">{benefit}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Who It Is For"
          title="VA loans are built around earned eligibility."
          description="This path is designed for eligible Veterans, service members, and certain surviving spouses buying a primary residence. The first step is usually confirming eligibility and reviewing the full payment."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step} className="rounded-md border border-slate-200 bg-white p-5">
              <span className="text-sm font-black text-desert-600">0{index + 1}</span>
              <p className="mt-3 font-bold leading-6 text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Down Payment"
            title="VA can reduce the biggest barrier to buying."
            description="Eligible borrowers may be able to buy with no down payment. That does not mean zero cost to close, so taxes, insurance, closing costs, earnest money, and any funding fee still need review."
          />
          <div className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm leading-7 text-slate-700">
              Example: on a $350,000 purchase, a 0% down VA structure means the down payment could
              be $0, while 3.5% down FHA would be $12,250 and 3% down conventional would be
              $10,500. The best choice still depends on eligibility, payment, funding fee,
              property, and underwriting.
            </p>
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Pros And Cons"
          title="VA loans are powerful, but still need strategy."
          description="The loan benefit is strong. The execution still matters: eligibility, appraisal, offer terms, closing costs, and seller education can all affect the purchase."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-black text-ink">Pros</h3>
            <ul className="mt-5 space-y-3">
              {pros.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 rounded-full bg-saguaro-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-black text-ink">Cons</h3>
            <ul className="mt-5 space-y-3">
              {cons.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 rounded-full bg-desert-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <TrustSection />
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="VA loan questions."
          description="These answers help frame the conversation before checking eligibility and payment details."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
