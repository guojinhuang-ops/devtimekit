'use client';

import { useEffect, useMemo, useState } from 'react';
import ValueRow from '@/components/ValueRow';

export default function CurrentTimestampPanel() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = useMemo(() => {
    if (now === null) {
      return {
        seconds: '--',
        milliseconds: '--',
        utc: '--',
        iso: '--'
      };
    }

    const date = new Date(now);
    return {
      seconds: String(Math.floor(now / 1000)),
      milliseconds: String(now),
      utc: date.toUTCString(),
      iso: date.toISOString()
    };
  }, [now]);

  return (
    <section className="card space-y-3" aria-live="polite">
      <ValueRow label="Unix Timestamp (Seconds)" value={values.seconds} />
      <ValueRow label="Unix Timestamp (Milliseconds)" value={values.milliseconds} />
      <ValueRow label="UTC Time" value={values.utc} />
      <ValueRow label="ISO 8601" value={values.iso} />
    </section>
  );
}
