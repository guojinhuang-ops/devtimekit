import Link from 'next/link';
import { tools } from '@/lib/tools';

export default function RelatedTools({
  currentPath,
  localePrefix = '',
  title = 'Related Tools',
  toolTitles = {},
  dir = 'ltr'
}: {
  currentPath: string;
  localePrefix?: string;
  title?: string;
  toolTitles?: Record<string, string>;
  dir?: 'ltr' | 'rtl';
}) {
  const currentTool = tools.find((tool) => tool.href === currentPath);
  const sameCategory = tools.filter((tool) => tool.href !== currentPath && tool.category === currentTool?.category).slice(0, 4);
  const popular = [
    '/unix-timestamp-converter',
    '/timestamp-to-date',
    '/date-to-timestamp',
    '/json-formatter',
    '/base64-encode',
    '/md5-generator'
  ]
    .map((href) => tools.find((tool) => tool.href === href))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool))
    .filter((tool) => tool.href !== currentPath);
  const moreDeveloper = tools.filter((tool) => tool.href !== currentPath && tool.category === 'Developer').slice(0, 6);

  return (
    <section aria-labelledby="related-tools" dir={dir} className={`card mt-8 ${dir === 'rtl' ? 'text-right' : ''}`}>
      <h2 id="related-tools" className="text-xl font-semibold">
        {title}
      </h2>
      {sameCategory.length ? (
        <div className="mt-3">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Related Tools</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {sameCategory.map((tool) => (
              <li key={tool.href}>
                <Link href={`${localePrefix}${tool.href}`} className="text-brand-700 hover:underline dark:text-brand-100">
                  {toolTitles[tool.href] ?? tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Popular Tools</h3>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {popular.slice(0, 6).map((tool) => (
            <li key={tool.href}>
              <Link href={`${localePrefix}${tool.href}`} className="text-brand-700 hover:underline dark:text-brand-100">
                {toolTitles[tool.href] ?? tool.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">More Developer Tools</h3>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {moreDeveloper.map((tool) => (
            <li key={tool.href}>
              <Link href={`${localePrefix}${tool.href}`} className="text-brand-700 hover:underline dark:text-brand-100">
                {toolTitles[tool.href] ?? tool.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
