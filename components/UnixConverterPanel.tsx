'use client';

import { useMemo, useState } from 'react';
import TimestampDisplay from '@/components/TimestampDisplay';
import { formatTimestampBundle, parseTimestamp, relativeTimeFromNow } from '@/lib/utils';

export default function UnixConverterPanel() {
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return { error: '', values: null as null | Array<{ label: string; value: string }> };

    const parsed = parseTimestamp(input);
    if (!parsed) {
      return {
        error: 'Use a valid 10, 13, 16, or 19 digit timestamp (seconds/ms/us/ns).',
        values: null
      };
    }

    const formatted = formatTimestampBundle(parsed.date);
    const values = [
      { label: 'Detected Input Type', value: parsed.unit },
      { label: 'GMT', value: formatted.gmt },
      { label: 'UTC', value: formatted.utc },
      { label: 'ISO 8601', value: formatted.iso },
      { label: 'RFC 2822', value: formatted.rfc2822 },
      { label: 'Relative Time', value: relativeTimeFromNow(parsed.date) },
      { label: 'Day of Week', value: formatted.dayOfWeek },
      { label: 'Timezone Offset', value: formatted.timezoneOffset }
    ];

    return { error: '', values };
  }, [input]);

  return (
    <section id="converter" className="card">
      <h2 className="text-xl font-semibold">Timestamp Input Converter</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Supports seconds (10), milliseconds (13), microseconds (16), and nanoseconds (19).
      </p>
      <input
        className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-600 focus:ring dark:border-slate-700 dark:bg-slate-800"
        placeholder="Enter timestamp, e.g. 1716547200 or 1716547200000000000"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {output.error ? <p className="mt-3 text-sm text-rose-600">{output.error}</p> : null}
      {output.values ? (
        <div className="mt-4">
          <TimestampDisplay title="Conversion Results" values={output.values} />
        </div>
      ) : null}
    </section>
  );
}