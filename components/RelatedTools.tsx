import Link from 'next/link';
import { tools } from '@/lib/tools';

export default function RelatedTools({ currentPath }: { currentPath: string }) {
  const related = tools.filter((tool) => tool.href !== currentPath).slice(0, 4);

  return (
    <section aria-labelledby="related-tools" className="card mt-8">
      <h2 id="related-tools" className="text-xl font-semibold">
        Related Tools
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {related.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="text-brand-700 hover:underline dark:text-brand-100">
              {tool.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}