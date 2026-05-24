import type { ToolItem } from '@/lib/tools';
import Link from 'next/link';

export default function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="card h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tool.title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.summary}</p>
      <Link href={tool.href} className="link-button mt-4">
        Open Tool
      </Link>
    </article>
  );
}