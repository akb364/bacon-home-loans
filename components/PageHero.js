import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "See What You Qualify For",
  secondaryHref,
  secondaryLabel,
  children
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-desert-50 to-white" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-desert-600">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-slate-500">
            No backend is connected yet. This starts the conversation and helps organize your next
            steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-md bg-saguaro-700 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-saguaro-500"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && (
              <Link
                href={secondaryHref}
                className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-saguaro-500 hover:text-saguaro-700"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-6 shadow-soft">
          {children}
        </div>
      </div>
    </section>
  );
}
