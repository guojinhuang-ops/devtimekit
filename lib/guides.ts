export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  category: string;
  intro: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faq: Array<{ q: string; a: string }>;
  relatedTools: string[];
};

function buildLongParagraph(topic: string, angle: string) {
  return `${topic} ${angle} In real engineering environments, this matters because values move across APIs, storage engines, background jobs, and dashboards where a single format mismatch can create cascading bugs. A reliable workflow starts with clear format contracts, explicit unit names, and repeatable conversion checks before deployment.`;
}

function makeGuide(
  slug: string,
  title: string,
  description: string,
  category: string,
  focusA: string,
  focusB: string,
  relatedTools: string[]
): GuidePage {
  return {
    slug,
    title,
    description,
    category,
    intro: [
      buildLongParagraph(title, 'is more than a definition page.'),
      buildLongParagraph(title, 'acts as a practical reference for developers shipping production systems.')
    ],
    sections: [
      {
        heading: `What is ${focusA}?`,
        paragraphs: [
          buildLongParagraph(focusA, 'defines a stable concept that developers can rely on across languages and runtimes.'),
          buildLongParagraph(focusA, 'becomes much easier to work with when teams document expected input and output formats explicitly.')
        ],
        bullets: [
          `Concise definition of ${focusA}`,
          `Common representations of ${focusA}`,
          `Where ${focusA} appears in real systems`
        ]
      },
      {
        heading: `How to use ${focusA} in projects`,
        paragraphs: [
          buildLongParagraph(focusA, 'works best when paired with boundary validation and test fixtures.'),
          buildLongParagraph(focusA, 'should be normalized at ingestion and transformed only for final display.')
        ],
        bullets: [
          'Validate input at API boundaries',
          'Normalize values before storage',
          'Convert for UI only at render time',
          'Add regression tests for edge cases'
        ]
      },
      {
        heading: `Comparison: ${focusA} vs ${focusB}`,
        paragraphs: [
          buildLongParagraph(`${focusA} and ${focusB}`, 'serve different goals and should not be mixed casually.'),
          buildLongParagraph(`${focusA} and ${focusB}`, 'can still coexist in a pipeline when each layer has a clear responsibility.')
        ],
        bullets: [
          `${focusA}: optimized for one set of requirements`,
          `${focusB}: optimized for another set of requirements`,
          'Choose based on compatibility, safety, and performance constraints'
        ]
      },
      {
        heading: 'Common mistakes and how to avoid them',
        paragraphs: [
          buildLongParagraph('A frequent mistake', 'is assuming two values are equivalent without checking unit and encoding details.'),
          buildLongParagraph('Another mistake', 'is relying on ad-hoc manual conversions during incidents, which increases recovery time.')
        ],
        bullets: [
          'Mixing seconds and milliseconds',
          'Confusing encoding with encryption',
          'Skipping timezone normalization',
          'Ignoring malformed payload validation'
        ]
      },
      {
        heading: 'Developer tips and best practices',
        paragraphs: [
          buildLongParagraph('Best practices', 'are small habits that reduce production risk and improve code review quality.'),
          buildLongParagraph('Developer tips', 'help teams move faster by making transformations deterministic and inspectable.')
        ],
        bullets: [
          'Use descriptive field names with explicit units',
          'Keep helper utilities centralized',
          'Store sample inputs and outputs in tests',
          'Link docs directly to live conversion tools'
        ]
      }
    ],
    faq: [
      { q: `What is ${focusA} in simple terms?`, a: `${focusA} is a practical data format or concept used to keep developer workflows consistent.` },
      { q: `When should I use ${focusA}?`, a: `Use ${focusA} when your API contract, storage model, or integration requirements explicitly call for it.` },
      { q: `How do I avoid mistakes with ${focusA}?`, a: 'Validate boundaries, document units, and add tests for conversion edge cases.' },
      { q: `Is ${focusA} good for production systems?`, a: 'Yes, when used with clear standards, normalization rules, and compatibility checks.' },
      { q: `Can I combine ${focusA} with ${focusB}?`, a: `Yes, as long as each step has a defined purpose and deterministic transformation path.` },
      { q: 'Why do developers use online tools for this?', a: 'They reduce manual conversion errors and provide quick, copy-ready values for debugging.' }
    ],
    relatedTools
  };
}

export const guidePages: GuidePage[] = [
  {
    slug: 'world-cup-2026-time-zones',
    title: 'World Cup 2026 Time Zones Guide',
    description: 'Understand World Cup 2026 host countries/time zones and convert match kickoff times to your local timezone.',
    category: 'Time Guides',
    intro: [
      'The 2026 tournament is hosted across the United States, Canada, and Mexico, so kickoff time planning depends on city timezone and daylight saving rules.',
      'This guide explains practical conversion workflows between host local time, UTC, and your own local timezone for reliable viewing and team coordination.'
    ],
    sections: [
      {
        heading: 'Host countries and timezone overview',
        paragraphs: [
          'World Cup 2026 host cities span multiple North American timezones, mainly Pacific, Mountain, Central, and Eastern offsets.',
          'Because kickoff announcements can be listed as local host time, conversion should always reference both city and timezone.'
        ],
        bullets: ['United States host cities: multiple timezone bands', 'Canada host cities: mainly Eastern/Pacific context', 'Mexico host cities: commonly Central timezone context']
      },
      {
        heading: 'How to convert match time to local time',
        paragraphs: [
          'Start with the announced host city kickoff time, map it to the city timezone, then convert the same instant to your local timezone.',
          'If UTC time is provided, conversion is simpler: convert UTC directly into local display time.'
        ],
        bullets: ['Host local time + host timezone -> UTC -> your local time', 'UTC kickoff -> your local time directly', 'Use one canonical UTC value for cross-team communication']
      },
      {
        heading: 'UTC, local time, and timezone difference',
        paragraphs: [
          'UTC is a global reference. Local time is how that exact instant appears in a region with its own offset and DST rules.',
          'Timezone difference is the offset gap between two regions at a given date, which can change seasonally.'
        ]
      }
    ],
    faq: [
      { q: 'What is the safest way to share match time with global teams?', a: 'Share UTC first, then include local conversions for each team region.' },
      { q: 'Why can local kickoff conversions change during the year?', a: 'Daylight saving transitions can shift offsets, so always convert using the actual match date.' },
      { q: 'Can I convert from host city time without UTC?', a: 'Yes, but internally it is still converted through a UTC instant for accuracy.' }
    ],
    relatedTools: [
      '/world-cup-2026-time-converter',
      '/world-cup-2026-countdown',
      '/world-cup-2026-schedule-time-zones',
      '/utc-to-local',
      '/local-to-utc'
    ]
  },
  makeGuide('unix-timestamp-guide', 'Unix Timestamp Guide for Developers', 'Understand Unix timestamp workflows, conversion rules, and production-safe handling patterns.', 'Time Guides', 'Unix timestamp', 'ISO 8601', ['/unix-timestamp-converter', '/timestamp-to-date', '/date-to-timestamp', '/utc-to-local']),
  makeGuide('json-formatting-guide', 'JSON Formatting Guide for API Debugging', 'Learn JSON formatting, validation, minification, and readable API payload practices.', 'JSON Guides', 'JSON formatting', 'JSON minification', ['/json-formatter', '/json-viewer', '/json-minifier', '/json-to-typescript']),
  makeGuide('md5-vs-sha256', 'MD5 vs SHA256: Which Hash Should You Use?', 'Compare MD5 and SHA256 across security, compatibility, and engineering use cases.', 'Hash Guides', 'MD5', 'SHA256', ['/md5-generator', '/sha256-generator', '/sha512-generator', '/hmac-generator']),
  makeGuide('what-is-epoch-time', 'What Is Epoch Time? Practical Developer Guide', 'Understand epoch time, UTC references, and unit conversion mistakes in modern applications.', 'Time Guides', 'Epoch time', 'Unix timestamp', ['/epoch-converter', '/current-unix-timestamp', '/unix-time-in-milliseconds', '/iso8601-parser']),
  makeGuide('utc-vs-local-time', 'UTC vs Local Time: Developer Implementation Guide', 'Learn how to store UTC safely and render local time accurately across regions and DST changes.', 'Time Guides', 'UTC time', 'Local time', ['/utc-to-local', '/local-to-utc', '/utc-time-now', '/iso-8601-converter']),
  makeGuide('base64-explained', 'Base64 Explained for Developers', 'Understand Base64 encoding, decoding, limits, and safe usage in API and config workflows.', 'Encoding Guides', 'Base64', 'encryption', ['/base64-encode', '/base64-decode', '/url-encode', '/url-decode']),
  makeGuide('json-vs-yaml', 'JSON vs YAML for Developers', 'Compare JSON and YAML for APIs, configs, and CI workflows.', 'JSON Guides', 'JSON', 'YAML', ['/json-formatter', '/json-to-yaml', '/yaml-to-json', '/json-validator']),
  makeGuide('what-is-base64', 'What Is Base64? Developer Guide', 'Learn what Base64 is, when to use it, and common mistakes.', 'Encoding Guides', 'Base64', 'binary transport', ['/base64-encode', '/base64-decode', '/url-encode', '/html-encode']),
  makeGuide('how-md5-works', 'How MD5 Works', 'Understand the MD5 hash process and practical non-security use cases.', 'Security Guides', 'MD5', 'SHA256', ['/md5-generator', '/sha256-generator', '/hmac-generator', '/file-checksum']),
  makeGuide('what-is-sha256', 'What Is SHA256?', 'Understand SHA256 hashing and where it fits in modern systems.', 'Security Guides', 'SHA256', 'MD5', ['/sha256-generator', '/sha512-generator', '/hmac-generator', '/file-checksum']),
  makeGuide('json-api-best-practices', 'JSON API Best Practices', 'Design robust JSON APIs with validation and predictable schemas.', 'JSON Guides', 'JSON API design', 'schema validation', ['/json-validator', '/json-schema-generator', '/json-formatter', '/json-diff']),
  makeGuide('regex-examples', 'Regex Examples for Developers', 'Learn practical regex examples for validation and parsing.', 'Developer Guides', 'Regex', 'parser-based validation', ['/regex-tester', '/regex-cheat-sheet', '/json-path-tester', '/query-string-to-json']),
  makeGuide('iso8601-explained', 'ISO 8601 Explained', 'Understand ISO 8601 datetime format and timezone-safe usage patterns.', 'Time Guides', 'ISO 8601', 'Unix timestamp', ['/iso8601-parser', '/iso-8601-converter', '/utc-to-local', '/local-to-utc']),
  makeGuide('unix-timestamp-in-javascript', 'Unix Timestamp in JavaScript', 'Handle Unix timestamps safely in JavaScript and TypeScript codebases.', 'Time Guides', 'Unix timestamp in JavaScript', 'Date objects', ['/javascript-timestamp', '/unix-timestamp-converter', '/current-timestamp-milliseconds', '/timestamp-to-date'])
];

export function getGuideBySlug(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
