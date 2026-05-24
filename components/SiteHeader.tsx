'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import { SITE_NAME } from '@/lib/site';
import { tools } from '@/lib/tools';

const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/unix-timestamp-converter', label: 'Unix Converter' },
  { href: '/about-unix-time', label: 'Guides' }
];

const quickAccess = [
  { href: '/current-unix-timestamp', label: 'Current Unix Timestamp' },
  { href: '/timestamp-to-date', label: 'Timestamp to Date' },
  { href: '/date-to-timestamp', label: 'Date to Timestamp' }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {SITE_NAME}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4">
          <ul className="hidden items-center gap-4 text-sm text-slate-600 md:flex dark:text-slate-300">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-slate-900 dark:hover:text-slate-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-haspopup="menu"
              className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              All Tools
            </button>
            {open ? (
              <div className="absolute right-0 z-30 mt-2 w-[26rem] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Tool Directory
              </p>
              <ul className="mt-2 grid gap-1">
                {tools
                  .filter((tool) => tool.href !== '/about-unix-time')
                  .map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{tool.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{tool.summary}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="mt-3 border-t border-slate-200 px-2 pt-3 dark:border-slate-700">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Quick Access
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickAccess.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            ) : null}
          </div>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
