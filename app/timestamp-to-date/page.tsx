import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import TimestampToDateForm from '@/components/TimestampToDateForm';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Can I input milliseconds?', a: 'Yes, the converter supports 13-digit milliseconds and also 16/19 digit high precision values.' },
  { q: 'What format should I trust for API communication?', a: 'Use UTC or ISO 8601 for consistent cross-timezone processing.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Timestamp to Date Converter',
  description: 'Convert Unix timestamp values into local time, UTC, ISO 8601, and more.',
  path: '/timestamp-to-date'
});

export default function TimestampToDatePage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Timestamp to Date Converter', path: '/timestamp-to-date', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Timestamp to Date', path: '/timestamp-to-date' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Timestamp to Date</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Convert epoch timestamps into readable date formats instantly.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'tool', label: 'Converter Tool' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <section id="tool">
            <TimestampToDateForm />
          </section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/timestamp-to-date" />
    </article>
  );
}