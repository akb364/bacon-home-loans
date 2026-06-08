import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const heroPoints = [
  "Compare down payment, credit profile, mortgage insurance, and property requirements",
  "Understand when FHA may be more flexible and when conventional may cost less",
  "Use the comparison as a starting point before a full Arizona pre-approval review"
];

const comparisonRows = [
  {
    topic: "Down payment",
    fha: "Often as low as 3.5% down for eligible buyers.",
    conventional: "Some options may allow 3% down for eligible buyers."
  },
  {
    topic: "Credit flexibility",
    fha: "Can be more flexible for some credit profiles.",
    conventional: "Often strongest for buyers with better credit and cleaner debt profiles."
  },
  {
    topic: "Mortgage insurance",
    fha: "Includes FHA mortgage insurance, which may include upfront and monthly costs.",
    conventional: "Private mortgage insurance may be cancellable once equity and guideline requirements are met."
  },
  {
    topic: "Property standards",
    fha: "The home must meet FHA appraisal and condition standards.",
    conventional: "Property review is still required, but condition standards can be different from FHA."
  },
  {
    topic: "Best fit",
    fha: "May fit buyers who need more guideline flexibility or want to pair with eligible assistance.",
    conventional: "May fit buyers with stronger credit, more reserves, or a plan to remove mortgage insurance later."
  }
];

const scenarioCards = [
  {
    title: "FHA may be worth reviewing when",
    points: [
      "Your credit profile needs more flexibility",
      "You want to compare a 3.5% down option",
      "You may need down payment assistance",
      "Your debt-to-income ratio needs careful review"
    ]
  },
  {
    title: "Conventional may be worth reviewing when",
    points: [
      "Your credit score is stronger",
      "You want to evaluate cancellable mortgage insurance",
      "You are comparing 3% down or larger down payment options",
      "The property type or offer strategy favors conventional financing"
    ]
  }
];

const faqs = [
  {
    question: "Is FHA always easier than conventional?",
    answer:
      "No. FHA can be more flexible in some areas, but the full file still matters. Credit, income, debts, assets, property, and loan limits all affect the answer."
  },
  {
    question: "Is conventional always cheaper?",
    answer:
      "Not always. Conventional can be less expensive for some stronger credit profiles, especially if mortgage insurance can later be removed, but FHA may price better in other scenarios."
  },
  {
    question: "Can I compare both during pre-approval?",
    answer:
      "Yes. Comparing FHA and conventional side by side is often the cleanest way to understand monthly payment, cash-to-close, mortgage insurance, and offer strategy."
  }
];

export default function FhaVsConventionalArizona() {
  return (
    <Layout>
      <Seo
        title="FHA vs Conventional Loans Arizona"
        description="Compare FHA and conventional loans in Arizona, including down payment, credit flexibility, mortgage insurance, property standards, and buyer fit."
        path="/fha-vs-conventional-loans-arizona"
      />
      <PageHero
        eyebrow="Loan Comparison"
        title="FHA vs conventional loans in Arizona."
        description="The better loan is not just the one with the lowest down payment. Compare payment, mortgage insurance, credit fit, property requirements, and long-term cost before choosing."
        primaryLabel="Compare My Options"
      >
        <div className="space-y-4">
          {heroPoints.map((point) => (
            <div key={point} className="rounded-md bg-white p-4">
              <p className="text-sm font-bold leading-6 text-slate-700">{point}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Side By Side"
            title="The practical differences buyers should understand."
            description="FHA and conventional loans can both work well in Arizona. The right answer depends on your credit, debts, down payment, property type, timeline, and payment comfort."
          />
          <div className="mt-10 overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="hidden grid-cols-[0.65fr_1fr_1fr] bg-ink text-sm font-black uppercase tracking-[0.14em] text-white md:grid">
              <div className="p-4">Topic</div>
              <div className="p-4">FHA</div>
              <div className="p-4">Conventional</div>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.topic}
                className="grid gap-4 border-b border-slate-200 p-5 last:border-b-0 md:grid-cols-[0.65fr_1fr_1fr]"
              >
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 md:hidden">
                    Topic
                  </p>
                  <p className="font-black text-ink">{row.topic}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-desert-600 md:hidden">
                    FHA
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 md:mt-0">{row.fha}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-saguaro-700 md:hidden">
                    Conventional
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 md:mt-0">
                    {row.conventional}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Buyer Fit"
          title="A quick way to think about the choice."
          description="This is not a rulebook, but it gives you a useful starting point before the numbers are compared in detail."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {scenarioCards.map((card) => (
            <div key={card.title} className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-black text-ink">{card.title}</h3>
              <ul className="mt-5 space-y-3">
                {card.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-desert-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Arizona Strategy"
            title="Compare the full payment and the offer strategy."
            description="Loan type can affect mortgage insurance, seller concessions, appraisal expectations, condo or manufactured home review, and how your offer is perceived. The best choice is the one that fits both your approval and your buying strategy."
          />
        </Section>
      </section>

      <TrustSection />

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="FHA vs conventional questions."
          description="A side-by-side review can make the tradeoffs much clearer."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
