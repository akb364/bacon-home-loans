import AffordabilityCalculator from "../components/AffordabilityCalculator";
import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const heroPoints = [
  "Estimate buying power from income, debts, down payment, taxes, insurance, and HOA dues",
  "Adjust the rate, target debt-to-income ratio, and Arizona property tax assumption",
  "Use the result as a planning range before a full pre-approval review"
];

const factors = [
  {
    title: "Income and monthly debts",
    description:
      "Car payments, student loans, credit cards, personal loans, and other recurring debts reduce the monthly room available for a mortgage payment."
  },
  {
    title: "Arizona taxes and insurance",
    description:
      "Property taxes and homeowners insurance are usually part of the monthly escrow payment, so they matter just as much as principal and interest."
  },
  {
    title: "Loan type and down payment",
    description:
      "FHA, conventional, VA, assistance programs, mortgage insurance, and seller credits can all change the payment and cash needed to close."
  }
];

const faqs = [
  {
    question: "Is this an Arizona mortgage approval?",
    answer:
      "No. This calculator is an educational estimate. A real pre-approval reviews credit, income, assets, liabilities, property details, loan type, and underwriting guidelines."
  },
  {
    question: "Why does the calculator include property taxes and insurance?",
    answer:
      "Most buyers think about principal and interest first, but taxes and insurance are commonly included in the monthly mortgage payment and can materially change affordability."
  },
  {
    question: "What debt-to-income ratio should I use?",
    answer:
      "The right target depends on loan type, credit profile, reserves, compensating factors, and personal comfort. The default is a planning estimate, not a rule or approval limit."
  }
];

export default function ArizonaAffordabilityPage() {
  return (
    <Layout>
      <Seo
        title="How Much Home Can I Afford in Arizona?"
        description="Estimate how much home you may be able to afford in Arizona using income, monthly debts, down payment, interest rate, property taxes, insurance, and HOA dues."
        path="/how-much-home-can-i-afford-arizona"
      />
      <PageHero
        eyebrow="Arizona Affordability Calculator"
        title="How much home can I afford in Arizona?"
        description="Run a quick planning estimate before you tour homes, compare loan programs, or ask for a full pre-approval review."
        primaryLabel="Review My Real Numbers"
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
            eyebrow="Affordability Estimate"
            title="Start with the payment, then work backward to the home price."
            description="Change any input below to see how your Arizona buying power moves. The estimate includes principal and interest, property tax, homeowners insurance, HOA dues, and existing monthly debts."
          />
          <div className="mt-10">
            <AffordabilityCalculator />
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="What Changes The Number"
          title="Affordability is more than one income multiple."
          description="Two Arizona buyers with the same salary can have very different price ranges once debts, loan type, property taxes, insurance, HOA dues, and cash-to-close are included."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {factors.map((factor) => (
            <div key={factor.title} className="rounded-md border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-black text-ink">{factor.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{factor.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Next Step"
            title="Turn the estimate into a real Arizona loan strategy."
            description="A pre-approval can compare loan types, mortgage insurance, assistance programs, seller credits, and payment comfort before you write an offer."
          />
        </Section>
      </section>

      <TrustSection />

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Arizona affordability questions."
          description="Use the calculator as a starting point, then verify the details against your full financial picture."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
