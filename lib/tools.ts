export type ToolItem = {
  title: string;
  href: string;
  summary: string;
};

export const tools: ToolItem[] = [
  {
    title: 'Unix Timestamp Converter',
    href: '/unix-timestamp-converter',
    summary: 'Convert epoch values across seconds, milliseconds, microseconds, and nanoseconds.'
  },
  {
    title: 'Current Unix Timestamp',
    href: '/current-unix-timestamp',
    summary: 'Get live Unix seconds, milliseconds, UTC, ISO, and local time formats.'
  },
  {
    title: 'Current Timestamp Milliseconds',
    href: '/current-timestamp-milliseconds',
    summary: 'Track live millisecond timestamps with UTC/ISO conversion examples.'
  },
  {
    title: 'Timestamp to Date',
    href: '/timestamp-to-date',
    summary: 'Convert Unix timestamp values into human-readable date and time.'
  },
  {
    title: 'Date to Timestamp',
    href: '/date-to-timestamp',
    summary: 'Convert local date/time input into Unix timestamp seconds and milliseconds.'
  },
  {
    title: 'About Unix Time',
    href: '/about-unix-time',
    summary: 'Understand epoch time, 1970 origin, UTC differences, and common mistakes.'
  }
];