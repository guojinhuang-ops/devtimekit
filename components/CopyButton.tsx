'use client';

import { useState } from 'react';

export default function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.dispatchEvent(new CustomEvent('copy-success', { detail: 'Copied to clipboard' }));
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.dispatchEvent(new CustomEvent('copy-success', { detail: 'Copy failed' }));
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      {copied ? 'Copied' : label}
    </button>
  );
}