'use client';

import { useMemo, useState } from 'react';
import TimestampDisplay from '@/components/TimestampDisplay';
import { formatTimestampBundle, parseTimestamp } from '@/lib/utils';

export default function TimestampToDateForm() {
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return { error: '', rows: [] as Array<{ label: string; value: string }> };

    const parsed = parseTimestamp(input);
    if (!parsed) {
      return {
        error: 'Enter a valid 10/13/16/19 digit timestamp value.',
        rows: []
      };
    }

    const formatted = formatTimestampBundle(parsed.date);
    return {
      error: '',
      rows: [
        { label: 'Detected Input Type', value: parsed.unit },
        { label: 'Local Time', value: formatted.local },
        { label: 'UTC Time', value: formatted.utc },
        { label: 'ISO 8601', value: formatted.iso }
      ]
    };
  }, [input]);

  return (
    <section className="card space-y-4">
      <label htmlFor="timestamp-input" className="text-sm font-medium">
        Timestamp Input
      </label>
      <input
        id="timestamp-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 1716547200 / 1716547200000"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-600 focus:ring dark:border-slate-700 dark:bg-slate-800"
      />
      {output.error ? <p className="text-sm text-rose-600">{output.error}</p> : null}
      {output.rows.length > 0 ? <TimestampDisplay title="Converted Output" values={output.rows} /> : null}
    </section>
  );
}