import FAQSection from '@/components/FAQSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import UtilityToolClient from '@/components/UtilityToolClient';
import ToolEngagement from '@/components/ToolEngagement';
import Link from 'next/link';
import { guidePages } from '@/lib/guides';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd
} from '@/lib/seo';
import type { UtilityPage } from '@/lib/utility-pages';

export default function UtilitySeoPage({ page }: { page: UtilityPage }) {
  const relatedGuides = guidePages
    .filter((guide) => {
      const haystack = `${guide.title} ${guide.description}`.toLowerCase();
      return page.keywords.some((keyword) => haystack.includes(keyword.toLowerCase().split(' ')[0]));
    })
    .slice(0, 3);
  const generatedFaq = [
    { q: `What does ${page.title} do?`, a: `${page.title} helps developers transform and validate values quickly in the browser.` },
    { q: `Is ${page.title} free to use?`, a: 'Yes. DevTimeKit tools are available for free browser-based usage.' },
    { q: `Does ${page.title} upload my input?`, a: 'Core tool interactions are designed for browser-side processing whenever possible.' },
    { q: `Can I use ${page.title} for production debugging?`, a: 'Yes. It is useful for debugging, but always verify final output in your runtime environment.' },
    { q: `How can I avoid mistakes with ${page.title}?`, a: 'Validate formats, confirm units, and keep sample fixtures for repeatable checks.' },
    { q: `What tools should I use after ${page.title}?`, a: 'Use related conversion and validation tools linked below to continue your workflow.' }
  ];
  const faqItems = [...page.faq, ...generatedFaq].slice(0, 8);
  const quickAnswers = [
    `${page.title} runs in-browser, so you can transform values without sending raw input to your backend stack.`,
    'Use deterministic output as a validation checkpoint between API contracts, logs, and storage schemas.',
    'When working with time, hash, or encoding tools, confirm unit and format boundaries before deployment.',
    'Copy-ready output reduces manual edits and prevents whitespace or format drift in tickets and PRs.'
  ];
  const commonMistakes = [
    'Mixing units such as seconds and milliseconds in the same request pipeline.',
    'Assuming encoding is encryption and using reversible transforms for sensitive data.',
    'Skipping validation feedback and copying malformed output into production configs.',
    'Using locale-formatted strings as machine values instead of stable ISO/UTC representations.'
  ];
  const bestPractices = [
    'Define one canonical format per field and document it in your API schema.',
    'Validate input early at boundaries, especially in user-provided or third-party payloads.',
    'Store normalized values and convert only at display time for user interfaces.',
    'Add small fixtures from this tool output to tests so regressions are caught quickly.'
  ];
  const developerTips = [
    'Keep sample payloads next to tests and name files with the format unit, for example `created_at_ms`.',
    'Pair conversion output with a human-readable note in PRs so reviewers can sanity-check faster.',
    'For shared libraries, expose helper functions instead of duplicating conversion snippets in apps.',
    'Treat generated values as references and always verify edge cases like DST or Unicode text.'
  ];

  return (
    <article>
      <JsonLd
        data={buildSoftwareApplicationJsonLd({
          name: page.title,
          path: page.path,
          description: page.description
        })}
      />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildWebPageJsonLd({ name: page.title, path: page.path, description: page.description })} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: page.title, path: page.path }
        ])}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: page.title, href: page.path }]} />

      <header className="mb-8">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-100">Developer Tool</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">
          {page.description}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents
          items={[
            { id: 'tool', label: 'Tool' },
            { id: 'quick-answers', label: 'Quick answers' },
            { id: 'definition', label: 'Definition' },
            { id: 'steps', label: 'Step-by-step' },
            { id: 'examples', label: 'Examples' },
            { id: 'use-cases', label: 'Common use cases' },
            { id: 'best-practices', label: 'Best practices' },
            { id: 'developer-tips', label: 'Developer tips' },
            { id: 'common-mistakes', label: 'Common mistakes' },
            { id: 'faq', label: 'FAQ' }
          ]}
        />

        <div className="space-y-8">
          <section id="tool">
            <UtilityToolClient kind={page.kind} />
          </section>

          <section id="definition" className="space-y-4">
            <h2 className="text-2xl font-semibold">Definition and practical context</h2>
            <section id="quick-answers" className="space-y-2">
              <h3 className="text-lg font-semibold">Quick answers</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {quickAnswers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            {page.definition.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </section>

          <section id="steps" className="space-y-4">
            <h2 className="text-2xl font-semibold">Step-by-step explanation</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {page.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section id="examples" className="space-y-4">
            <h2 className="text-2xl font-semibold">Examples</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {page.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </section>

          <section id="use-cases" className="space-y-4">
            <h2 className="text-2xl font-semibold">Common use cases</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {page.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="best-practices" className="space-y-4">
            <h2 className="text-2xl font-semibold">Best practices</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {bestPractices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="developer-tips" className="space-y-4">
            <h2 className="text-2xl font-semibold">Developer tips</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {developerTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="common-mistakes" className="space-y-4">
            <h2 className="text-2xl font-semibold">Common mistakes</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath={page.path} />
      <section className="card mt-8">
        <h2 className="text-xl font-semibold">Related Guides</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {(relatedGuides.length ? relatedGuides : guidePages.slice(0, 3)).map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`} className="text-brand-700 hover:underline dark:text-brand-100">
                {guide.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ToolEngagement title={page.title} path={page.path} />
    </article>
  );
}
