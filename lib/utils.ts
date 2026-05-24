export type TimestampUnit =
  | 'seconds'
  | 'milliseconds'
  | 'microseconds'
  | 'nanoseconds';

export function detectTimestampUnit(value: string): TimestampUnit | null {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  if (trimmed.length === 10) return 'seconds';
  if (trimmed.length === 13) return 'milliseconds';
  if (trimmed.length === 16) return 'microseconds';
  if (trimmed.length === 19) return 'nanoseconds';
  return null;
}

export function normalizeToMilliseconds(value: string): number | null {
  const unit = detectTimestampUnit(value);
  if (!unit) return null;

  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;

  if (unit === 'seconds') return numeric * 1000;
  if (unit === 'milliseconds') return numeric;
  if (unit === 'microseconds') return Math.floor(numeric / 1000);
  return Math.floor(numeric / 1000000);
}

export function formatTimestampBundle(date: Date) {
  return {
    local: date.toLocaleString(),
    utc: date.toUTCString(),
    iso: date.toISOString(),
    rfc2822: date.toUTCString(),
    gmt: date.toString(),
    dayOfWeek: date.toLocaleDateString(undefined, { weekday: 'long' }),
    timezoneOffset: formatTimezoneOffset(date)
  };
}

export function formatTimezoneOffset(date: Date): string {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, '0');
  const minutes = String(abs % 60).padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}

export function parseTimestamp(value: string): { date: Date; unit: TimestampUnit } | null {
  const trimmed = value.trim();
  const unit = detectTimestampUnit(trimmed);
  if (!unit) return null;

  const ms = normalizeToMilliseconds(trimmed);
  if (ms === null) return null;

  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return null;

  return { date, unit };
}

export function parseLocalDateTime(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function relativeTimeFromNow(date: Date): string {
  const diff = date.getTime() - Date.now();
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (abs < 60_000) return rtf.format(Math.round(diff / 1000), 'second');
  if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), 'minute');
  if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), 'hour');
  return rtf.format(Math.round(diff / 86_400_000), 'day');
}

export function humanDurationExamples() {
  return [
    { input: '60 seconds', output: '1 minute' },
    { input: '3,600 seconds', output: '1 hour' },
    { input: '86,400 seconds', output: '1 day' }
  ];
}