import type { UtilityKind } from '@/components/UtilityToolClient';

type UtilityPage = {
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

const commonFaq = [
  { q: 'Does this page run in browser?', a: 'Yes. DevTimeKit tools are designed for browser-side usage whenever possible.' },
  { q: 'Can I copy the output?', a: 'Yes. Use copy buttons in the tool area for quick reuse.' },
  { q: 'Is this free?', a: 'Yes, these developer utilities are free to use.' }
];

function makeCodePage(language: string, slug: string): UtilityPage {
  return {
    title: `Unix Timestamp in ${language}`,
    path: `/${slug}`,
    description: `Learn Unix timestamp usage in ${language} with examples, conversion patterns, and quick browser validation.`,
    keywords: [`unix timestamp in ${language.toLowerCase()}`, 'epoch time', `${language.toLowerCase()} timestamp`],
    kind: 'utc-to-local',
    definition: [
      `This page explains how to generate and parse Unix timestamps in ${language}.`,
      'Use it as a practical reference when converting between epoch seconds, milliseconds, and ISO datetime formats.',
      'Pair the code examples with the live converter to validate output quickly.'
    ],
    steps: ['Read the code snippet examples for your language.', 'Use the converter to test sample values.', 'Copy validated outputs into your project tests.'],
    examples: [
      `${language}: convert current datetime to Unix seconds.`,
      `${language}: parse Unix timestamp back into readable date.`,
      'Validate seconds vs milliseconds before deployment.'
    ],
    useCases: ['API integration', 'Log parsing', 'Cross-language timestamp validation'],
    faq: commonFaq
  };
}

function makeUtcPage(label: string, slug: string, toUtc: boolean): UtilityPage {
  return {
    title: label,
    path: `/${slug}`,
    description: `${label} converter with timezone explanation, quick examples, and browser-side conversion output.`,
    keywords: [slug.replace(/-/g, ' '), 'timezone converter', 'utc conversion'],
    kind: toUtc ? 'local-to-utc' : 'utc-to-local',
    definition: [
      `${label} helps convert time values while keeping timezone offsets explicit.`,
      'Use these pages when scheduling across teams in different regions.',
      'Always store UTC in backend systems and convert to local only for display.'
    ],
    steps: ['Enter a datetime value.', 'Check converted output and Unix values.', 'Copy result for docs or API usage.'],
    examples: ['Convert meeting times for distributed teams.', 'Cross-check DST-sensitive values before release.'],
    useCases: ['Team scheduling', 'Support timeline checks', 'Production debugging'],
    faq: commonFaq
  };
}

function makeJsonSeoPage(title: string, path: string, kind: UtilityKind, keywords: string[]): UtilityPage {
  return {
    title,
    path,
    description: `${title} for API debugging and data validation with copy-ready browser output.`,
    keywords,
    kind,
    definition: ['This page focuses on common JSON workflows used in API and integration debugging.'],
    steps: ['Paste JSON input.', 'Run the transformation/validation.', 'Copy output and continue your workflow.'],
    examples: ['Validate payload before API call.', 'Format response for review and documentation.'],
    useCases: ['API development', 'Data cleaning', 'Contract validation'],
    faq: commonFaq
  };
}

export const programmaticUtilityPages: Record<string, UtilityPage> = {
  '/unix-timestamp-in-javascript': makeCodePage('JavaScript', 'unix-timestamp-in-javascript'),
  '/unix-timestamp-in-python': makeCodePage('Python', 'unix-timestamp-in-python'),
  '/unix-timestamp-in-java': makeCodePage('Java', 'unix-timestamp-in-java'),
  '/unix-timestamp-in-php': makeCodePage('PHP', 'unix-timestamp-in-php'),
  '/unix-timestamp-in-go': makeCodePage('Go', 'unix-timestamp-in-go'),
  '/unix-timestamp-in-ruby': makeCodePage('Ruby', 'unix-timestamp-in-ruby'),
  '/unix-timestamp-in-csharp': makeCodePage('C#', 'unix-timestamp-in-csharp'),
  '/unix-timestamp-in-nodejs': makeCodePage('Node.js', 'unix-timestamp-in-nodejs'),
  '/convert-unix-timestamp-to-date': makeUtcPage('Convert Unix Timestamp to Date', 'convert-unix-timestamp-to-date', false),
  '/convert-date-to-unix-timestamp': makeUtcPage('Convert Date to Unix Timestamp', 'convert-date-to-unix-timestamp', true),
  '/current-unix-time': makeUtcPage('Current Unix Time', 'current-unix-time', false),
  '/current-epoch-time': makeUtcPage('Current Epoch Time', 'current-epoch-time', false),
  '/utc-to-est': makeUtcPage('UTC to EST Converter', 'utc-to-est', false),
  '/utc-to-pst': makeUtcPage('UTC to PST Converter', 'utc-to-pst', false),
  '/utc-to-cst': makeUtcPage('UTC to CST Converter', 'utc-to-cst', false),
  '/utc-to-ist': makeUtcPage('UTC to IST Converter', 'utc-to-ist', false),
  '/utc-to-gmt': makeUtcPage('UTC to GMT Converter', 'utc-to-gmt', false),
  '/utc-to-jst': makeUtcPage('UTC to JST Converter', 'utc-to-jst', false),
  '/utc-to-cet': makeUtcPage('UTC to CET Converter', 'utc-to-cet', false),
  '/utc-to-aest': makeUtcPage('UTC to AEST Converter', 'utc-to-aest', false),
  '/est-to-utc': makeUtcPage('EST to UTC Converter', 'est-to-utc', true),
  '/pst-to-utc': makeUtcPage('PST to UTC Converter', 'pst-to-utc', true),
  '/cst-to-utc': makeUtcPage('CST to UTC Converter', 'cst-to-utc', true),
  '/ist-to-utc': makeUtcPage('IST to UTC Converter', 'ist-to-utc', true),
  '/jst-to-utc': makeUtcPage('JST to UTC Converter', 'jst-to-utc', true),
  '/json-format-example': makeJsonSeoPage('JSON Format Example', '/json-format-example', 'json-formatter', ['json format example', 'json formatter example']),
  '/json-validator-online': makeJsonSeoPage('JSON Validator Online', '/json-validator-online', 'json-validator', ['json validator online', 'validate json online']),
  '/json-viewer-online': makeJsonSeoPage('JSON Viewer Online', '/json-viewer-online', 'json-viewer', ['json viewer online', 'json tree viewer']),
  '/json-pretty-print': makeJsonSeoPage('JSON Pretty Print', '/json-pretty-print', 'json-beautifier', ['json pretty print', 'pretty json']),
  '/json-minify-online': makeJsonSeoPage('JSON Minify Online', '/json-minify-online', 'json-minifier', ['json minify online', 'json minifier']),
  '/json-to-typescript-example': makeJsonSeoPage('JSON to TypeScript Example', '/json-to-typescript-example', 'json-to-typescript', ['json to typescript example']),
  '/json-to-java-example': makeJsonSeoPage('JSON to Java Example', '/json-to-java-example', 'json-to-java', ['json to java example']),
  '/json-to-python-example': makeJsonSeoPage('JSON to Python Example', '/json-to-python-example', 'json-to-python', ['json to python example']),
  '/json-to-go-example': makeJsonSeoPage('JSON to Go Example', '/json-to-go-example', 'json-to-go', ['json to go example']),
  '/world-cup-2026-timezones': makeUtcPage('World Cup 2026 Timezones', 'world-cup-2026-timezones', false),
  '/world-cup-2026-host-cities': makeUtcPage('World Cup 2026 Host Cities Time Guide', 'world-cup-2026-host-cities', false),
  '/world-cup-2026-match-time-guide': makeUtcPage('World Cup 2026 Match Time Guide', 'world-cup-2026-match-time-guide', false)
};

