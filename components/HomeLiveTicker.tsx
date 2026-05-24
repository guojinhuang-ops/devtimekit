'use client';

import { useEffect, useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function HomeLiveTicker() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wide text-slate-500">Current Unix Timestamp</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-mono text-lg">{now ? Math.floor(now / 1000) : '--'}</p>
          {now ? <CopyButton value={String(Math.floor(now / 1000))} /> : null}
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wide text-slate-500">Current Milliseconds</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-mono text-lg">{now ?? '--'}</p>
          {now ? <CopyButton value={String(now)} /> : null}
        </div>
      </div>
    </div>
  );
}
