import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import HomeLiveTicker from '@/components/HomeLiveTicker';
import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/ToolCard';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';
import { tools } from '@/lib/tools';

const faqItems = [
  {
    q: 'What is a Unix timestamp?',
    a: 'A Unix timestamp is the number of seconds elapsed since January 1, 1970 UTC.'
  },
  {
    q: 'Is DevTimeKit private?',
    a: 'Yes. All conversions run directly in your browser without backend processing.'
  }
];

export const metadata: Metadata = buildMetadata({
  title: 'Unix Timestamp Converter & Epoch Tools',
  description:
    'Convert Unix timestamps instantly. View epoch time in seconds, milliseconds, UTC, ISO 8601 and local time.',
  path: '/'
});

export default function HomePage() {
  const featured = tools.slice(0, 3);

  return (
    <>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'DevTimeKit', path: '/', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }])} />

      <section className="card">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-100">Developer Time Toolkit</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Unix Timestamp Converter & Epoch Tools</h1>
        <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300">
          Convert Unix timestamps instantly. View epoch time in seconds, milliseconds, UTC, ISO 8601 and local time.
        </p>
        <HomeLiveTicker />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Featured Tools</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Popular Developer Time Utilities</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {tools.slice(0, 5).map((item) => (
            <li key={item.href}>{item.title}</li>
          ))}
        </ul>
      </section>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Why Developers Use Unix Timestamp</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          Unix timestamps are timezone-neutral, language-agnostic, and easy to compare in logs, APIs, databases, and
          distributed systems.
        </p>
      </section>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Quick Examples</h2>
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          <p><strong>1716547200</strong> -&gt; 2024-05-24 UTC</p>
          <p><strong>1716547200000</strong> -&gt; 2024-05-24 UTC</p>
          <p><strong>Now</strong> -&gt; Live timestamp every second</p>
        </div>
      </section>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Related Searches</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>Current Unix Timestamp</li>
          <li>Epoch Converter</li>
          <li>Timestamp to Date</li>
          <li>Date to Timestamp</li>
          <li>Milliseconds Converter</li>
        </ul>
      </section>

      <div className="mt-8">
        <FAQSection title="FAQ Preview" items={faqItems} />
      </div>
    </>
  );
}