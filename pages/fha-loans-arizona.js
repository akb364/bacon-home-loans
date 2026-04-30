import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const fhaDetails = [
  "Minimum down payment may be lower than many conventional options",
  "Guidelines can be more flexible for some credit profiles",
  "Mortgage insurance is part of the payment structure",
  "The property must meet FHA appraisal and condition standards"
];

const faqs = [
  {
    question: "Is an FHA loan only for first-time home buyers?",
    answer:
      "No. FHA loans are often used by first-time buyers, but eligible repeat buyers may also use FHA financing if the loan and property meet program guidelines."
  },
  {
    question: "Does FHA require mortgage insurance?",
    answer:
      "Yes. FHA loans include mortgage insurance, which can include upfront and monthly costs. Those costs should be compared with the payment and cash-to-close details of other loan options."
  },
  {
    question: "Can every Arizona property use FHA financing?",
    answer:
      "The property must meet FHA appraisal and condition standards. Condos, manufactured homes, repairs, and unique property types may need extra review before you make an offer."
  }
];

const creditBreakdown = [
  {
    range: "580+",
    down: "As low as 3.5% down",
    note: "This is the score range many buyers associate with FHA, but approval still depends on the full file."
  },
  {
    range: "500-579",
    down: "At least 10% down",
    note: "Some lenders may set higher minimums than FHA's baseline, so this needs a lender-specific review."
  },
  {
    range: "Below 500",
    down: "Generally not FHA-insurable",
    note: "A credit improvement plan may be the better first step before trying to buy."
  }
];

const downPaymentExamples = [
  { price: "$250,000", fhaDown: "$8,750", conventionalDown: "$7,500" },
  { price: "$300,000", fhaDown: "$10,500", conventionalDown: "$9,000" },
  { price: "$350,000", fhaDown: "$12,250", conventionalDown: "$10,500" }
];

const pros = [
  "Flexible credit profile review compared with many conventional scenarios",
  "Lower minimum down payment than many buyers expect",
  "Can pair with eligible down payment assistance programs",
  "May help buyers who are rebuilding credit or have limited savings"
];

const cons = [
  "Mortgage insurance is part of the loan structure",
  "Property must meet FHA appraisal and condition standards",
  "Condo, manufactured home, and repair situations may need extra review",
  "A conventional loan may be less expensive for stronger credit profiles"
];

export default function FhaLoansArizona() {
  return (
    <Layout>
      <Seo
        title="FHA Loans Arizona"
        description="Learn about FHA loans in Arizona with Austin Bacon, NMLS ID 2728600, including down payment, credit, mortgage insurance, and property requirements."
        path="/fha-loans-arizona"
      />
      <PageHero
        eyebrow="FHA Loans"
        title="FHA loan guidance for Arizona home buyers."
        description="FHA financing can be a strong fit for buyers who want flexible guidelines and a lower down payment path, especially when the full payment picture is reviewed upfront."
        primaryLabel="See What You Qualify For"
        secondaryHref="/contact"
        secondaryLabel="Check FHA Fit"
      >
        <div className="space-y-4">
          {fhaDetails.map((detail) => (
            <div key={detail} className="rounded-md bg-white p-4">
              <p className="text-sm font-bold leading-6 text-slate-700">{detail}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Loan Strategy"
            title="Understand the tradeoffs before you choose FHA."
            description="The right loan type depends on credit, income, debts, property type, seller concessions, and how long you plan to keep the home. FHA is useful, but it should be compared against your other available options."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-black text-ink">Good FHA conversations include</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Down payment, upfront and monthly mortgage insurance, seller contribution limits,
                inspection concerns, and how the total monthly payment compares to other loans.
              </p>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-black text-ink">Arizona factors to watch</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Condos, manufactured homes, repairs, and competitive offer timelines can all affect
                how an FHA pre-approval should be positioned.
              </p>
            </div>
          </div>
        </Section>
      </section>
      <Section>
        <SectionHeader
          eyebrow="Who It Is For"
          title="FHA may fit buyers who need flexibility."
          description="FHA is often worth reviewing when a buyer has limited savings, a shorter credit history, previous credit challenges, or wants to compare a lower down payment path against conventional financing."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            "First-time buyers with limited savings",
            "Buyers rebuilding credit after past challenges",
            "Borrowers who want to compare FHA with assistance options"
          ].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-white p-6">
              <p className="font-black leading-6 text-ink">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Credit Score Breakdown"
            title="How credit score can affect FHA down payment."
            description="These are FHA baseline concepts, but individual lenders may apply additional requirements. The full approval review includes income, debts, assets, property, and documentation."
          />
          <div className="mt-10 overflow-hidden rounded-md border border-slate-200 bg-white">
            {creditBreakdown.map((item) => (
              <div key={item.range} className="grid gap-3 border-b border-slate-200 p-5 last:border-b-0 md:grid-cols-[0.6fr_0.8fr_1.6fr]">
                <p className="font-black text-ink">{item.range}</p>
                <p className="font-bold text-saguaro-700">{item.down}</p>
                <p className="text-sm leading-6 text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Down Payment Examples"
          title="What 3.5% down looks like in real numbers."
          description="These examples show only the down payment. Closing costs, prepaid taxes, insurance, mortgage insurance, and assistance programs can change the actual cash needed."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {downPaymentExamples.map((item) => (
            <div key={item.price} className="rounded-md border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Purchase Price
              </p>
              <p className="mt-2 text-3xl font-black text-ink">{item.price}</p>
              <p className="mt-5 text-sm font-bold text-saguaro-700">FHA 3.5% down</p>
              <p className="text-xl font-black text-ink">{item.fhaDown}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                For comparison, 3% conventional down would be {item.conventionalDown}.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Real Scenario"
            title="Someone making $70k could potentially buy around $275,000."
            description="This is an educational example, not an approval. The real number can move up or down based on debts, credit, rates, taxes, insurance, assistance, and underwriting."
          />
          <div className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm leading-7 text-slate-700">
              Example assumptions: $70,000 annual income, no other monthly debt, FHA financing with
              3.5% down, a sample 6.75% interest rate, estimated Arizona property taxes,
              homeowners insurance, and FHA monthly mortgage insurance. Under those assumptions, a
              purchase price near $275,000 could create an estimated housing payment around the
              mid-30% range of gross monthly income. A higher debt load, HOA, taxes, insurance, or
              rate could reduce that number.
            </p>
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Pros And Cons"
          title="FHA is useful, but it is not automatically the best loan."
          description="The right choice depends on the buyer's credit profile, monthly payment target, property type, and how long they expect to keep the loan."
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
          title="Common FHA loan questions."
          description="FHA can be useful, but it should be reviewed alongside other eligible loan options."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
