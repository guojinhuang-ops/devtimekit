'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { guidePages } from '@/lib/guides';
import { localizedPath, type LanguageCode } from '@/lib/i18n';
import { tools } from '@/lib/tools';

export default function ToolSearch({ locale, compact = false }: { locale: LanguageCode; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const results = useMemo<Array<{ href: string; title: string; summary: string; type: 'tool' | 'guide' }>>(() => {
    const q = query.trim().toLowerCase();
    const toolItems = tools.map((tool) => ({ href: tool.href, title: tool.title, summary: tool.summary, type: 'tool' as const }));
    const guideItems = guidePages.map((guide) => ({
      href: `/guides/${guide.slug}`,
      title: guide.title,
      summary: guide.description,
      type: 'guide' as const
    }));
    const allItems = [...toolItems, ...guideItems];
    if (!q) return allItems.slice(0, 14);
    return allItems
      .filter((item) => item.title.toLowerCase().includes(q) || item.href.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q))
      .slice(0, 24);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 ${compact ? 'px-2.5' : ''}`}
        aria-label="Open search"
      >
        <Search size={14} />
        {compact ? null : 'Search'}
        {!compact ? <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] dark:bg-slate-800">Ctrl+K</span> : null}
      </button>

      {open && mounted ? createPortal(
        <div className="fixed inset-0 z-[130] bg-slate-950/55 p-0 sm:p-4" onClick={() => setOpen(false)}>
          <div className="mx-auto h-full w-full overflow-hidden rounded-none border-0 bg-white p-4 shadow-2xl dark:bg-slate-900 sm:mt-10 sm:h-auto sm:max-h-[84vh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-slate-200 dark:sm:border-slate-700" onClick={(event) => event.stopPropagation()}>
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center rounded-md border border-slate-300 px-3 text-sm dark:border-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => {
                if (!query.trim()) setOpen(false);
              }}
              placeholder="Search tools, slugs, and guides"
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <ul className="mt-3 h-[calc(100vh-120px)] space-y-1 overflow-y-auto sm:h-[56vh]">
              {results.map((item) => (
                <li key={`${item.type}-${item.href}`}>
                  <Link
                    href={localizedPath(item.href, locale)}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">{item.title}</p>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item.type}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      , document.body) : null}
    </>
  );
}
