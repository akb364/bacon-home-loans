import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const benefits = [
  "As low as 3% down for eligible buyers",
  "Mortgage insurance may be cancellable later",
  "Often strong for buyers with higher credit scores",
  "Can work for first-time or repeat buyers"
];

const comparisons = [
  {
    title: "Who it can fit",
    text: "Buyers with solid credit, stable income, and enough room in the budget for conventional pricing and mortgage insurance."
  },
  {
    title: "Why buyers like it",
    text: "Conventional loans may offer lower long-term costs than FHA when the credit profile and loan structure are strong."
  },
  {
    title: "What to watch",
    text: "Pricing can be more sensitive to credit score, down payment, loan amount, occupancy, and property type."
  }
];

const pros = [
  "Potential 3% down options for eligible buyers",
  "Private mortgage insurance may be cancellable",
  "No FHA upfront mortgage insurance premium",
  "Can be a strong long-term fit for higher credit profiles"
];

const cons = [
  "Credit score and risk factors can affect pricing more sharply",
  "Mortgage insurance may be expensive with lower scores or lower down payments",
  "Debt-to-income and reserve requirements can be tighter in some files",
  "Not every buyer qualifies for the lowest down payment conventional options"
];

const faqs = [
  {
    question: "Can a first-time buyer use a conventional loan?",
    answer:
      "Yes. Some conventional options allow eligible first-time buyers to purchase with as little as 3% down, subject to underwriting and program requirements."
  },
  {
    question: "Is conventional always better than FHA?",
    answer:
      "No. Conventional can be better for some stronger credit profiles, while FHA may be more flexible for others. The best answer comes from comparing payment, cash to close, mortgage insurance, and approval strength."
  },
  {
    question: "Can down payment assistance work with conventional loans?",
    answer:
      "Sometimes. Assistance rules depend on the program, loan product, income limits, property, and underwriting requirements."
  }
];

export default function ConventionalLoansArizona() {
  return (
    <Layout>
      <Seo
        title="Conventional Loans Arizona"
        description="Learn about conventional loans in Arizona with Austin Bacon, NMLS ID 2728600, including 3% down options, mortgage insurance, pros, cons, and loan fit."
        path="/conventional-loans-arizona"
      />
      <PageHero
        eyebrow="Conventional Loans"
        title="Conventional loan guidance for Arizona buyers."
        description="Conventional financing can be a strong fit when you want flexible property options, cancellable mortgage insurance potential, and a loan structure that can reward stronger credit."
        primaryLabel="See What You Qualify For"
        secondaryHref="/fha-loans-arizona"
        secondaryLabel="Compare FHA"
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
          title="Conventional may fit buyers with stronger overall files."
          description="This loan type is often worth comparing when credit, income, assets, and property details support competitive conventional pricing."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {comparisons.map((item) => (
            <div key={item.title} className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-black text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Down Payment Examples"
            title="Conventional down payment can start lower than many buyers expect."
            description="For eligible buyers, 3% down conventional options can compete with FHA's 3.5% down path. Closing costs and mortgage insurance still need to be reviewed."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { price: "$250,000", down: "$7,500" },
              { price: "$300,000", down: "$9,000" },
              { price: "$350,000", down: "$10,500" }
            ].map((item) => (
              <div key={item.price} className="rounded-md border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  3% Down Example
                </p>
                <p className="mt-2 text-3xl font-black text-ink">{item.price}</p>
                <p className="mt-4 text-xl font-black text-saguaro-700">{item.down}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Pros And Cons"
          title="Conventional loans can be efficient when the file fits."
          description="The main question is whether conventional pricing and mortgage insurance beat the other available options for your exact scenario."
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
          title="Conventional loan questions."
          description="Use these as a starting point before comparing conventional, FHA, VA, and assistance options."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
