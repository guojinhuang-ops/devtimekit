'use client';

import { useMemo, useState } from 'react';
import TimestampDisplay from '@/components/TimestampDisplay';
import { parseLocalDateTime } from '@/lib/utils';

export default function DateToTimestampForm() {
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return { error: '', rows: [] as Array<{ label: string; value: string }> };

    const date = parseLocalDateTime(input);
    if (!date) {
      return {
        error: 'Use a valid local date/time string, for example 2026-05-24T15:30:00',
        rows: []
      };
    }

    const ms = date.getTime();
    return {
      error: '',
      rows: [
        { label: 'Unix Timestamp (Seconds)', value: String(Math.floor(ms / 1000)) },
        { label: 'Unix Timestamp (Milliseconds)', value: String(ms) }
      ]
    };
  }, [input]);

  return (
    <section className="card space-y-4">
      <label htmlFor="date-input" className="text-sm font-medium">
        Local Date/Time Input
      </label>
      <input
        id="date-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 2026-05-24T15:30:00"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-600 focus:ring dark:border-slate-700 dark:bg-slate-800"
      />
      {output.error ? <p className="text-sm text-rose-600">{output.error}</p> : null}
      {output.rows.length > 0 ? <TimestampDisplay title="Converted Output" values={output.rows} /> : null}
    </section>
  );
}