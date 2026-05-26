'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { localizedPath, type LanguageCode } from '@/lib/i18n';
import { tools } from '@/lib/tools';

export default function ToolSearch({ locale }: { locale: LanguageCode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools.slice(0, 12);
    return tools
      .filter((tool) =>
        tool.title.toLowerCase().includes(q) ||
        tool.href.toLowerCase().includes(q) ||
        tool.summary.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Search size={14} />
        Search
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] dark:bg-slate-800">Ctrl+K</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-slate-950/45 p-4" onClick={() => setOpen(false)}>
          <div className="mx-auto mt-16 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tool name, slug, or description"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <ul className="mt-3 max-h-[58vh] space-y-1 overflow-y-auto">
              {results.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={localizedPath(tool.href, locale)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <p className="text-sm font-medium">{tool.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tool.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
