import Link from 'next/link';

export default function TableOfContents({
  items,
  title = 'Table of Contents'
}: {
  items: Array<{ id: string; label: string }>;
  title?: string;
}) {
  return (
    <nav className="card" aria-label="Table of contents">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`} className="text-brand-700 hover:underline dark:text-brand-100">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
