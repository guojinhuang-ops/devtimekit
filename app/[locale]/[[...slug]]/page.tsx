import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FAQSection from '@/components/FAQSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import HomeLiveTicker from '@/components/HomeLiveTicker';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import CodeBlock from '@/components/CodeBlock';
import CurrentNowPanel from '@/components/CurrentNowPanel';
import DateToTimestampForm from '@/components/DateToTimestampForm';
import ToolCard from '@/components/ToolCard';
import TimestampToDateForm from '@/components/TimestampToDateForm';
import UnixConverterPanel from '@/components/UnixConverterPanel';
import UtilityToolClient from '@/components/UtilityToolClient';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd
} from '@/lib/seo';
import {
  buildLanguageAlternates,
  getDictionary,
  localePrefix,
  locales,
  type Locale
} from '@/lib/i18n';
import { tools } from '@/lib/tools';
import { utilityPages } from '@/lib/utility-pages';

type PageParams = {
  locale: Locale;
  slug?: string[];
};

function pathFromSlug(slug?: string[]) {
  return slug?.length ? `/${slug.join('/')}` : '/';
}

function renderCoreTool(path: string) {
  if (path === '/unix-timestamp-converter') return <UnixConverterPanel />;
  if (path === '/current-unix-timestamp') return <CurrentNowPanel />;
  if (path === '/utc-time-now') return <CurrentNowPanel />;
  if (path === '/timestamp-to-date') return <TimestampToDateForm />;
  if (path === '/epoch-converter') return <TimestampToDateForm />;
  if (path === '/unix-time-in-milliseconds') return <TimestampToDateForm />;
  if (path === '/iso-8601-converter') return <UtilityToolClient kind="iso8601-parser" />;
  if (path === '/date-to-timestamp') return <DateToTimestampForm />;
  if (path === '/javascript-timestamp') return <UnixConverterPanel />;
  if (path === '/python-timestamp') return <UnixConverterPanel />;
  if (path === '/mysql-unix-timestamp') return <UnixConverterPanel />;
  if (path === '/timestamp-cheatsheet') return <UnixConverterPanel />;
  if (path === '/current-timestamp-milliseconds') {
    const jsCode = `// current timestamp in milliseconds
const ms = Date.now();

// convert milliseconds to ISO
const iso = new Date(ms).toISOString();`;

    return (
      <div className="space-y-6">
        <CurrentNowPanel />
        <section className="card">
          <h2 className="text-xl font-semibold">JavaScript Examples</h2>
          <div className="mt-4">
            <CodeBlock title="JavaScript" language="js" code={jsCode} />
          </div>
        </section>
      </div>
    );
  }

  return null;
}

export function generateStaticParams() {
  const paths = ['/', ...tools.map((tool) => tool.href)];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      slug: path === '/' ? [] : path.slice(1).split('/')
    }))
  );
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const dictionary = getDictionary(locale);
  const path = pathFromSlug(slug);
  const tool = path === '/' ? null : tools.find((item) => item.href === path);

  if (path !== '/' && !tool) {
    return {};
  }

  const title = path === '/' ? dictionary.site.homeTitle : dictionary.tools[path]?.title ?? tool?.title ?? '';
  const description =
    path === '/' ? dictionary.site.homeDescription : dictionary.tools[path]?.summary ?? tool?.summary ?? '';
  const seoTitle =
    path === '/'
      ? `${title} | DevTimeKit`
      : `${title} - Online ${tool?.category ?? 'Developer'} Tool for Developers`;
  const seoDescription =
    path === '/'
      ? description
      : `${description} Use this browser-based utility for fast validation, copy-ready output, and debugging workflows.`;

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `${localePrefix(locale)}${path === '/' ? '' : path}`,
    keywords: path === '/' ? ['developer tools', 'timestamp tools', 'encoding tools'] : [title, 'developer tool'],
    languages: buildLanguageAlternates(path)
  });
}

export default async function LocalizedPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  const dictionary = getDictionary(locale);
  const enDictionary = getDictionary('en');
  const path = pathFromSlug(slug);
  const prefix = localePrefix(locale);
  const directionClass = dictionary.dir === 'rtl' ? 'text-right' : '';
  const listClass =
    dictionary.dir === 'rtl'
      ? 'list-disc space-y-2 pr-5 text-sm leading-7 text-slate-700 dark:text-slate-300'
      : 'list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300';
  const orderedListClass =
    dictionary.dir === 'rtl'
      ? 'list-decimal space-y-2 pr-5 text-sm leading-7 text-slate-700 dark:text-slate-300'
      : 'list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300';
  const categoryLabelsByLocale: Record<string, Record<string, string>> = {
    en: { Time: 'Time', JSON: 'JSON', Encoding: 'Encoding', Security: 'Security', Developer: 'Developer' },
    zh: { Time: '时间', JSON: 'JSON', Encoding: '编码', Security: '安全', Developer: '开发者' },
    'zh-TW': { Time: '時間', JSON: 'JSON', Encoding: '編碼', Security: '安全', Developer: '開發者' },
    ja: { Time: '時間', JSON: 'JSON', Encoding: 'エンコード', Security: 'セキュリティ', Developer: '開発者' },
    es: { Time: 'Tiempo', JSON: 'JSON', Encoding: 'Codificacion', Security: 'Seguridad', Developer: 'Desarrollador' },
    vi: { Time: 'Thoi gian', JSON: 'JSON', Encoding: 'Ma hoa', Security: 'Bao mat', Developer: 'Lap trinh' },
    ko: { Time: '시간', JSON: 'JSON', Encoding: '인코딩', Security: '보안', Developer: '개발자' },
    ar: { Time: 'الوقت', JSON: 'JSON', Encoding: 'الترميز', Security: 'الامان', Developer: 'المطور' },
    hi: { Time: 'समय', JSON: 'JSON', Encoding: 'एन्कोडिंग', Security: 'सिक्योरिटी', Developer: 'डेवलपर' }
  };
  const categoryLabels = categoryLabelsByLocale[dictionary.locale];
  if (path === '/') {
    const featured = tools.slice(0, 9);
    const categories = ['Time', 'JSON', 'Encoding', 'Security', 'Developer'] as const;

    return (
      <div>
        <JsonLd
          data={buildSoftwareApplicationJsonLd({
            name: dictionary.site.homeTitle,
            path: `${prefix}`,
            description: dictionary.site.homeDescription
          })}
        />
        <JsonLd data={buildFaqJsonLd(dictionary.home.faq)} />
        <JsonLd data={buildBreadcrumbJsonLd([{ name: dictionary.nav.home, path: `${prefix || '/'}` }])} />

        <section dir={dictionary.dir} className={`card ${directionClass}`}>
          <p className="text-sm font-medium text-brand-700 dark:text-brand-100">{dictionary.site.developerToolkit}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{dictionary.home.h1}</h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300">{dictionary.home.intro}</p>
          <HomeLiveTicker />
        </section>

        <section className="mt-8">
          <h2 dir={dictionary.dir} className={`text-2xl font-semibold ${directionClass}`}>
            {dictionary.ui.popularTools}
          </h2>
          <div dir={dictionary.dir} className="mt-4 grid gap-4 md:grid-cols-3">
            {featured.map((tool) => (
              <ToolCard
                key={tool.href}
                buttonLabel={dictionary.ui.openTool}
                dir={dictionary.dir}
                tool={{
                  ...tool,
                  href: `${prefix}${tool.href}`,
                  title: dictionary.tools[tool.href]?.title ?? tool.title,
                  summary: dictionary.tools[tool.href]?.summary ?? tool.summary
                }}
              />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 dir={dictionary.dir} className={`text-2xl font-semibold ${directionClass}`}>
            {dictionary.ui.toolsByCategory}
          </h2>
          <div dir={dictionary.dir} className="mt-4 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <section key={category} dir={dictionary.dir} className={directionClass}>
                <h3 className="text-lg font-semibold">{categoryLabels[category]}</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {tools
                    .filter((tool) => tool.category === category)
                    .slice(0, 10)
                    .map((tool) => (
                      <li key={tool.href}>
                        <Link href={`${prefix}${tool.href}`} className="text-brand-700 hover:underline dark:text-brand-100">
                          {dictionary.tools[tool.href]?.title ?? tool.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-8">
          {dictionary.home.sections.map((section) => (
            <section key={section.title} dir={dictionary.dir} className={directionClass}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </section>

        <div className="mt-10">
          <div dir={dictionary.dir} className={directionClass}>
            <FAQSection title={dictionary.ui.faq} items={dictionary.home.faq} />
          </div>
        </div>
      </div>
    );
  }

  const tool = tools.find((item) => item.href === path);
  if (!tool) notFound();

  const copy = dictionary.tools[path] ?? enDictionary.tools[path];
  const generatedFaq = [
    { q: `What does ${copy.title} do?`, a: `${copy.title} helps developers transform and validate values quickly in the browser.` },
    { q: `Is ${copy.title} free to use?`, a: 'Yes. This tool is available as part of DevTimeKit free utilities.' },
    { q: `Can I use ${copy.title} in production debugging?`, a: 'Yes. Use it for validation and troubleshooting, then confirm output in your runtime.' },
    { q: `Does ${copy.title} support copy-ready output?`, a: 'Yes. You can copy generated values directly for tests, docs, or API requests.' },
    { q: `What should I check before using output?`, a: 'Confirm units, timezone, and encoding format before integrating results.' }
  ];
  const faqItems = [...copy.faq, ...generatedFaq].slice(0, 8);
  const utility = utilityPages[path];
  const coreTool = renderCoreTool(path);

  return (
    <article>
      <JsonLd
        data={buildSoftwareApplicationJsonLd({
          name: copy.title,
          path: `${prefix}${path}`,
          description: copy.summary
        })}
      />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd
        data={buildWebPageJsonLd({
          name: copy.title,
          path: `${prefix}${path}`,
          description: copy.summary,
          inLanguage: locale
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: dictionary.nav.home, path: `${prefix || '/'}` },
          { name: copy.title, path: `${prefix}${path}` }
        ])}
      />

      <Breadcrumbs
        dir={dictionary.dir}
        items={[
          { label: dictionary.nav.home, href: `${prefix || '/'}` },
          { label: copy.title, href: `${prefix}${path}` }
        ]}
      />

      <header dir={dictionary.dir} className={`mb-8 ${directionClass}`}>
        <p className="text-sm font-medium text-brand-700 dark:text-brand-100">{dictionary.ui.tool}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">{copy.summary}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div dir={dictionary.dir} className={directionClass}>
          <TableOfContents
          items={[
            { id: 'tool', label: dictionary.ui.tool },
            { id: 'definition', label: dictionary.ui.definition },
            { id: 'steps', label: dictionary.ui.steps },
            { id: 'examples', label: dictionary.ui.examples },
            { id: 'use-cases', label: dictionary.ui.useCases },
            { id: 'faq', label: dictionary.ui.faq }
          ]}
          />
        </div>

        <div className="space-y-8">
          <section id="tool" dir={dictionary.dir} className={directionClass}>
            {coreTool ? (
              coreTool
            ) : utility ? (
              <UtilityToolClient kind={utility.kind} />
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {copy.summary}
              </div>
            )}
          </section>

          <section id="definition" dir={dictionary.dir} className={`space-y-4 ${directionClass}`}>
            <h2 className="text-2xl font-semibold">{dictionary.ui.definition}</h2>
            {copy.definition.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </section>

          <section id="steps" dir={dictionary.dir} className={`space-y-4 ${directionClass}`}>
            <h2 className="text-2xl font-semibold">{dictionary.ui.steps}</h2>
            <ol className={orderedListClass}>
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section id="examples" dir={dictionary.dir} className={`space-y-4 ${directionClass}`}>
            <h2 className="text-2xl font-semibold">{dictionary.ui.examples}</h2>
            <ul className={listClass}>
              {copy.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </section>

          <section id="use-cases" dir={dictionary.dir} className={`space-y-4 ${directionClass}`}>
            <h2 className="text-2xl font-semibold">{dictionary.ui.useCases}</h2>
            <ul className={listClass}>
              {copy.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div dir={dictionary.dir} className={directionClass}>
            <FAQSection title={dictionary.ui.faq} items={faqItems} />
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath={path}
        localePrefix={prefix}
        title={dictionary.ui.relatedTools}
        dir={dictionary.dir}
        toolTitles={Object.fromEntries(
          Object.entries(dictionary.tools).map(([href, toolCopy]) => [href, toolCopy.title])
        )}
      />
    </article>
  );
}

