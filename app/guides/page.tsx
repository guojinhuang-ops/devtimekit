import type { Metadata } from 'next';
import Link from 'next/link';
import { guidePages } from '@/lib/guides';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Developer Guides - DevTimeKit',
  description: 'Browse DevTimeKit guides for JSON, time, security, encoding, and practical developer workflows.',
  path: '/guides'
});

export default function GuidesIndexPage() {
  return (
    <article className="card">
      <h1 className="text-3xl font-bold">Guides</h1>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">Long-form guides for common developer formats, conversions, and best practices.</p>
      <ul className="mt-4 space-y-2 text-sm">
        {guidePages.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="text-brand-700 hover:underline dark:text-brand-100">{guide.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

