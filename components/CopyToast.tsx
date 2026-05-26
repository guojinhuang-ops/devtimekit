'use client';

import { useEffect, useState } from 'react';

export default function CopyToast() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onCopySuccess = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setMessage(custom.detail || 'Copied');
      window.setTimeout(() => setMessage(''), 1200);
    };

    window.addEventListener('copy-success', onCopySuccess as EventListener);
    return () => window.removeEventListener('copy-success', onCopySuccess as EventListener);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
      {message}
    </div>
  );
}
