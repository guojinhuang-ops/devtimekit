import type { Metadata } from 'next';
import CodeBlock from '@/components/CodeBlock';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Should I use time.time or datetime.now?', a: 'Use time.time for raw Unix timestamps and datetime for timezone-aware formatting workflows.' },
  { q: 'How do I get UTC in Python?', a: 'Use datetime.now(timezone.utc) for explicit UTC-aware datetime objects.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Python Timestamp Guide',
  description: 'Use Python time and datetime modules to generate, parse, and format Unix timestamps.',
  path: '/python-timestamp'
});

export default function PythonTimestampPage() {
  const py = `import time\nfrom datetime import datetime, timezone\n\n# current unix seconds\nseconds = int(time.time())\n\n# utc datetime\nutc_now = datetime.now(timezone.utc)\n\n# from timestamp\nreadable = datetime.fromtimestamp(seconds, timezone.utc).isoformat()`;

  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Python Timestamp Guide', path: '/python-timestamp', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Python Timestamp', path: '/python-timestamp' }])} />
      <header className="card"><h1 className="text-3xl font-bold">Python Timestamp</h1><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Reliable Unix timestamp patterns in Python for backend services and scripts.</p></header>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} /><div className="space-y-6">
        <SEOSection id="what" title="What is this tool?" content="This page is a Python-oriented timestamp reference that covers generation, parsing, and UTC-safe formatting patterns." />
        <SEOSection id="how" title="How to use it" content="Use the examples to standardize timestamp handling in CLI scripts, web services, and ETL jobs. Prefer timezone-aware datetime objects for correctness." />
        <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><div className="mt-4"><CodeBlock title="Python" language="py" code={py} /></div></section>
        <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Service event timestamps in APIs.</li><li>ETL pipeline ingestion ordering.</li><li>Automated reporting windows.</li></ul></section>
        <FAQSection items={faqItems} />
      </div></div>
      <RelatedTools currentPath="/python-timestamp" />
    </article>
  );
}
