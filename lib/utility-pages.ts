import type { UtilityKind } from '@/components/UtilityToolClient';
import { jsonUtilityPages } from '@/lib/json-utility-pages';

export type UtilityPage = {
  title: string;
  path: string;
  description: string;
  keywords: string[];
  kind: UtilityKind;
  definition: string[];
  steps: string[];
  examples: string[];
  useCases: string[];
  faq: Array<{ q: string; a: string }>;
};

const sharedTimeFaq = [
  {
    q: 'Does this tool send data to a server?',
    a: 'No. The conversion runs in your browser, which keeps the workflow fast and private.'
  },
  {
    q: 'Should I store UTC or local time?',
    a: 'Store UTC for systems and databases, then convert to local time only when displaying data to users.'
  }
];

export const utilityPages: Record<string, UtilityPage> = {
  '/utc-to-local': {
    title: 'UTC to Local Time Converter',
    path: '/utc-to-local',
    description: 'Convert UTC datetime values into local time, ISO 8601, and Unix timestamp formats.',
    keywords: ['utc to local', 'utc converter', 'local time converter', 'developer time tool'],
    kind: 'utc-to-local',
    definition: [
      'UTC to Local Time Converter helps developers translate a universal timestamp into the timezone used by the current browser. UTC is the safest format for storage and transport because it is independent of region, daylight saving rules, and local display preferences. Local time is the format people usually need when reading a dashboard, a support ticket, or an incident timeline.',
      'This tool is useful when a log line, API response, database row, or scheduled job reports time in UTC and you need to understand what that value means on your machine. It returns readable local time, ISO 8601, and Unix seconds so you can compare the same moment across human-readable and machine-readable formats.',
      'For AI Overview and documentation workflows, the key idea is simple: UTC describes the exact moment globally, while local time describes how that same moment appears to a user. Keeping those concepts separate prevents a large class of timezone bugs.'
    ],
    steps: [
      'Paste a UTC datetime such as 2026-05-24T12:00:00Z.',
      'Review the local time, ISO 8601 value, and Unix timestamp output.',
      'Copy the format that matches your API, support note, or debugging workflow.'
    ],
    examples: [
      '2026-05-24T12:00:00Z becomes a local browser time based on the current timezone.',
      'A UTC log event can be converted before adding it to an incident report.',
      'A scheduled task timestamp can be checked against local business hours.'
    ],
    useCases: [
      'Reading UTC production logs during incident response.',
      'Explaining backend event times to product or support teams.',
      'Checking deployment windows across different timezones.'
    ],
    faq: sharedTimeFaq
  },
  '/local-to-utc': {
    title: 'Local Time to UTC Converter',
    path: '/local-to-utc',
    description: 'Convert local datetime input into UTC, ISO 8601, and Unix timestamp values.',
    keywords: ['local to utc', 'utc converter', 'timezone converter', 'iso 8601'],
    kind: 'local-to-utc',
    definition: [
      'Local Time to UTC Converter turns a datetime written for your current browser timezone into a UTC reference. This is important because users and systems often start from local time, but backend services usually need one universal representation.',
      'The safest workflow for most applications is to accept local input at the interface boundary, convert it to UTC, and store that UTC value in databases, queues, logs, and APIs. When the value is shown again, the application can convert it back to a user-friendly local representation.',
      'This page is built for developers who need a quick, copy-ready way to verify timezone conversion before writing tests, debugging event schedules, or preparing API payloads.'
    ],
    steps: [
      'Enter a local datetime such as 2026-05-24T12:00:00.',
      'Read the UTC time, ISO 8601 string, and Unix seconds.',
      'Use the copied UTC value for storage, API requests, or scheduling checks.'
    ],
    examples: [
      'A local meeting time can be converted to UTC before being saved.',
      'A scheduled notification can be validated against a backend queue.',
      'A browser datetime input can be normalized for an API payload.'
    ],
    useCases: [
      'Scheduling jobs from a user-facing form.',
      'Normalizing local browser input before database storage.',
      'Creating timezone-stable test fixtures.'
    ],
    faq: sharedTimeFaq
  },
  '/iso8601-parser': {
    title: 'ISO 8601 Parser',
    path: '/iso8601-parser',
    description: 'Parse ISO 8601 datetime strings into UTC, local time, Unix seconds, and milliseconds.',
    keywords: ['iso8601 parser', 'iso 8601', 'parse iso date', 'timestamp parser'],
    kind: 'iso8601-parser',
    definition: [
      'ISO 8601 Parser reads standardized datetime strings and turns them into practical developer outputs. ISO 8601 is widely used in APIs because it can include date, time, fractional seconds, and timezone information in one sortable string.',
      'A string ending in Z means the value is in UTC. A string with an offset such as +08:00 or -05:00 describes the local offset from UTC. Parsing those strings correctly matters when services exchange timestamps across languages, regions, and database engines.',
      'This tool gives a fast sanity check for values that appear in API responses, webhook events, OpenAPI examples, and structured logs. It helps separate parsing issues from business logic issues.'
    ],
    steps: [
      'Paste an ISO 8601 value such as 2026-05-24T12:00:00Z.',
      'Check UTC, local time, Unix seconds, and milliseconds.',
      'Copy the output you need for tests, logs, or documentation.'
    ],
    examples: [
      '2026-05-24T12:00:00Z parses as a UTC instant.',
      '2026-05-24T20:00:00+08:00 represents the same moment as 2026-05-24T12:00:00Z.',
      'ISO strings are useful because they preserve timezone intent.'
    ],
    useCases: [
      'Validating API timestamp fields.',
      'Debugging webhook event time values.',
      'Creating reproducible test cases for datetime parsing.'
    ],
    faq: [
      {
        q: 'What does Z mean in ISO 8601?',
        a: 'Z means zero UTC offset, so the timestamp is expressed in Coordinated Universal Time.'
      },
      ...sharedTimeFaq
    ]
  },
  '/json-formatter': {
    title: 'JSON Formatter',
    path: '/json-formatter',
    description: 'Format, validate, and minify JSON directly in the browser with copy-ready output.',
    keywords: ['json formatter', 'json validator', 'format json', 'minify json'],
    kind: 'json-formatter',
    definition: [
      'JSON Formatter helps developers inspect structured data by converting compact JSON into readable indentation. It also validates the input, so syntax errors such as trailing commas, missing quotes, or mismatched braces are caught immediately.',
      'Readable JSON is easier to review in API debugging, logs, configuration files, and support conversations. Minified JSON is useful when you need compact payloads for query parameters, fixtures, or documentation examples.',
      'Because this formatter runs in the browser, it is suitable for quick inspection of non-sensitive payloads without setting up a backend. For confidential production data, teams should still follow their internal data handling rules.'
    ],
    steps: [
      'Paste JSON into the input field.',
      'Review the formatted output or the validation error.',
      'Copy the formatted or minified result.'
    ],
    examples: [
      '{"name":"DevTimeKit","type":"tool"} becomes a multi-line formatted object.',
      'Invalid JSON displays a syntax error so you can fix the payload.',
      'The minified output can be used in compact fixtures or examples.'
    ],
    useCases: [
      'Inspecting API responses during development.',
      'Preparing readable JSON for documentation.',
      'Validating configuration snippets before sharing.'
    ],
    faq: [
      {
        q: 'Does this formatter change my JSON values?',
        a: 'No. Valid JSON is parsed and serialized with indentation; the data structure remains the same.'
      },
      {
        q: 'Can this fix invalid JSON automatically?',
        a: 'It reports syntax errors, but it does not guess missing values or rewrite invalid structures.'
      }
    ]
  },
  '/base64-encode': {
    title: 'Base64 Encode',
    path: '/base64-encode',
    description: 'Encode plain text into Base64 in the browser with copy-ready output.',
    keywords: ['base64 encode', 'base64 encoder', 'encode text base64', 'developer encoding tool'],
    kind: 'base64-encode',
    definition: [
      'Base64 Encode converts text into an ASCII-safe representation. It is commonly used when binary data or text needs to travel through systems that expect plain text, such as headers, small configuration values, and data URLs.',
      'Base64 is an encoding format, not encryption. Anyone can decode it back to the original value. That distinction matters in documentation and security reviews because encoding does not provide secrecy or access control.',
      'This browser-based encoder is useful for quick development checks, sample payloads, and educational examples. It supports Unicode text by converting it safely before encoding.'
    ],
    steps: [
      'Enter the text you want to encode.',
      'Review the Base64 output.',
      'Copy the encoded value into your test, header, or example.'
    ],
    examples: [
      'hello becomes aGVsbG8=.',
      'Configuration snippets can be encoded for transport through text-only fields.',
      'Small sample payloads can be embedded in docs or fixtures.'
    ],
    useCases: [
      'Preparing test Authorization header examples.',
      'Encoding small strings for data transport.',
      'Learning the difference between encoding and encryption.'
    ],
    faq: [
      {
        q: 'Is Base64 secure?',
        a: 'No. Base64 is reversible encoding and should not be treated as encryption.'
      },
      {
        q: 'Why does Base64 output include equals signs?',
        a: 'Equals signs are padding characters used to align the encoded output length.'
      }
    ]
  },
  '/base64-decode': {
    title: 'Base64 Decode',
    path: '/base64-decode',
    description: 'Decode Base64 strings into readable text with validation feedback.',
    keywords: ['base64 decode', 'base64 decoder', 'decode base64 text', 'developer encoding tool'],
    kind: 'base64-decode',
    definition: [
      'Base64 Decode converts an encoded Base64 string back into readable text. Developers often use it to inspect sample tokens, test payloads, configuration values, or small embedded strings during debugging.',
      'Decoding Base64 should not be confused with decrypting data. If a value contains secrets, decoding it may reveal sensitive information. This tool runs locally in the browser, but teams should still avoid pasting confidential production credentials into any utility page.',
      'The decoder provides immediate feedback when input is malformed. That helps identify whether a failure comes from the Base64 value itself or from later application logic.'
    ],
    steps: [
      'Paste a Base64 encoded string.',
      'Review the decoded text or error message.',
      'Copy the readable result if it matches your expected value.'
    ],
    examples: [
      'aGVsbG8= decodes to hello.',
      'Encoded test strings can be checked before adding them to fixtures.',
      'Malformed Base64 shows an error instead of producing misleading output.'
    ],
    useCases: [
      'Inspecting encoded sample data.',
      'Debugging integration payloads.',
      'Checking documentation examples.'
    ],
    faq: [
      {
        q: 'Can Base64 decode binary files?',
        a: 'This page is focused on text values. Large binary files should use a dedicated file tool.'
      },
      {
        q: 'Is decoded output always readable?',
        a: 'No. Base64 can represent binary data, so some decoded values may not be human-readable text.'
      }
    ]
  },
  '/url-encode': {
    title: 'URL Encode',
    path: '/url-encode',
    description: 'Encode URL text, query values, and reserved characters for safe transport.',
    keywords: ['url encode', 'percent encoding', 'encode url', 'query string encoder'],
    kind: 'url-encode',
    definition: [
      'URL Encode converts reserved or unsafe characters into percent-encoded sequences. This is necessary when text is placed inside a URL path, query parameter, or redirect target and must not be interpreted as URL syntax.',
      'For example, spaces, ampersands, equals signs, and non-ASCII text may need encoding depending on where they appear. Encoding is especially important when building URLs from user input or passing nested URLs as parameters.',
      'This tool is designed for quick inspection and small snippets. It helps developers verify what a browser or API client will send over the wire.'
    ],
    steps: [
      'Enter the URL part or query value you want to encode.',
      'Review the percent-encoded output.',
      'Copy the encoded value into your URL, request, or test case.'
    ],
    examples: [
      'hello world becomes hello%20world.',
      'a=b&c=d becomes a%3Db%26c%3Dd when encoded as a value.',
      'Nested redirect URLs should usually be encoded before being added as query parameters.'
    ],
    useCases: [
      'Building safe query strings.',
      'Encoding redirect targets.',
      'Preparing API request examples.'
    ],
    faq: [
      {
        q: 'Should I encode a whole URL or only parts of it?',
        a: 'Usually encode individual parameter values, not the entire URL structure.'
      },
      {
        q: 'What is percent encoding?',
        a: 'Percent encoding represents reserved characters as a percent sign followed by hexadecimal bytes.'
      }
    ]
  },
  '/url-decode': {
    title: 'URL Decode',
    path: '/url-decode',
    description: 'Decode percent-encoded URL text and inspect readable query values.',
    keywords: ['url decode', 'percent decode', 'decode url', 'query string decoder'],
    kind: 'url-decode',
    definition: [
      'URL Decode converts percent-encoded text back into a readable string. Developers use this when inspecting query parameters, redirect URLs, callback payloads, and logs that contain encoded request data.',
      'A decoded URL value can reveal whether an integration encoded data once, twice, or not at all. This is helpful when debugging OAuth redirects, search filters, analytics links, and webhook delivery URLs.',
      'The tool keeps the workflow direct: paste encoded text, read the decoded value, and copy it into your issue, test, or documentation.'
    ],
    steps: [
      'Paste percent-encoded URL text.',
      'Review the decoded output.',
      'Use the result to inspect parameters, redirect targets, or logs.'
    ],
    examples: [
      'hello%20world decodes to hello world.',
      'a%3Db%26c%3Dd decodes to a=b&c=d.',
      'Encoded redirect_uri values become readable after decoding.'
    ],
    useCases: [
      'Debugging OAuth callback URLs.',
      'Reading encoded log entries.',
      'Checking analytics campaign links.'
    ],
    faq: [
      {
        q: 'Why does decoding sometimes fail?',
        a: 'The input may contain incomplete percent sequences or invalid encoded bytes.'
      },
      {
        q: 'Can text be encoded more than once?',
        a: 'Yes. Double-encoded values may need decoding more than once, but verify intent before doing so.'
      }
    ]
  },
  '/regex-tester': {
    title: 'Regex Tester',
    path: '/regex-tester',
    description: 'Test regular expressions against sample text and inspect browser-based matches.',
    keywords: ['regex tester', 'regular expression tester', 'javascript regex', 'developer regex tool'],
    kind: 'regex-tester',
    definition: [
      'Regex Tester helps developers check whether a regular expression matches expected sample text. Regular expressions are powerful but easy to misread, so a fast feedback loop is useful before placing a pattern inside validation logic, log parsing, or search code.',
      'This tool uses the browser JavaScript regular expression engine. That makes it especially relevant for frontend validation, Node.js utilities, and documentation examples that target JavaScript syntax.',
      'For production code, a regex should be tested with realistic examples and edge cases. This page gives a quick starting point for that workflow.'
    ],
    steps: [
      'Enter a JavaScript regular expression pattern.',
      'Paste sample text to test against.',
      'Review matched values and refine the pattern.'
    ],
    examples: [
      'Use \\d+ to match one or more digits.',
      'Use ^ and $ to anchor a pattern to the full string.',
      'Use character classes such as [a-z] for constrained matching.'
    ],
    useCases: [
      'Testing form validation patterns.',
      'Extracting IDs from logs.',
      'Checking documentation examples before publishing.'
    ],
    faq: [
      {
        q: 'Which regex flavor does this use?',
        a: 'It uses JavaScript regular expressions in the browser.'
      },
      {
        q: 'Can regex validate every data format perfectly?',
        a: 'No. Complex formats such as JSON, HTML, and full email validation often need parsers or specialized libraries.'
      }
    ]
  },
  '/cron-expression-generator': {
    title: 'Cron Expression Generator',
    path: '/cron-expression-generator',
    description: 'Generate common cron expressions and understand their schedule meaning.',
    keywords: ['cron expression generator', 'cron schedule', 'cron syntax', 'developer scheduling tool'],
    kind: 'cron-expression-generator',
    definition: [
      'Cron Expression Generator creates common five-field cron schedules for jobs, scripts, and recurring automation. Cron syntax is compact, but that compactness can make schedules hard to read during reviews.',
      'A standard cron expression usually contains minute, hour, day of month, month, and day of week. The expression 0 * * * * runs at the start of every hour, while 0 0 * * * runs once per day at midnight.',
      'This tool focuses on readable presets and copy-ready output. It helps teams avoid schedule mistakes in deployment scripts, CI jobs, backups, reports, and queue workers.'
    ],
    steps: [
      'Choose a common schedule preset.',
      'Review the generated cron expression and meaning.',
      'Copy the expression into your scheduler, CI system, or job configuration.'
    ],
    examples: [
      '* * * * * means every minute.',
      '0 * * * * means every hour.',
      '0 9 * * 1 means every Monday at 09:00.'
    ],
    useCases: [
      'Scheduling recurring background jobs.',
      'Creating CI maintenance tasks.',
      'Configuring database backups and reports.'
    ],
    faq: [
      {
        q: 'Is cron timezone-aware?',
        a: 'Cron timezone behavior depends on the scheduler and server configuration. Always verify the runtime timezone.'
      },
      {
        q: 'Does every system use five cron fields?',
        a: 'No. Some schedulers add seconds or year fields, so check the platform documentation.'
      }
    ]
  },
  '/uuid-generator': {
    title: 'UUID Generator',
    path: '/uuid-generator',
    description: 'Generate UUID v4 values instantly in the browser for testing, IDs, and fixtures.',
    keywords: ['uuid generator', 'uuid v4', 'random id generator', 'developer id tool'],
    kind: 'uuid-generator',
    definition: [
      'UUID Generator creates random UUID v4 identifiers that are useful in testing, sample payloads, and temporary identifiers. UUIDs are commonly used when you need globally unique keys without a central sequence service.',
      'In distributed systems, UUIDs avoid collision risks that can happen with local counters or weak random strings. They are widely used in APIs, event records, and database reference keys.',
      'This page is designed for fast copy-and-use workflows during development, QA, and documentation.'
    ],
    steps: [
      'Open the page to generate a UUID v4 value.',
      'Copy the UUID output.',
      'Use it in tests, fixtures, API payloads, or temporary IDs.'
    ],
    examples: [
      'Use a UUID as a request ID in API debugging.',
      'Create unique keys for demo JSON payloads.',
      'Generate IDs for test database inserts.'
    ],
    useCases: [
      'Creating stable unique identifiers in test data.',
      'Adding correlation IDs to logs and traces.',
      'Preparing sample payloads for docs and tickets.'
    ],
    faq: [
      {
        q: 'Is UUID v4 ordered by time?',
        a: 'No. UUID v4 is random and does not encode a timestamp order.'
      },
      {
        q: 'Can UUID replace numeric auto-increment IDs?',
        a: 'Yes in many systems, but index size and query patterns should be reviewed before switching.'
      }
    ]
  },
  '/jwt-decoder': {
    title: 'JWT Decoder',
    path: '/jwt-decoder',
    description: 'Decode JWT header and payload in the browser for quick inspection during debugging.',
    keywords: ['jwt decoder', 'decode jwt token', 'jwt payload', 'jwt header'],
    kind: 'jwt-decoder',
    definition: [
      'JWT Decoder parses the first two token segments and shows readable JSON for the header and payload. This is useful when debugging auth flows, checking claims, or validating token shape.',
      'Decoding is not verification. A decoded token may still be expired, tampered with, or signed by an untrusted key.',
      'Use this tool for inspection only, then verify signature and claims in your backend security pipeline.'
    ],
    steps: [
      'Paste a JWT token string.',
      'Review decoded header and payload content.',
      'Check signature presence and validate on the server.'
    ],
    examples: [
      'Inspect exp, iat, and sub claims in a test token.',
      'Check the alg value in the JWT header.',
      'Compare issuer and audience claims during integration.'
    ],
    useCases: [
      'Debugging OAuth or API gateway integrations.',
      'Inspecting token claim mismatches.',
      'Reviewing token examples in documentation.'
    ],
    faq: [
      {
        q: 'Does decoding verify JWT signature?',
        a: 'No. Signature verification must be done with the correct secret or public key.'
      },
      {
        q: 'Can I paste production secrets here?',
        a: 'Avoid pasting sensitive production tokens into any shared environment.'
      }
    ]
  },
  '/hash-generator': {
    title: 'Hash Generator',
    path: '/hash-generator',
    description: 'Generate SHA-1, SHA-256, and SHA-512 hashes from input text in the browser.',
    keywords: ['hash generator', 'sha256', 'sha512', 'checksum tool'],
    kind: 'hash-generator',
    definition: [
      'Hash Generator computes deterministic hash values from input text. Hashes are commonly used for checksums, signatures, cache keys, and content fingerprinting.',
      'This tool provides SHA-1, SHA-256, and SHA-512 outputs. For security-sensitive use cases, prefer SHA-256 or SHA-512 over SHA-1.',
      'Because hashing is deterministic, the same input always produces the same output.'
    ],
    steps: [
      'Enter text input.',
      'Read generated SHA hash outputs.',
      'Copy the algorithm output your integration expects.'
    ],
    examples: [
      'Create a checksum for payload comparison.',
      'Generate cache keys from normalized strings.',
      'Verify content integrity in tests.'
    ],
    useCases: [
      'Comparing content consistency across systems.',
      'Preparing reproducible digests in CI tests.',
      'Building deterministic IDs from textual input.'
    ],
    faq: [
      {
        q: 'Is hashing reversible?',
        a: 'No. Cryptographic hashes are one-way functions.'
      },
      {
        q: 'Should I use SHA-1 for security?',
        a: 'No. Use SHA-256 or stronger algorithms for modern security requirements.'
      }
    ]
  },
  '/md5-generator': {
    title: 'MD5 Generator',
    path: '/md5-generator',
    description: 'Generate MD5 hashes online with 32/16, uppercase/lowercase output in real time.',
    keywords: ['md5 generator', 'md5 hash', 'md5 16', 'md5 32'],
    kind: 'md5-generator',
    definition: [
      'MD5 is a hash function, not encryption. It transforms text into a fixed-length digest and is not designed to be reversed back into original text.',
      'What is MD5? MD5 (Message-Digest Algorithm 5) outputs a 128-bit digest, commonly shown as 32 hexadecimal characters.',
      'How MD5 works: input text is processed in blocks and compressed into a deterministic 128-bit hash, so identical input always gives identical output.'
    ],
    steps: [
      'Enter any text, including UTF-8, emoji, and Chinese characters.',
      'Read MD5 32 lower/upper and MD5 16 lower/upper output instantly.',
      'Copy the hash format required by your workflow.'
    ],
    examples: [
      'MD5 use cases: quick integrity checks, cache keys, duplicate detection, and non-security fingerprints.',
      'MD5 vs SHA256: SHA256 is stronger and preferred for security-sensitive workflows.',
      'Use the Clear button to reset input and output instantly.'
    ],
    useCases: [
      'Checksum comparison for lightweight non-security tasks.',
      'Deterministic identifier generation for internal tooling.',
      'Educational understanding of hash behavior versus encryption.'
    ],
    faq: [
      { q: 'Is MD5 encryption?', a: 'No. MD5 is a one-way hash function, not an encryption algorithm.' },
      { q: 'Should MD5 be used for passwords?', a: 'No. Use modern password hashing algorithms such as Argon2, bcrypt, or scrypt.' },
      { q: 'Why provide MD5 16 and MD5 32?', a: 'MD5 32 is the full hex digest. MD5 16 is a shortened representation used by some legacy systems.' }
    ]
  },
  '/sha1-generator': {
    title: 'SHA1 Generator',
    path: '/sha1-generator',
    description: 'Generate SHA1 hash values from text in real time with copy-ready output.',
    keywords: ['sha1 generator', 'sha1 hash', 'checksum'],
    kind: 'sha1-generator',
    definition: ['SHA1 Generator computes deterministic SHA1 digests from input text directly in your browser.'],
    steps: ['Enter text.', 'Read hash output instantly.', 'Copy or clear as needed.'],
    examples: ['Useful for compatibility checks and legacy digest workflows.'],
    useCases: ['Text fingerprinting.', 'Legacy integration support.', 'Quick developer checks.'],
    faq: [{ q: 'Is SHA1 recommended for new security designs?', a: 'No. Prefer SHA256 or SHA512 for stronger security.' }]
  },
  '/sha256-generator': {
    title: 'SHA256 Generator',
    path: '/sha256-generator',
    description: 'Generate SHA256 hash values from text in real time with copy-ready output.',
    keywords: ['sha256 generator', 'sha256 hash'],
    kind: 'sha256-generator',
    definition: ['SHA256 Generator computes SHA256 digests in-browser for modern checksum and integrity workflows.'],
    steps: ['Enter text.', 'Read hash output instantly.', 'Copy or clear as needed.'],
    examples: ['Suitable for modern integrity checks and signatures preprocessing.'],
    useCases: ['File list checksums.', 'Content fingerprinting.', 'Build and deploy validation.'],
    faq: [{ q: 'Is SHA256 stronger than MD5?', a: 'Yes. SHA256 is significantly stronger and preferred in modern systems.' }]
  },
  '/sha512-generator': {
    title: 'SHA512 Generator',
    path: '/sha512-generator',
    description: 'Generate SHA512 hash values from text in real time with copy-ready output.',
    keywords: ['sha512 generator', 'sha512 hash'],
    kind: 'sha512-generator',
    definition: ['SHA512 Generator computes SHA512 digests in-browser for high-strength hashing requirements.'],
    steps: ['Enter text.', 'Read hash output instantly.', 'Copy or clear as needed.'],
    examples: ['Useful when a system requires SHA512 output.'],
    useCases: ['Integrity verification.', 'High-strength digest generation.', 'Security tooling support.'],
    faq: [{ q: 'When should I choose SHA512?', a: 'Use SHA512 when your standard or integration explicitly requires it.' }]
  },
  '/hmac-generator': {
    title: 'HMAC Generator',
    path: '/hmac-generator',
    description: 'Generate HMAC digests with MD5, SHA1, SHA256, and SHA512 using text and secret key.',
    keywords: ['hmac generator', 'hmac sha256', 'hmac md5'],
    kind: 'hmac-generator',
    definition: ['HMAC Generator combines input text and a secret key to create keyed hash output for integrity checks.'],
    steps: ['Enter text.', 'Enter secret key.', 'Select HMAC algorithm and copy output.'],
    examples: ['API signature debugging.', 'Webhook signature verification.', 'Inter-service authentication checks.'],
    useCases: ['Signing payloads.', 'Verifying message integrity.', 'Debugging auth headers.'],
    faq: [{ q: 'Is HMAC the same as plain hash?', a: 'No. HMAC requires a secret key and is designed for message authentication.' }]
  },
  '/file-checksum': {
    title: 'File Checksum',
    path: '/file-checksum',
    description: 'Calculate MD5, SHA1, SHA256, and SHA512 checksums for uploaded files completely in browser.',
    keywords: ['file checksum', 'md5 file', 'sha256 file hash'],
    kind: 'file-checksum',
    definition: ['File Checksum computes digest values in your browser without uploading files to a server.'],
    steps: ['Choose a file.', 'Wait for browser-side checksum calculation.', 'Copy MD5/SHA1/SHA256/SHA512 values.'],
    examples: ['Compare downloaded file integrity.', 'Verify release artifacts.', 'Document checksums in deployment notes.'],
    useCases: ['Download verification.', 'Build artifact validation.', 'Local integrity checks.'],
    faq: [{ q: 'Is my file uploaded?', a: 'No. File processing is fully browser-side on this page.' }]
  },
  '/sql-formatter': {
    title: 'SQL Formatter',
    path: '/sql-formatter',
    description: 'Format SQL queries into readable multi-line output for debugging and code review.',
    keywords: ['sql formatter', 'format sql', 'sql beautify', 'query formatter'],
    kind: 'sql-formatter',
    definition: [
      'SQL Formatter improves query readability by splitting common clauses onto separate lines. This helps review joins, filters, ordering, and grouping logic more safely.',
      'Readable SQL reduces mistakes during code review and incident debugging, especially with long dynamically generated queries.',
      'Use this tool as a quick readability pass before sharing SQL in pull requests, tickets, or runbooks.'
    ],
    steps: [
      'Paste a SQL query.',
      'Review formatted output with clause separation.',
      'Copy formatted SQL into docs, reviews, or debugging notes.'
    ],
    examples: [
      'Format long single-line SQL into readable blocks.',
      'Make WHERE and ORDER BY clauses easier to inspect.',
      'Prepare query samples for team documentation.'
    ],
    useCases: [
      'Reviewing query logic in pull requests.',
      'Debugging production SQL snippets from logs.',
      'Documenting queries in runbooks and knowledge bases.'
    ],
    faq: [
      {
        q: 'Does formatter execute SQL?',
        a: 'No. It only reformats text for readability.'
      },
      {
        q: 'Will formatting change query semantics?',
        a: 'It should not, but always run tests on critical queries.'
      }
    ]
  },
  ...jsonUtilityPages
};

export const newUtilityPaths = Object.keys(utilityPages);
