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
