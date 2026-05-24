import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'What does Z mean in ISO 8601?', a: 'Z means the timestamp is in UTC and has zero offset from Coordinated Universal Time.' },
  { q: 'Is ISO 8601 better than local date strings?', a: 'For APIs and logs, yes. ISO 8601 is explicit, sortable, and timezone-aware.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'ISO 8601 Converter',
  description: 'Convert ISO 8601 datetime strings and Unix timestamps with clear UTC-aware output.',
  path: '/iso-8601-converter'
});

export default function Iso8601ConverterPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'ISO 8601 Converter', path: '/iso-8601-converter', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'ISO 8601 Converter', path: '/iso-8601-converter' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">ISO 8601 Converter</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Understand and convert ISO 8601 timestamps for APIs, logs, and data pipelines.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <SEOSection id="what" title="What is this tool?" content="ISO 8601 Converter helps you validate and translate standardized datetime strings. It is especially useful when APIs require strict UTC or offset-aware timestamps." />
          <SEOSection id="how" title="How to use it" content="Provide an ISO 8601 value such as 2026-05-24T06:30:00Z, then map it to Unix seconds or milliseconds. Reverse conversion is useful for readable debugging output." />
          <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>2026-05-24T06:30:00Z -&gt; 1779594600</li><li>1779594600 -&gt; 2026-05-24T06:30:00Z</li></ul></section>
          <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>API request/response validation.</li><li>Converting human-readable incident timelines.</li><li>Normalizing data from third-party integrations.</li></ul></section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/iso-8601-converter" />
    </article>
  );
}