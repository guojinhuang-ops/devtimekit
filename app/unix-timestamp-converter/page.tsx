import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import ProgrammingExamples from '@/components/ProgrammingExamples';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import CurrentNowPanel from '@/components/CurrentNowPanel';
import UnixConverterPanel from '@/components/UnixConverterPanel';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';
import { humanDurationExamples } from '@/lib/utils';

const faqItems = [
  { q: 'Does this converter support microseconds and nanoseconds?', a: 'Yes, 16-digit microseconds and 19-digit nanoseconds are auto-detected.' },
  { q: 'Is this converter server-side?', a: 'No, all calculations run in the browser for privacy and static deployment compatibility.' },
  { q: 'Why are my converted dates different between machines?', a: 'Local output depends on timezone settings. Use UTC or ISO fields for a shared reference.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Unix Timestamp Converter',
  description:
    'Convert Unix seconds, milliseconds, microseconds, and nanoseconds to UTC, ISO 8601, RFC 2822, and local time.',
  path: '/unix-timestamp-converter'
});

export default function UnixTimestampConverterPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Unix Timestamp Converter', path: '/unix-timestamp-converter', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Unix Timestamp Converter', path: '/unix-timestamp-converter' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Unix Timestamp Converter</h1>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          Convert epoch values across seconds, milliseconds, microseconds, and nanoseconds. Copy formatted results for logs, APIs, and database workflows.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents
          items={[
            { id: 'current-now', label: 'Current Time Snapshot' },
            { id: 'converter', label: 'Timestamp Converter' },
            { id: 'duration', label: 'Human-readable Duration' },
            { id: 'programming-examples', label: 'Programming Examples' },
            { id: 'unix-timestamp', label: 'What is Unix timestamp?' },
            { id: 'epoch-time', label: 'What is epoch time?' },
            { id: 'vs-ms', label: 'Unix timestamp vs milliseconds' },
            { id: 'why-1970', label: 'Why Unix time starts in 1970' },
            { id: 'y2038', label: 'The Year 2038 problem' },
            { id: 'utc-local', label: 'UTC vs local time' },
            { id: 'mistakes', label: 'Common timestamp mistakes' },
            { id: 'faq', label: 'FAQ' }
          ]}
        />

        <div className="space-y-6">
          <section id="current-now">
            <CurrentNowPanel />
          </section>

          <UnixConverterPanel />

          <section id="duration" className="card">
            <h2 className="text-xl font-semibold">Human-readable Duration</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {humanDurationExamples().map((item) => (
                <li key={item.input}>
                  <strong>{item.input}</strong> = {item.output}
                </li>
              ))}
            </ul>
          </section>

          <ProgrammingExamples />

          <SEOSection id="unix-timestamp" title="What is Unix timestamp?" content="Unix timestamp is the count of elapsed seconds since 1970-01-01T00:00:00Z. It is widely used because it is compact, easy to compare, and language-neutral." />
          <SEOSection id="epoch-time" title="What is epoch time?" content="Epoch time is another name for Unix time. Developers use both terms interchangeably when discussing backend timing and distributed systems." />
          <SEOSection id="vs-ms" title="Unix timestamp vs milliseconds" content="Seconds are common in backend APIs. Milliseconds are common in JavaScript and frontend telemetry. Always validate units before conversion to avoid date drift." />
          <SEOSection id="why-1970" title="Why Unix time starts in 1970" content="Unix selected 1970-01-01 UTC as a practical zero point. It became the industry baseline for many operating systems and protocol implementations." />
          <SEOSection id="y2038" title="The Year 2038 problem" content="Signed 32-bit integer timestamps can overflow in 2038. Use 64-bit timestamp storage and modern runtime libraries to remain safe." />
          <SEOSection id="utc-local" title="UTC vs local time" content="Store and compare timestamps in UTC. Convert to local time only when presenting data to users." />
          <SEOSection id="mistakes" title="Common timestamp mistakes" content="Common issues include mixing seconds with milliseconds, parsing local datetime as UTC, and omitting timezone offsets in logs and API contracts." />

          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/unix-timestamp-converter" />
    </article>
  );
}