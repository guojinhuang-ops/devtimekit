import Link from 'next/link';

export type Crumb = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ items, dir = 'ltr' }: { items: Crumb[]; dir?: 'ltr' | 'rtl' }) {
  return (
    <nav aria-label="Breadcrumb" dir={dir} className={`mb-4 text-sm ${dir === 'rtl' ? 'text-right' : ''}`}>
      <ol className={`flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-300 ${dir === 'rtl' ? 'justify-end' : ''}`}>
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <Link href={item.href} className="hover:text-brand-700 hover:underline dark:hover:text-brand-100">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

