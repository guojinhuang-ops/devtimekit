import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FAQSection from '@/components/FAQSection';
import { guidePages, getGuideBySlug } from '@/lib/guides';
import { buildMetadata } from '@/lib/seo';
import { localePrefix, locales, type Locale } from '@/lib/i18n';
import { tools } from '@/lib/tools';

export function generateStaticParams() {
  return locales.flatMap((locale) => guidePages.map((guide) => ({ locale, slug: guide.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const prefix = localePrefix(locale);
  return buildMetadata({ title: guide.title, description: guide.description, path: `${prefix}/guides/${guide.slug}` });
}

export default async function LocalizedGuidePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const prefix = localePrefix(locale);

  return (
    <article className="space-y-8">
      <header className="card">
        <h1 className="text-3xl font-bold">{guide.title}</h1>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{guide.description}</p>
      </header>
      {guide.sections.map((section) => (
        <section key={section.heading} className="card space-y-3">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.paragraphs.map((p) => <p key={p} className="text-sm leading-7 text-slate-700 dark:text-slate-300">{p}</p>)}
        </section>
      ))}
      <section className="card">
        <h2 className="text-2xl font-semibold">Related Tools</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {guide.relatedTools.map((href) => {
            const tool = tools.find((item) => item.href === href);
            if (!tool) return null;
            return <li key={href}><Link href={`${prefix}${href}`} className="text-brand-700 hover:underline dark:text-brand-100">{tool.title}</Link></li>;
          })}
        </ul>
      </section>
      <FAQSection items={guide.faq} />
    </article>
  );
}
