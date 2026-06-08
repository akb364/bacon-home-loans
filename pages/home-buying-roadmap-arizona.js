import Link from "next/link";
import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const roadmapSteps = [
  {
    step: "Step 1",
    title: "Check affordability",
    description:
      "Start with income, monthly debts, down payment, taxes, insurance, HOA dues, and payment comfort so your search begins inside a realistic range.",
    action: "Use the affordability calculator before you tour homes."
  },
  {
    step: "Step 2",
    title: "Get pre-approved",
    description:
      "Review credit, income, assets, debts, and loan options so you know what you can qualify for and what payment range actually fits.",
    action: "Compare FHA, conventional, VA, and assistance options if eligible."
  },
  {
    step: "Step 3",
    title: "Find a realtor",
    description:
      "Work with an Arizona real estate agent who understands your target areas, budget, offer strategy, and timeline.",
    action: "Share your pre-approval and payment goals with your agent."
  },
  {
    step: "Step 4",
    title: "Make an offer",
    description:
      "Your lender and realtor can help shape the offer around price, seller concessions, closing timeline, and financing terms.",
    action: "Confirm payment and cash-to-close before the offer goes out."
  },
  {
    step: "Step 5",
    title: "Inspection & appraisal",
    description:
      "The inspection helps you understand the home condition. The appraisal helps confirm the property's value for the loan.",
    action: "Keep communication tight if repairs, credits, or value questions come up."
  },
  {
    step: "Step 6",
    title: "Final underwriting",
    description:
      "The underwriter reviews updated documents, title work, appraisal, insurance, and final loan details before clear to close.",
    action: "Avoid new debt, large undocumented deposits, or job changes during this stage."
  },
  {
    step: "Step 7",
    title: "Closing day",
    description:
      "You sign final loan documents, send any required funds, and receive keys after the closing process is complete.",
    action: "Review the final cash-to-close and closing appointment details ahead of time."
  }
];

const faqs = [
  {
    question: "Should I find a realtor before getting pre-approved?",
    answer:
      "You can talk with a realtor early, but a pre-approval helps define your price range, payment target, and offer strength before serious touring begins."
  },
  {
    question: "When should I use the affordability calculator?",
    answer:
      "Use it at the beginning of the process, then revisit it when rates, taxes, insurance, HOA dues, or your target price changes."
  },
  {
    question: "What can slow down final underwriting?",
    answer:
      "Common slowdowns include missing documents, new debts, large unexplained deposits, appraisal or title issues, insurance delays, and changes to employment or income."
  }
];

export default function HomeBuyingRoadmapArizona() {
  return (
    <Layout>
      <Seo
        title="Arizona Home Buying Roadmap"
        description="Follow a simple Arizona home buying roadmap: check affordability, get pre-approved, find a realtor, make an offer, complete inspection and appraisal, finish underwriting, and close."
        path="/home-buying-roadmap-arizona"
      />
      <PageHero
        eyebrow="Home Buying Roadmap"
        title="A clear path from affordability to closing day."
        description="Buying a home is easier to navigate when each step has a job. This roadmap shows how the mortgage pieces, realtor conversations, offer process, and closing timeline fit together."
        primaryLabel="Start With Pre-Approval"
      >
        <div className="space-y-4">
          {roadmapSteps.slice(0, 4).map((item) => (
            <div key={item.title} className="rounded-md bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-desert-600">
                {item.step}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{item.title}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Seven Steps"
            title="The Arizona home buying roadmap."
            description="Use this as a practical sequence for getting ready, shopping with confidence, and moving from contract to closing without losing sight of the numbers."
          />
          <div className="mt-10 grid gap-5">
            {roadmapSteps.map((item) => (
              <div
                key={item.title}
                className="grid gap-5 rounded-md border border-slate-200 bg-slate-50 p-5 md:grid-cols-[0.28fr_1fr_0.8fr] md:items-start"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-desert-600">
                    {item.step}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-4">
                  <p className="text-sm font-bold leading-6 text-slate-700">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <div className="grid gap-8 rounded-md bg-ink p-7 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-desert-100">
              Start At Step 1
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Check affordability before the search gets emotional.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
              A quick estimate helps you understand payment comfort, down payment options, and the
              pre-approval conversation before you start comparing homes.
            </p>
          </div>
          <Link
            href="/how-much-home-can-i-afford-arizona"
            className="rounded-md bg-desert-500 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-desert-600"
          >
            Check Affordability
          </Link>
        </div>
      </Section>

      <TrustSection />

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Home buying roadmap questions."
          description="The right order matters because the loan details affect the search, the offer, and the closing timeline."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
