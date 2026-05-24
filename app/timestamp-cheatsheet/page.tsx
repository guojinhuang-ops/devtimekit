import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Why use a timestamp cheatsheet?', a: 'It reduces context switching and helps teams avoid unit and timezone mistakes during development.' },
  { q: 'Does this replace full docs?', a: 'No. It is a quick operational reference, not a language-specific specification.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Timestamp Cheatsheet',
  description: 'Quick timestamp reference for Unix seconds, milliseconds, ISO 8601, UTC, and conversion tips.',
  path: '/timestamp-cheatsheet'
});

export default function TimestampCheatsheetPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Timestamp Cheatsheet', path: '/timestamp-cheatsheet', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Timestamp Cheatsheet', path: '/timestamp-cheatsheet' }])} />

      <header className="card"><h1 className="text-3xl font-bold">Timestamp Cheatsheet</h1><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">A compact reference for common timestamp formats and conversion patterns.</p></header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><TableOfContents items={[{ id: 'formats', label: 'Common formats' }, { id: 'examples', label: 'Examples' }, { id: 'mistakes', label: 'Common mistakes' }, { id: 'faq', label: 'FAQ' }]} /><div className="space-y-6">
        <section id="formats" className="card"><h2 className="text-xl font-semibold">Common formats</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Unix seconds: 10 digits (e.g. 1716547200)</li><li>Unix milliseconds: 13 digits (e.g. 1716547200000)</li><li>ISO 8601 UTC: 2026-05-24T06:00:00Z</li><li>RFC 2822: Sun, 24 May 2026 06:00:00 GMT</li></ul></section>
        <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>seconds to ISO: new Date(seconds * 1000).toISOString()</li><li>ms to seconds: Math.floor(ms / 1000)</li><li>ISO to seconds: Math.floor(new Date(iso).getTime() / 1000)</li></ul></section>
        <section id="mistakes" className="card"><h2 className="text-xl font-semibold">Common mistakes</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Sending milliseconds to an API expecting seconds.</li><li>Parsing local date strings without timezone info.</li><li>Mixing UTC storage with local-time comparisons.</li></ul></section>
        <FAQSection items={faqItems} />
      </div></div>

      <RelatedTools currentPath="/timestamp-cheatsheet" />
    </article>
  );
}