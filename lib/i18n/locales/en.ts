import { makeDictionary } from '@/lib/i18n/locales/factory';

export default makeDictionary({
  locale: 'en',
  site: {
    homeTitle: 'Developer Time and Encoding Tools',
    homeDescription: 'Fast browser-based tools for timestamps, UTC, JSON, Base64, URLs, regex, and cron expressions.',
    developerToolkit: 'Developer Toolkit'
  },
  nav: {
    home: 'Home',
    unixConverter: 'Unix Converter',
    guides: 'Guides',
    allTools: 'All Tools',
    toolDirectory: 'Tool Directory',
    quickAccess: 'Quick Access',
    language: 'Language'
  },
  ui: {
    openTool: 'Open Tool',
    copy: 'Copy',
    copied: 'Copied',
    input: 'Input',
    output: 'Output',
    relatedTools: 'Related Tools',
    faq: 'FAQ',
    tool: 'Tool',
    definition: 'Definition and practical context',
    steps: 'Step-by-step explanation',
    examples: 'Examples',
    useCases: 'Common use cases',
    toolsByCategory: 'Tools by Category',
    recentTools: 'Recent Tools',
    popularTools: 'Popular Tools'
  },
  home: {
    h1: 'DevTimeKit Developer Tools',
    intro: 'Convert, inspect, encode, decode, and validate common developer data formats directly in your browser.',
    sections: [
      {
        title: 'What DevTimeKit is for',
        paragraphs: [
          'DevTimeKit is a focused collection of browser-based developer tools for everyday debugging and documentation work. It covers Unix timestamps, UTC conversion, ISO 8601 parsing, JSON formatting, Base64, URL encoding, regular expressions, and cron expressions.',
          'The goal is speed and clarity: each page gives a usable tool first, then explains the concept in structured language that is easy for developers, search engines, and AI answer engines to cite.'
        ]
      },
      {
        title: 'Why browser-based tools are useful',
        paragraphs: [
          'Many development tasks are too small for a full IDE workflow but too important to do by guesswork. A timestamp unit mismatch, an invalid JSON payload, or a double-encoded URL can waste time during incident response.',
          'Running these utilities in the browser keeps the loop short. You paste a value, inspect the result, copy what you need, and return to the code, ticket, terminal, or API client.'
        ]
      }
    ],
    faq: [
      { q: 'Are these tools free?', a: 'Yes. DevTimeKit is a free browser-based tool collection.' },
      { q: 'Do the tools require a backend?', a: 'No. The interactive conversions run in the browser.' }
    ]
  },
  titles: {},
  phrases: {
    description: (title) => `${title} is a fast browser-based developer tool with copy-ready output and practical examples.`,
    definition: (title) => [
      `${title} helps developers inspect and transform a common data format without leaving the browser. It is designed for quick debugging, documentation, testing, and support workflows where a small mistake can create confusing downstream behavior.`,
      `The page combines an interactive utility with a concise explanation of the underlying concept. This makes it useful both as a working tool and as a reference page for teammates, search engines, and AI assistants that need a clear definition.`,
      `For production work, the safest pattern is to understand the input format, validate errors early, and copy only the output format that matches your API, database, or runtime environment. ${title} supports that workflow with structured sections and predictable output.`
    ],
    steps: (title) => [
      `Open ${title} and paste the value you want to inspect or convert.`,
      'Review the output and any validation message before using the result.',
      'Copy the final value into your code, API request, ticket, test fixture, or documentation.'
    ],
    examples: (title) => [
      `${title} can be used while debugging an API payload.`,
      'The copied output can become a test fixture or documentation example.',
      'Validation feedback helps identify whether the input is malformed or simply in a different format.'
    ],
    useCases: () => [
      'Debugging API requests and responses.',
      'Preparing readable examples for documentation.',
      'Checking values before adding them to tests, logs, or configuration.'
    ],
    faq: (title) => [
      { q: `Does ${title} send data to a server?`, a: 'No. The tool runs in your browser for a fast and privacy-friendly workflow.' },
      { q: `When should I use ${title}?`, a: 'Use it when you need to inspect, convert, validate, or copy a value during development.' }
    ]
  }
});
