import type { ToolItem } from '@/lib/tools';
import Link from 'next/link';

export default function ToolCard({
  tool,
  buttonLabel = 'Open Tool',
  dir = 'ltr'
}: {
  tool: ToolItem;
  buttonLabel?: string;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <article dir={dir} className={`card flex h-full min-h-[220px] flex-col ${dir === 'rtl' ? 'text-right' : ''}`}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tool.title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.summary}</p>
      <Link href={tool.href} className="link-button mt-auto min-h-11">
        {buttonLabel}
      </Link>
    </article>
  );
}
