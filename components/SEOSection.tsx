export default function SEOSection({
  id,
  title,
  content
}: {
  id: string;
  title: string;
  content: string;
}) {
  return (
    <section id={id} className="card">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{content}</p>
    </section>
  );
}