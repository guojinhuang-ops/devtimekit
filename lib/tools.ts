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
  },
  {
    title: 'Epoch Converter',
    href: '/epoch-converter',
    summary: 'Convert epoch timestamps between Unix seconds, milliseconds, and readable formats.'
  },
  {
    title: 'UTC Time Now',
    href: '/utc-time-now',
    summary: 'Get the exact current UTC time with copy-ready formats and developer references.'
  },
  {
    title: 'ISO 8601 Converter',
    href: '/iso-8601-converter',
    summary: 'Convert between ISO 8601 datetime strings and Unix timestamps quickly.'
  },
  {
    title: 'JavaScript Timestamp',
    href: '/javascript-timestamp',
    summary: 'Learn practical JavaScript timestamp patterns for Date.now and UTC conversion.'
  },
  {
    title: 'Python Timestamp',
    href: '/python-timestamp',
    summary: 'Use Python time and datetime modules to create and parse Unix timestamps.'
  },
  {
    title: 'MySQL Unix Timestamp',
    href: '/mysql-unix-timestamp',
    summary: 'Use UNIX_TIMESTAMP and FROM_UNIXTIME in MySQL with query-ready examples.'
  },
  {
    title: 'Unix Time in Milliseconds',
    href: '/unix-time-in-milliseconds',
    summary: 'Understand and convert Unix time in milliseconds for frontend and API workflows.'
  },
  {
    title: 'Timestamp Cheatsheet',
    href: '/timestamp-cheatsheet',
    summary: 'Quick reference for timestamp formats, conversions, examples, and common pitfalls.'
  }
];
