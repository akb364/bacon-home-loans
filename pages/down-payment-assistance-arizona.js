import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const items = [
  "Income and purchase price limits",
  "Home buyer education requirements",
  "Eligible loan types and occupancy rules",
  "Repayment, forgiveness, or lien terms"
];

const faqs = [
  {
    question: "Is down payment assistance free money?",
    answer:
      "Sometimes assistance may be forgivable, and sometimes it may be repayable or recorded as a second lien. The terms matter, so they should be reviewed before choosing a program."
  },
  {
    question: "Can assistance cover all of my cash to close?",
    answer:
      "It depends on the program, loan type, purchase price, closing costs, seller credits, and your personal eligibility. Some buyers still need funds for earnest money, inspections, reserves, or remaining closing costs."
  },
  {
    question: "Will using assistance make my offer less competitive?",
    answer:
      "It can affect timing or documentation depending on the program. Planning early helps your loan officer and agent position the offer with fewer surprises."
  }
];

export default function DownPaymentAssistanceArizona() {
  return (
    <Layout>
      <Seo
        title="Down Payment Assistance Arizona"
        description="Learn how Arizona down payment assistance may work with Austin Bacon, NMLS ID 2728600, including eligibility, program terms, and cash-to-close planning."
        path="/down-payment-assistance-arizona"
      />
      <PageHero
        eyebrow="Down Payment Assistance"
        title="Arizona down payment assistance, without the confusion."
        description="Assistance programs can help qualified buyers reduce upfront cash needs, but each option has rules. A clear review helps you avoid choosing a program that slows down your purchase."
        primaryLabel="See What You Qualify For"
        secondaryHref="/first-time-home-buyer-programs-arizona"
        secondaryLabel="First-Time Buyer Info"
      >
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
          alt="Kitchen in a newly purchased home"
          className="h-56 w-full rounded-md object-cover"
        />
        <div className="mt-5 rounded-md bg-white p-5">
          <p className="text-3xl font-black text-saguaro-700">Plan first.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Assistance can affect offer strength, closing timelines, and future refinance choices.
          </p>
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Eligibility"
          title="The details matter as much as the dollar amount."
          description="Many buyers focus only on how much help is available. The better question is whether the program fits the property, loan type, closing timeline, and long-term plan."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-white p-5">
              <p className="font-bold text-ink">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <TrustSection />
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Down payment assistance questions."
          description="Assistance options can be valuable, but eligibility and repayment terms need careful review."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
