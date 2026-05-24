import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import { guidePages, getGuideBySlug } from '@/lib/guides';
import { absoluteUrl, buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd } from '@/lib/seo';
import { tools } from '@/lib/tools';

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: `${guide.title} - Practical Examples and Best Practices`,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [guide.title, 'developer guide', guide.category],
    languages: {
      en: absoluteUrl(`/guides/${guide.slug}`),
      'x-default': absoluteUrl(`/guides/${guide.slug}`)
    }
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article>
      <JsonLd data={buildWebPageJsonLd({ name: guide.title, path: `/guides/${guide.slug}`, description: guide.description })} />
      <JsonLd data={buildFaqJsonLd(guide.faq)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides/unix-timestamp-guide' }, { name: guide.title, path: `/guides/${guide.slug}` }])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides/unix-timestamp-guide' }, { label: guide.title, href: `/guides/${guide.slug}` }]} />

      <header className="card">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-100">{guide.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{guide.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{guide.description}</p>
      </header>

      <section className="card mt-8 space-y-4">
        {guide.intro.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-slate-700 dark:text-slate-300">{paragraph}</p>
        ))}
      </section>

      <div className="mt-8 space-y-8">
        {guide.sections.map((section) => (
          <section key={section.heading} className="card space-y-4">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-slate-700 dark:text-slate-300">{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section className="card mt-8">
        <h2 className="text-2xl font-semibold">Related Tools</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {guide.relatedTools.map((href) => {
            const tool = tools.find((item) => item.href === href);
            if (!tool) return null;
            return (
              <li key={href}>
                <Link href={href} className="text-brand-700 hover:underline dark:text-brand-100">{tool.title}</Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-8">
        <FAQSection items={guide.faq} />
      </div>
    </article>
  );
}
