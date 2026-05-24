import type { Metadata } from 'next';
import CurrentNowPanel from '@/components/CurrentNowPanel';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Why use UTC now in development?', a: 'UTC removes timezone ambiguity when coordinating logs and deployments across regions.' },
  { q: 'Can I copy UTC output directly?', a: 'Yes, each output row provides a copy action for quick use in tickets or code.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'UTC Time Now',
  description: 'Get the current UTC time instantly with Unix seconds, milliseconds, and ISO 8601 output.',
  path: '/utc-time-now'
});

export default function UtcTimeNowPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'UTC Time Now', path: '/utc-time-now', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'UTC Time Now', path: '/utc-time-now' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">UTC Time Now</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Live UTC references for release coordination, logging, and incident response.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'tool', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <section id="tool"><CurrentNowPanel /></section>
          <SEOSection id="how" title="How to use it" content="Open this page to read the current UTC, ISO 8601, and Unix timestamp values. Copy the format you need and paste it into release notes, API tests, or monitoring annotations." />
          <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>UTC: Sun, 24 May 2026 06:00:00 GMT</li><li>ISO: 2026-05-24T06:00:00.000Z</li></ul></section>
          <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Coordinating global deployments.</li><li>Comparing log events from multiple timezones.</li><li>Documenting incident timelines.</li></ul></section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/utc-time-now" />
    </article>
  );
}
