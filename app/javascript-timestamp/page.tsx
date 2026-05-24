import type { Metadata } from 'next';
import CodeBlock from '@/components/CodeBlock';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Should I use Date.now or new Date?', a: 'Use Date.now for numeric milliseconds and new Date for formatting or parsing date objects.' },
  { q: 'Why does JavaScript return milliseconds?', a: 'JavaScript Date APIs are millisecond-based for higher precision on the client side.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'JavaScript Timestamp Guide',
  description: 'Practical JavaScript timestamp examples for Date.now, Unix conversion, and UTC formatting.',
  path: '/javascript-timestamp'
});

export default function JavaScriptTimestampPage() {
  const js = `// current timestamp in milliseconds\nconst ms = Date.now();\n\n// seconds for APIs\nconst seconds = Math.floor(ms / 1000);\n\n// readable UTC\nconst utc = new Date(ms).toUTCString();`;

  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'JavaScript Timestamp Guide', path: '/javascript-timestamp', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'JavaScript Timestamp', path: '/javascript-timestamp' }])} />

      <header className="card"><h1 className="text-3xl font-bold">JavaScript Timestamp</h1><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">A focused reference for generating and converting timestamps in JavaScript.</p></header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} /><div className="space-y-6">
        <SEOSection id="what" title="What is this tool?" content="This page gives JavaScript developers a practical timestamp reference with copy-ready snippets and unit conversion guidance." />
        <SEOSection id="how" title="How to use it" content="Use Date.now() for current milliseconds, convert to seconds for Unix APIs, and format UTC/ISO strings for logs and debugging." />
        <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><div className="mt-4"><CodeBlock title="JavaScript" language="js" code={js} /></div></section>
        <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Client-side telemetry timestamps.</li><li>Token expiry calculations.</li><li>Formatting audit events in frontend dashboards.</li></ul></section>
        <FAQSection items={faqItems} />
      </div></div>

      <RelatedTools currentPath="/javascript-timestamp" />
    </article>
  );
}
