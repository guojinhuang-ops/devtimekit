import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CopyButton from '@/components/CopyButton';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd
} from '@/lib/seo';
import { guidePages } from '@/lib/guides';
import { promptPages } from '@/lib/prompt-pages';
import { utilityPages } from '@/lib/utility-pages';

type Params = { slug: string };

export function generateStaticParams() {
  const utilitySlugs = Object.keys(utilityPages).map((path) => ({ slug: path.slice(1) }));
  const promptSlugs = Object.keys(promptPages).map((path) => ({ slug: path.slice(1) }));
  return [...utilitySlugs, ...promptSlugs];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug}`;
  const utility = utilityPages[path];
  if (utility) {
    return buildMetadata({
      title: utility.title,
      description: utility.description,
      path: utility.path,
      keywords: utility.keywords
    });
  }
  const prompt = promptPages[path];
  if (prompt) {
    return buildMetadata({
      title: prompt.title,
      description: prompt.description,
      path: prompt.path,
      keywords: prompt.keywords
    });
  }
  return {};
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const path = `/${slug}`;
  const utility = utilityPages[path];
  if (utility) {
    return <UtilitySeoPage page={utility} />;
  }

  const prompt = promptPages[path];
  if (!prompt) {
    notFound();
  }

  return (
    <article>
      <JsonLd
        data={buildSoftwareApplicationJsonLd({
          name: prompt.title,
          path: prompt.path,
          description: prompt.description
        })}
      />
      <JsonLd data={buildWebPageJsonLd({ name: prompt.title, path: prompt.path, description: prompt.description })} />
      <JsonLd data={buildFaqJsonLd(prompt.faq)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: prompt.title, path: prompt.path }])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: prompt.title, href: prompt.path }]} />

      <header className="mb-8">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-100">AI Prompt Collection</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">{prompt.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">{prompt.description}</p>
      </header>

      <section className="card">
        <h2 className="text-2xl font-semibold">Prompt Library</h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          Copy and adapt these prompts for your own workflow. They are template-style examples designed for developer, SEO, and study use cases.
        </p>
        <div className="mt-6 space-y-3">
          {prompt.prompts.map((item, index) => (
            <article key={`${index}-${item.slice(0, 20)}`} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Prompt #{index + 1}</h3>
                <CopyButton value={item} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-700 dark:text-slate-200">{item}</pre>
            </article>
          ))}
        </div>
      </section>

      <FAQSection items={prompt.faq} />

      <section className="card mt-8">
        <h2 className="text-xl font-semibold">Related Guides</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {prompt.relatedGuides.map((slugItem) => {
            const guide = guidePages.find((item) => item.slug === slugItem);
            if (!guide) return null;
            return (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="text-brand-700 hover:underline dark:text-brand-100">
                  {guide.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}

