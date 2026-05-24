export default function SeoSections({
  toolName,
  whatIs,
  howTo,
  faqs
}: {
  toolName: string;
  whatIs: string;
  howTo: string[];
  faqs: Array<{ q: string; a: string }>;
}) {
  return (
    <section className="card mt-8 space-y-8" aria-label={`${toolName} SEO content`}>
      <section>
        <h2 className="text-lg font-semibold text-slate-900">What is this tool?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{whatIs}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">How to use it?</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-700">
          {howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
        <dl className="mt-2 space-y-4">
          {faqs.map((item) => (
            <div key={item.q}>
              <dt className="font-medium text-slate-900">{item.q}</dt>
              <dd className="mt-1 text-sm leading-6 text-slate-700">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}