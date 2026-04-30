import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const highlights = [
  "Low down payment loan options",
  "Arizona assistance program review",
  "Pre-approval planning before home tours",
  "Monthly payment and cash-to-close clarity"
];

const faqs = [
  {
    question: "Do I have to be a first-time buyer to use buyer programs?",
    answer:
      "Not always. Some programs define first-time buyer as someone who has not owned a home in the last three years, while others may be open to repeat buyers depending on the loan type, location, or assistance source."
  },
  {
    question: "How much money should I expect to need upfront?",
    answer:
      "That depends on the loan program, price range, seller credits, assistance availability, taxes, insurance, and closing costs. A useful first step is estimating both monthly payment and cash to close together."
  },
  {
    question: "Can I get pre-approved before choosing a house?",
    answer:
      "Yes. In most cases, reviewing your income, credit, assets, and goals before shopping helps you understand your range and gives your agent a stronger starting point."
  }
];

export default function FirstTimeBuyerPrograms() {
  return (
    <Layout>
      <Seo
        title="First-Time Home Buyer Programs Arizona"
        description="Explore Arizona first-time home buyer programs with Austin Bacon, NMLS ID 2728600. Compare low down payment options, FHA loans, and assistance programs."
        path="/first-time-home-buyer-programs-arizona"
      />
      <PageHero
        eyebrow="First-Time Buyers"
        title="First-time home buyer programs in Arizona."
        description="Buying your first home is easier to navigate when the loan options, assistance programs, and cash needed at closing are mapped out before you start touring homes."
        primaryLabel="See What You Qualify For"
        secondaryHref="/down-payment-assistance-arizona"
        secondaryLabel="See Assistance Options"
      >
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
          alt="Arizona style home entryway"
          className="h-64 w-full rounded-md object-cover"
        />
        <div className="mt-5 grid gap-3">
          {highlights.map((item) => (
            <p key={item} className="rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="What To Expect"
          title="A cleaner path from questions to pre-approval."
          description="First-time buyer programs can vary by loan type, income, location, and funding availability. The practical move is to compare options early, then choose the structure that supports your offer and long-term budget."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Program fit", "Offer readiness", "Closing costs"].map((title) => (
            <div key={title} className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-black text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Review the details that affect approval, timing, and the funds you need to close
                before making a decision.
              </p>
            </div>
          ))}
        </div>
      </Section>
      <TrustSection />
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="First-time buyer questions."
          description="These answers are informational and a personalized review is needed before choosing a loan path."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
