import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Why do frontend tools use milliseconds?', a: 'Browser APIs such as Date.now return milliseconds for better temporal precision.' },
  { q: 'How do I convert ms to seconds?', a: 'Divide by 1000 and round or floor based on your API contract.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Unix Time in Milliseconds',
  description: 'Understand and convert Unix time in milliseconds for frontend apps, APIs, and logs.',
  path: '/unix-time-in-milliseconds'
});

export default function UnixTimeInMillisecondsPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Unix Time in Milliseconds', path: '/unix-time-in-milliseconds', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Unix Time in Milliseconds', path: '/unix-time-in-milliseconds' }])} />
      <header className="card"><h1 className="text-3xl font-bold">Unix Time in Milliseconds</h1><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">A practical guide to millisecond timestamps in client and API workflows.</p></header>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} /><div className="space-y-6">
        <SEOSection id="what" title="What is this tool?" content="This page helps you reason about Unix timestamps in milliseconds, which are common in JavaScript, telemetry, and browser events." />
        <SEOSection id="how" title="How to use it" content="Detect 13-digit values as milliseconds, convert to UTC/ISO for readability, and normalize to seconds when backend endpoints require 10-digit input." />
        <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>1716547200000 ms -&gt; 1716547200 s</li><li>1716547200 s -&gt; 1716547200000 ms</li></ul></section>
        <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Frontend click and session analytics.</li><li>Performance timing and Web Vitals.</li><li>API event ingestion and trace stitching.</li></ul></section>
        <FAQSection items={faqItems} />
      </div></div>
      <RelatedTools currentPath="/unix-time-in-milliseconds" />
    </article>
  );
}