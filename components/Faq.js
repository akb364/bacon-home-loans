export default function Faq({ items }) {
  return (
    <div className="mt-10 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-ink">
            {item.question}
            <span className="text-xl leading-none text-saguaro-700 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
