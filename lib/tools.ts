export type ToolItem = {
  title: string;
  href: string;
  summary: string;
  category?: 'Time' | 'Text' | 'Encoding' | 'Developer' | 'Hash';
};

export const tools: ToolItem[] = [
  {
    title: 'Unix Timestamp Converter',
    href: '/unix-timestamp-converter',
    summary: 'Convert epoch values across seconds, milliseconds, microseconds, and nanoseconds.',
    category: 'Time'
  },
  {
    title: 'Current Unix Timestamp',
    href: '/current-unix-timestamp',
    summary: 'Get live Unix seconds, milliseconds, UTC, ISO, and local time formats.',
    category: 'Time'
  },
  {
    title: 'Current Timestamp Milliseconds',
    href: '/current-timestamp-milliseconds',
    summary: 'Track live millisecond timestamps with UTC/ISO conversion examples.',
    category: 'Time'
  },
  {
    title: 'Timestamp to Date',
    href: '/timestamp-to-date',
    summary: 'Convert Unix timestamp values into human-readable date and time.',
    category: 'Time'
  },
  {
    title: 'Date to Timestamp',
    href: '/date-to-timestamp',
    summary: 'Convert local date/time input into Unix timestamp seconds and milliseconds.',
    category: 'Time'
  },
  {
    title: 'About Unix Time',
    href: '/about-unix-time',
    summary: 'Understand epoch time, 1970 origin, UTC differences, and common mistakes.',
    category: 'Time'
  },
  {
    title: 'Epoch Converter',
    href: '/epoch-converter',
    summary: 'Convert epoch timestamps between Unix seconds, milliseconds, and readable formats.',
    category: 'Time'
  },
  {
    title: 'UTC Time Now',
    href: '/utc-time-now',
    summary: 'Get the exact current UTC time with copy-ready formats and developer references.',
    category: 'Time'
  },
  {
    title: 'ISO 8601 Converter',
    href: '/iso-8601-converter',
    summary: 'Convert between ISO 8601 datetime strings and Unix timestamps quickly.',
    category: 'Time'
  },
  {
    title: 'JavaScript Timestamp',
    href: '/javascript-timestamp',
    summary: 'Learn practical JavaScript timestamp patterns for Date.now and UTC conversion.',
    category: 'Time'
  },
  {
    title: 'Python Timestamp',
    href: '/python-timestamp',
    summary: 'Use Python time and datetime modules to create and parse Unix timestamps.',
    category: 'Time'
  },
  {
    title: 'MySQL Unix Timestamp',
    href: '/mysql-unix-timestamp',
    summary: 'Use UNIX_TIMESTAMP and FROM_UNIXTIME in MySQL with query-ready examples.',
    category: 'Time'
  },
  {
    title: 'Unix Time in Milliseconds',
    href: '/unix-time-in-milliseconds',
    summary: 'Understand and convert Unix time in milliseconds for frontend and API workflows.',
    category: 'Time'
  },
  {
    title: 'Timestamp Cheatsheet',
    href: '/timestamp-cheatsheet',
    summary: 'Quick reference for timestamp formats, conversions, examples, and common pitfalls.',
    category: 'Time'
  },
  {
    title: 'UTC to Local Time',
    href: '/utc-to-local',
    summary: 'Convert a UTC datetime into your browser local time with ISO and readable output.',
    category: 'Time'
  },
  {
    title: 'Local Time to UTC',
    href: '/local-to-utc',
    summary: 'Convert local datetime input into UTC, ISO 8601, and Unix timestamp formats.',
    category: 'Time'
  },
  {
    title: 'ISO 8601 Parser',
    href: '/iso8601-parser',
    summary: 'Parse ISO 8601 strings into UTC, local time, Unix seconds, and milliseconds.',
    category: 'Time'
  },
  {
    title: 'JSON Formatter',
    href: '/json-formatter',
    summary: 'Format, validate, and minify JSON in the browser with copy-ready output.',
    category: 'Developer'
  },
  {
    title: 'Base64 Encode',
    href: '/base64-encode',
    summary: 'Encode plain text into Base64 safely in your browser.',
    category: 'Encoding'
  },
  {
    title: 'Base64 Decode',
    href: '/base64-decode',
    summary: 'Decode Base64 strings into readable text with validation feedback.',
    category: 'Encoding'
  },
  {
    title: 'URL Encode',
    href: '/url-encode',
    summary: 'Encode query strings, URLs, and reserved characters for safe transport.',
    category: 'Encoding'
  },
  {
    title: 'URL Decode',
    href: '/url-decode',
    summary: 'Decode percent-encoded URL text and inspect readable query values.',
    category: 'Encoding'
  },
  {
    title: 'Regex Tester',
    href: '/regex-tester',
    summary: 'Test regular expressions against sample text and inspect matches.',
    category: 'Developer'
  },
  {
    title: 'Cron Expression Generator',
    href: '/cron-expression-generator',
    summary: 'Build common cron expressions and read their schedule meaning.',
    category: 'Developer'
  },
  {
    title: 'UUID Generator',
    href: '/uuid-generator',
    summary: 'Generate UUID v4 values instantly for tests, fixtures, and API payloads.',
    category: 'Developer'
  },
  {
    title: 'JWT Decoder',
    href: '/jwt-decoder',
    summary: 'Decode JWT header and payload fields for quick browser-based inspection.',
    category: 'Developer'
  },
  {
    title: 'Hash Generator',
    href: '/hash-generator',
    summary: 'Generate SHA-1, SHA-256, and SHA-512 hashes from input text.',
    category: 'Developer'
  },
  {
    title: 'MD5 Generator',
    href: '/md5-generator',
    summary: 'Generate MD5 32/16 uppercase and lowercase hashes from text.',
    category: 'Hash'
  },
  {
    title: 'SHA1 Generator',
    href: '/sha1-generator',
    summary: 'Generate SHA1 hash values from input text in real time.',
    category: 'Hash'
  },
  {
    title: 'SHA256 Generator',
    href: '/sha256-generator',
    summary: 'Generate SHA256 hash values from input text in real time.',
    category: 'Hash'
  },
  {
    title: 'SHA512 Generator',
    href: '/sha512-generator',
    summary: 'Generate SHA512 hash values from input text in real time.',
    category: 'Hash'
  },
  {
    title: 'HMAC Generator',
    href: '/hmac-generator',
    summary: 'Generate HMAC hashes with MD5, SHA1, SHA256, or SHA512.',
    category: 'Hash'
  },
  {
    title: 'File Checksum',
    href: '/file-checksum',
    summary: 'Calculate MD5, SHA1, SHA256, and SHA512 checksums in your browser.',
    category: 'Hash'
  },
  {
    title: 'SQL Formatter',
    href: '/sql-formatter',
    summary: 'Format SQL queries into readable multi-line output for reviews and debugging.',
    category: 'Developer'
  },
  {
    title: 'JSON Viewer',
    href: '/json-viewer',
    summary: 'Explore JSON in tree view with expandable nodes and path copy support.',
    category: 'Developer'
  },
  {
    title: 'JSON Minifier',
    href: '/json-minifier',
    summary: 'Compress JSON to a single line and inspect character savings.',
    category: 'Developer'
  },
  {
    title: 'JSON Escape / Unescape',
    href: '/json-escape-unescape',
    summary: 'Escape JSON strings or reverse escaped values quickly.',
    category: 'Developer'
  },
  {
    title: 'JSON Sort',
    href: '/json-sort',
    summary: 'Sort JSON object keys recursively in ascending or descending order.',
    category: 'Developer'
  },
  {
    title: 'JSON to TypeScript',
    href: '/json-to-typescript',
    summary: 'Generate TypeScript interfaces from nested JSON objects.',
    category: 'Developer'
  },
  {
    title: 'JSON to Go',
    href: '/json-to-go',
    summary: 'Generate Go structs with json tags from JSON input.',
    category: 'Developer'
  },
  {
    title: 'JSON to Java',
    href: '/json-to-java',
    summary: 'Generate Java class field definitions from JSON objects.',
    category: 'Developer'
  },
  {
    title: 'JSON to PHP',
    href: '/json-to-php',
    summary: 'Generate PHP model-style class fields from JSON objects.',
    category: 'Developer'
  },
  {
    title: 'JSON to C#',
    href: '/json-to-csharp',
    summary: 'Generate C# class definitions from JSON object input.',
    category: 'Developer'
  },
  {
    title: 'JSON to Python',
    href: '/json-to-python',
    summary: 'Generate Python dataclass-style models from JSON.',
    category: 'Developer'
  },
  {
    title: 'XML to JSON',
    href: '/xml-to-json',
    summary: 'Convert XML payloads into JSON structure for API debugging.',
    category: 'Developer'
  },
  {
    title: 'JSON to XML',
    href: '/json-to-xml',
    summary: 'Convert JSON objects into XML with custom root node support.',
    category: 'Developer'
  },
  {
    title: 'YAML to JSON',
    href: '/yaml-to-json',
    summary: 'Convert YAML documents into JSON output in the browser.',
    category: 'Developer'
  },
  {
    title: 'JSON to YAML',
    href: '/json-to-yaml',
    summary: 'Convert JSON objects into YAML text for config workflows.',
    category: 'Developer'
  },
  {
    title: 'Query String to JSON',
    href: '/query-string-to-json',
    summary: 'Parse URL query strings into JSON with duplicate key arrays.',
    category: 'Developer'
  },
  {
    title: 'JSON to Query String',
    href: '/json-to-query-string',
    summary: 'Serialize JSON object fields into URL query parameters.',
    category: 'Developer'
  },
  {
    title: 'CSV to JSON',
    href: '/csv-to-json',
    summary: 'Convert CSV rows into JSON array objects with delimiter selection.',
    category: 'Developer'
  },
  {
    title: 'JSON to CSV',
    href: '/json-to-csv',
    summary: 'Convert JSON arrays into CSV output and download quickly.',
    category: 'Developer'
  }
];
