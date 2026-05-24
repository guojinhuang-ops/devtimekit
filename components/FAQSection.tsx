export default function FAQSection({
  items,
  title = 'FAQ'
}: {
  items: Array<{ q: string; a: string }>;
  title?: string;
}) {
  return (
    <section id="faq" className="card">
      <h2 className="text-xl font-semibold">{title}</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="font-medium text-slate-900 dark:text-slate-100">{item.q}</dt>
            <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}