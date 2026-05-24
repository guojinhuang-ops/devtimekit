import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  {
    q: 'What is epoch time?',
    a: 'Epoch time is another name for Unix time, counting elapsed time from 1970-01-01 UTC.'
  },
  {
    q: 'Why do developers store timestamps as integers?',
    a: 'Integers are compact, sortable, and avoid locale and formatting ambiguity.'
  }
];

export const metadata: Metadata = buildMetadata({
  title: 'About Unix Time, Epoch, and Timestamp Best Practices',
  description:
    'Learn Unix timestamp basics, 1970 epoch origin, UTC vs local time, milliseconds, and common developer mistakes.',
  path: '/about-unix-time'
});

export default function AboutUnixTimePage() {
  return (
    <article>
      <JsonLd
        data={buildWebApplicationJsonLd({
          name: 'About Unix Time',
          path: '/about-unix-time',
          description: metadata.description as string
        })}
      />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Unix Time', path: '/about-unix-time' }
        ])}
      />

      <header className="card">
        <h1 className="text-3xl font-bold">About Unix Time</h1>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          A practical developer guide to Unix timestamps, epoch time behavior, and production-safe handling patterns.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents
          items={[
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
          <SEOSection id="unix-timestamp" title="What is Unix timestamp?" content="Unix timestamp is a numeric representation of time that counts elapsed seconds since 1970-01-01 00:00:00 UTC. Developers rely on it because it is easy to store, compare, and transfer across systems." />
          <SEOSection id="epoch-time" title="What is epoch time?" content="Epoch time is the same concept as Unix time. In tooling and documentation, epoch often describes the reference starting point, while Unix timestamp refers to the numeric value." />
          <SEOSection id="vs-ms" title="Unix timestamp vs milliseconds" content="Seconds are common in APIs and logs, while milliseconds are common in JavaScript and UI events. Mixing them without unit checks is a common source of bugs and date offsets." />
          <SEOSection id="why-1970" title="Why Unix time starts in 1970" content="1970-01-01 UTC was chosen as a practical origin in early Unix systems. It provided a stable baseline for arithmetic operations and fit computing constraints at that time." />
          <SEOSection id="y2038" title="The Year 2038 problem" content="Systems using signed 32-bit seconds can overflow around 2038-01-19. Modern systems should use 64-bit time values to avoid rollover and data corruption issues." />
          <SEOSection id="utc-local" title="UTC vs local time" content="UTC is consistent and should be used for storage and backend exchange. Local time should be used for display only, based on user locale and timezone preferences." />
          <SEOSection id="mistakes" title="Common timestamp mistakes" content="Typical errors include treating milliseconds as seconds, parsing local time as UTC, and storing formatted dates instead of raw epoch values. Unit normalization and explicit timezone handling prevent most issues." />
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/about-unix-time" />
    </article>
  );
}