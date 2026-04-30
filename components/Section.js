export function Section({ children, className = "" }) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-14 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-desert-600">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}
