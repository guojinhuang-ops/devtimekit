import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import HomeLiveTicker from '@/components/HomeLiveTicker';
import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/ToolCard';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';
import { tools } from '@/lib/tools';

const faqItems = [
  {
    q: 'What is the difference between Unix timestamp and epoch time?',
    a: 'In practical developer usage they mean the same thing: a numeric value measured from 1970-01-01T00:00:00Z.'
  },
  {
    q: 'Should APIs use seconds or milliseconds?',
    a: 'Both are common. Pick one unit, document it clearly, and validate input to avoid conversion bugs.'
  },
  {
    q: 'Why should I store timestamps in UTC?',
    a: 'UTC avoids timezone ambiguity and makes logs, analytics, and event ordering consistent across regions.'
  }
];

export const metadata: Metadata = buildMetadata({
  title: 'Unix Timestamp Converter & Epoch Tools',
  description:
    'Convert Unix timestamps instantly. Explore epoch tools, UTC references, ISO 8601 conversion, and practical developer guides.',
  path: '/'
});

export default function HomePage() {
  const featured = tools.slice(0, 6);

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

      <section className="card mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">What is a Unix timestamp?</h2>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          A Unix timestamp is a numeric representation of time. It counts elapsed time from the Unix epoch,
          which starts at 1970-01-01 00:00:00 UTC. Developers like this format because computers can compare and sort
          numbers quickly, and a timestamp avoids language-specific date formatting issues. A value like
          <strong> 1716547200 </strong> is easy for software systems to process, even when users are in different
          countries and time zones.
        </p>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          In modern stacks, timestamps appear in API payloads, event logs, queue messages, monitoring traces, and
          database records. If your backend service writes UTC timestamps and your frontend converts them for local
          display, you get both machine consistency and user-friendly output. That workflow is one reason Unix time is
          still the default in distributed systems.
        </p>

        <h2 className="text-2xl font-semibold">Why developers use Unix timestamps</h2>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          Unix timestamps are compact, predictable, and language-agnostic. They remove ambiguity caused by locale
          strings such as <em>05/06/2026</em>, which can mean different dates in different regions. They are also ideal
          for arithmetic operations: finding elapsed time is as simple as subtraction. This simplicity matters when you
          debug job latency, measure API performance, or reason about retries and expiration policies.
        </p>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          Another advantage is interoperability. JavaScript, Python, Go, PHP, and SQL engines all support Unix-style
          conversions. Teams can define one canonical time format for transport and storage, while still rendering local
          time in dashboards or product UI. If you are working with analytics pipelines, webhooks, cron schedules, or
          audit logs, consistent timestamps reduce operational mistakes.
        </p>

        <h2 className="text-2xl font-semibold">Seconds vs milliseconds timestamps</h2>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          A frequent source of bugs is mixing units. A 10-digit value is usually seconds. A 13-digit value is usually
          milliseconds. Frontend code often produces milliseconds with <code>Date.now()</code>, while many APIs expect
          seconds. If you send milliseconds to a seconds-only endpoint, your date may appear decades in the future.
          If you divide the wrong value twice, you may get dates near 1970.
        </p>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          The safe approach is to validate length and normalize at boundaries. Use helper functions, type guards, or
          schema validation in API layers. Document the unit clearly in field names, for example
          <code> created_at_unix_seconds </code> or <code> created_at_ms </code>. This naming pattern alone prevents a
          surprising number of production issues.
        </p>

        <h2 className="text-2xl font-semibold">UTC time and local time explained</h2>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          UTC is the global reference for computing time. Local time is what users see based on timezone settings and
          daylight saving rules. For backend systems, UTC should be the source of truth because it is stable and
          comparable across regions. For user interfaces, local time is still important for readability.
        </p>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          A practical model is: store UTC, transmit UTC, display local. When a user schedules an event, convert local
          input to UTC for storage. When reading it back, convert UTC to the viewer locale. This model keeps
          cross-region collaboration accurate and reduces off-by-one-hour errors around DST transitions.
        </p>

        <h2 className="text-2xl font-semibold">Common timestamp use cases</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <li>Ordering distributed events in logs and message queues.</li>
          <li>Implementing token expiration and cache invalidation.</li>
          <li>Scheduling background jobs, retries, and timeout windows.</li>
          <li>Comparing analytics events from clients in different time zones.</li>
          <li>Building audit trails for security and compliance workflows.</li>
        </ul>
      </section>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Popular Developer Time Utilities</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {tools.slice(0, 10).map((item) => (
            <li key={item.href}>{item.title}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <FAQSection title="FAQ" items={faqItems} />
      </div>
    </>
  );
}
