import Link from "next/link";
import Disclaimer from "../components/Disclaimer";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import TrustSection from "../components/TrustSection";

const programs = [
  {
    title: "First-Time Home Buyer Programs",
    benefit: "Map out your budget, loan type, and cash-to-close before you start touring homes.",
    points: ["Low down payment paths", "Buyer education guidance", "Offer-ready pre-approval"],
    href: "/first-time-home-buyer-programs-arizona"
  },
  {
    title: "FHA Loans",
    benefit: "Compare flexible FHA guidelines against your monthly payment and long-term plan.",
    points: ["Flexible credit review", "Lower down payment option", "Property condition guidance"],
    href: "/fha-loans-arizona"
  },
  {
    title: "Conventional Loans",
    benefit: "Learn when conventional financing may offer lower long-term costs and more flexibility.",
    points: ["3% down options", "Cancellable mortgage insurance", "Primary or repeat buyer paths"],
    href: "/conventional-loans-arizona"
  },
  {
    title: "VA Loans",
    benefit: "Understand the benefits available to eligible Veterans, service members, and spouses.",
    points: ["Potential zero down payment", "No monthly PMI", "COE and entitlement review"],
    href: "/va-loans-arizona"
  },
  {
    title: "Down Payment Assistance",
    benefit: "See whether assistance can reduce upfront cash without weakening your buying strategy.",
    points: ["Program eligibility check", "Assistance term review", "Timeline and offer planning"],
    href: "/down-payment-assistance-arizona"
  }
];

const steps = [
  "Clarify your budget and loan options",
  "Prepare a confident pre-approval",
  "Coordinate with your Arizona real estate agent",
  "Move from offer to closing with clean communication"
];

export default function Home() {
  return (
    <Layout>
      <Seo
        title="Arizona Mortgage Loan Officer Austin Bacon"
        description="Austin Bacon, NMLS ID 2728600, helps Arizona home buyers compare FHA loans, first-time buyer programs, and down payment assistance. Powered by Artemis Mortgage."
        path="/"
      />
      <section className="relative min-h-[680px] overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
          alt="Modern home exterior at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 pb-20 pt-28 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-desert-100">
            Arizona Mortgage Guidance
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Home loans made clearer for Arizona buyers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
            Work with Austin Bacon, an Arizona mortgage loan officer, to compare programs,
            understand the numbers, and move through your mortgage process with a calm plan.
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-desert-100">
            NMLS ID: 2728600 | Powered by Artemis Mortgage
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-desert-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-desert-600"
            >
              See What You Qualify For
            </Link>
            <Link
              href="/first-time-home-buyer-programs-arizona"
              className="rounded-md border border-white/50 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Buyer Programs
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Loan Programs"
          title="Arizona mortgage options, explained in plain English."
          description="Whether you are buying your first home, comparing FHA, or looking for down payment help, the goal is a loan plan that fits your timeline and your monthly comfort zone."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.title}
              href={program.href}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-saguaro-500 hover:shadow-soft"
            >
              <h3 className="text-xl font-black text-ink">{program.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{program.benefit}</p>
              <ul className="mt-5 space-y-2">
                {program.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm font-semibold text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-desert-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-block text-sm font-bold text-saguaro-700">
                See benefits
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <TrustSection />

      <section className="bg-white">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Local Process"
                title="Built around the way Arizona buyers actually shop."
                description="Fast-moving neighborhoods, new-build incentives, seasonal relocations, and limited inventory can all affect the loan strategy. The right prep keeps surprises out of the closing week."
              />
              <Link
                href="/contact"
                className="mt-7 inline-block rounded-md bg-saguaro-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-saguaro-500"
              >
                Talk Through Your Scenario
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => (
                <div key={step} className="rounded-md border border-slate-200 bg-slate-50 p-5">
                  <span className="text-sm font-black text-desert-600">0{index + 1}</span>
                  <p className="mt-3 font-bold leading-6 text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>
      <Section className="pt-0">
        <div className="rounded-md bg-ink p-7 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-desert-100">
              Ready For Numbers?
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Get a clearer view of your Arizona loan options.
            </h2>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-md bg-desert-500 px-5 py-3 text-sm font-black text-white transition hover:bg-desert-600 md:mt-0"
          >
            See What You Qualify For
          </Link>
        </div>
        <Disclaimer className="mt-6" />
      </Section>
    </Layout>
  );
}
