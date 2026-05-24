import CopyButton from '@/components/CopyButton';

export default function CodeBlock({
  language,
  code,
  title
}: {
  language: string;
  code: string;
  title: string;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-sm dark:border-slate-700">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <CopyButton value={code} label="Copy code" />
      </div>
      <pre className="overflow-x-auto text-xs leading-6">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </section>
  );
}