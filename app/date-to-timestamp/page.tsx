import type { Metadata } from 'next';
import DateToTimestampForm from '@/components/DateToTimestampForm';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Which timezone is used in conversion?', a: 'This converter uses the local timezone from your browser for input parsing.' },
  { q: 'Can I convert to milliseconds and seconds together?', a: 'Yes, both outputs are generated from one input.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Date to Timestamp Converter',
  description: 'Convert local date/time input to Unix seconds and milliseconds in one step.',
  path: '/date-to-timestamp'
});

export default function DateToTimestampPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Date to Timestamp Converter', path: '/date-to-timestamp', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Date to Timestamp', path: '/date-to-timestamp' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Date to Timestamp</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Convert local date/time strings into Unix seconds and milliseconds.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'tool', label: 'Converter Tool' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <section id="tool">
            <DateToTimestampForm />
          </section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/date-to-timestamp" />
    </article>
  );
}