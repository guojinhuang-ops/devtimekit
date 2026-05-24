'use client';

import { useEffect, useMemo, useState } from 'react';
import TimestampDisplay from '@/components/TimestampDisplay';
import { formatTimestampBundle } from '@/lib/utils';

export default function CurrentNowPanel() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = useMemo(() => {
    if (now === null) {
      return [
        { label: 'UTC Time', value: '--' },
        { label: 'Local Time', value: '--' },
        { label: 'ISO 8601', value: '--' },
        { label: 'RFC 2822', value: '--' },
        { label: 'Unix Timestamp Seconds', value: '--' },
        { label: 'Unix Timestamp Milliseconds', value: '--' }
      ];
    }

    const f = formatTimestampBundle(new Date(now));
    return [
      { label: 'UTC Time', value: f.utc },
      { label: 'Local Time', value: f.local },
      { label: 'ISO 8601', value: f.iso },
      { label: 'RFC 2822', value: f.rfc2822 },
      { label: 'Unix Timestamp Seconds', value: String(Math.floor(now / 1000)) },
      { label: 'Unix Timestamp Milliseconds', value: String(now) }
    ];
  }, [now]);

  return <TimestampDisplay title="Current Time Snapshot" values={values} />;
}
