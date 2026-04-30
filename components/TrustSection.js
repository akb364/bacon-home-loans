import { Section, SectionHeader } from "./Section";

const trustItems = [
  {
    title: "Local Arizona guidance",
    text: "Loan planning is shaped around Arizona markets, new-build timelines, seasonal relocations, and statewide program options."
  },
  {
    title: "Clear numbers early",
    text: "Review estimated monthly payment, funds to close, program tradeoffs, and documentation needs before you get deep into the search."
  },
  {
    title: "Responsive purchase support",
    text: "Your loan plan is built to help you and your agent move quickly when the right home appears."
  }
];

export default function TrustSection() {
  return (
    <section className="bg-white">
      <Section>
        <SectionHeader
          eyebrow="Why Buyers Reach Out"
          title="Mortgage guidance that reduces second-guessing."
          description="A strong loan conversation should leave you with useful next steps, realistic numbers, and a better sense of what is possible before you apply."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-black text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
