import Link from "next/link";
import Disclaimer from "../components/Disclaimer";
import Faq from "../components/Faq";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";

const paymentFactors = [
  {
    title: "Property taxes",
    text: "Arizona property taxes vary by parcel and taxing district. Use the tax amount for the specific home when comparing payments—not a statewide rule of thumb."
  },
  {
    title: "Homeowners insurance",
    text: "Premiums depend on the property, coverage, claims history, and insurer. Get a property-specific quote early because an online estimate can miss the actual cost."
  },
  {
    title: "HOA dues",
    text: "Many Phoenix-area communities have an HOA. Monthly dues count in the housing payment used for qualification, even though they are paid separately from the mortgage."
  },
  {
    title: "Mortgage insurance",
    text: "FHA and low-down-payment conventional loans can include mortgage insurance. Compare the complete payment and long-term cost instead of down payment alone."
  }
];

const localChecks = [
  "Confirm whether the home has one HOA, multiple associations, or transfer fees",
  "Review condo eligibility before relying on FHA, VA, or conventional financing",
  "Compare builder incentives with an outside lender's total loan cost",
  "Budget for inspection, appraisal, earnest money, and prepaid taxes and insurance",
  "Ask how solar equipment is owned, leased, or financed before making an offer",
  "Recalculate the payment for each property instead of shopping by price alone"
];

const faqs = [
  {
    question: "Do I need a lender located inside Phoenix to buy a Phoenix home?",
    answer:
      "No. The important questions are whether the loan officer is licensed for Arizona, understands the local transaction, offers a suitable loan program, and can meet the contract timeline. Austin Bacon serves Arizona buyers from Gilbert."
  },
  {
    question: "How much do I need for a down payment in Phoenix?",
    answer:
      "It depends on the loan and your eligibility. Some conventional programs may allow 3% down, FHA may allow 3.5% down for qualifying borrowers, and eligible VA borrowers may have a zero-down-payment option. Closing costs and prepaid expenses are separate from the down payment."
  },
  {
    question: "Can a Phoenix buyer use down payment assistance?",
    answer:
      "Potentially. Assistance programs can have income, purchase price, credit, occupancy, education, and approved-lender requirements. Funding and program terms can change, so current eligibility must be verified before relying on assistance in an offer."
  },
  {
    question: "Should I get pre-approved before touring homes?",
    answer:
      "Usually, yes. A pre-approval can establish a useful price and payment range, identify documentation issues, and help your real estate agent write an offer that matches the financing timeline. It is not a final loan approval."
  },
  {
    question: "Are new-build lender incentives always the best deal?",
    answer:
      "Not necessarily. Compare the interest rate, discount points, lender fees, credits, mortgage insurance, and future plans. A large advertised credit can still accompany a higher rate or different loan cost."
  }
];

export default function PhoenixMortgageLender() {
  return (
    <Layout>
      <Seo
        title="Phoenix Mortgage Lender & Arizona Home Loan Guide"
        description="A practical Phoenix mortgage guide for Arizona buyers. Learn how down payments, HOA dues, property taxes, insurance, FHA, VA, conventional loans, and assistance affect your home purchase."
        path="/mortgage-lender-phoenix-az"
      />

      <PageHero
        eyebrow="Phoenix Mortgage Education"
        title="A Phoenix mortgage lender guide built for Arizona home buyers."
        description="A home price is only the starting point. Learn how Arizona loan options, Phoenix-area property costs, HOAs, insurance, and cash to close work together before you make an offer."
        primaryLabel="Discuss Your Arizona Purchase"
        secondaryHref="/how-much-home-can-i-afford-arizona"
        secondaryLabel="Estimate Affordability"
      >
        <div className="rounded-md bg-ink p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-desert-100">
            Start with four numbers
          </p>
          <ol className="mt-5 space-y-4 text-sm font-bold leading-6">
            <li>1. A comfortable total monthly payment</li>
            <li>2. Available cash after keeping reserves</li>
            <li>3. Current debts and qualifying income</li>
            <li>4. A realistic Phoenix-area purchase range</li>
          </ol>
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Phoenix Payment Basics"
          title="Why two Phoenix homes at the same price can have different payments."
          description="The principal and interest payment is only one piece. Property-specific costs can change both monthly affordability and the amount needed at closing."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {paymentFactors.map((factor) => (
            <article key={factor.title} className="rounded-md border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-ink">{factor.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{factor.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Arizona Loan Options"
            title="Compare the loan structure, not just the advertised rate."
            description="The right mortgage depends on eligibility, credit, down payment, property type, payment target, and how long you expect to own or keep the loan."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["FHA loans", "Flexible guidelines and a lower-down-payment path for some buyers.", "/fha-loans-arizona"],
              ["Conventional loans", "Options that may reward stronger credit and can offer cancellable mortgage insurance.", "/conventional-loans-arizona"],
              ["VA loans", "A powerful benefit for eligible service members, Veterans, and surviving spouses.", "/va-loans-arizona"],
              ["Buyer assistance", "Programs that may help with upfront funds but include eligibility and program terms.", "/down-payment-assistance-arizona"]
            ].map(([title, text, href]) => (
              <Link key={title} href={href} className="rounded-md border border-slate-200 bg-slate-50 p-5 transition hover:border-saguaro-500">
                <h2 className="text-lg font-black text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                <span className="mt-4 inline-block text-sm font-bold text-saguaro-700">Learn more</span>
              </Link>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Before You Offer"
          title="A Phoenix-area property checklist for financed buyers."
          description="These questions can uncover costs or loan requirements before they threaten the contract timeline."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {localChecks.map((item) => (
            <li key={item} className="flex gap-3 rounded-md border border-slate-200 bg-white p-5 text-sm font-semibold leading-6 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-desert-500" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-white">
        <Section>
          <SectionHeader
            eyebrow="Local Coverage"
            title="Serving home buyers across Phoenix and Arizona."
            description="Austin Bacon is based in Gilbert and works with buyers across Arizona, including Phoenix, Mesa, Chandler, Gilbert, Tempe, Scottsdale, Glendale, and other communities statewide. Location-specific eligibility and property details are verified during the loan review."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/home-buying-roadmap-arizona" className="rounded-md bg-saguaro-700 px-5 py-3 text-sm font-bold text-white">
              Follow the Arizona Buying Roadmap
            </Link>
            <Link href="/first-time-home-buyer-programs-arizona" className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-ink">
              First-Time Buyer Education
            </Link>
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Phoenix Mortgage FAQ"
          title="Questions Arizona buyers ask before pre-approval."
          description="Use these answers as a starting point, then verify current loan and program details for your situation."
        />
        <Faq items={faqs} />
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
