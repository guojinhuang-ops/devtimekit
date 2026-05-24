import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Is epoch converter the same as timestamp converter?', a: 'Yes, in most developer contexts epoch and Unix timestamp refer to the same concept.' },
  { q: 'Does this tool support milliseconds?', a: 'Yes, it is useful for checking both seconds and milliseconds based values.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Epoch Converter',
  description: 'Convert epoch time values to readable UTC, ISO 8601, and local datetime formats.',
  path: '/epoch-converter'
});

export default function EpochConverterPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Epoch Converter', path: '/epoch-converter', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Epoch Converter', path: '/epoch-converter' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Epoch Converter</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Convert epoch timestamps into clear, copy-ready date formats for debugging and API development.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <SEOSection id="what" title="What is this tool?" content="Epoch Converter helps developers translate raw Unix time values into readable timestamps. It is useful when logs or APIs return numeric time and you need fast human verification." />
          <SEOSection id="how" title="How to use it" content="Paste an epoch value, verify whether it is seconds or milliseconds, and review UTC, ISO, and local outputs. Copy the format that matches your incident report or code review context." />
          <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>1716547200 -&gt; 2024-05-24T00:00:00Z</li><li>1716547200000 -&gt; 2024-05-24T00:00:00Z</li></ul></section>
          <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Debugging event order in distributed logs.</li><li>Validating webhook payload timestamps.</li><li>Checking cache expiration windows.</li></ul></section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/epoch-converter" />
    </article>
  );
}