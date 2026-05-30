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

function buildAiLongForm(topic: string) {
  return Array.from({ length: 8 }).map((_, index) =>
    `${topic} practical note ${index + 1}: teams often underestimate how much small prompt-structure choices affect reliability, cost, and review speed. A robust workflow separates objective, context, and output requirements so model behavior becomes testable. In production settings, this enables better QA because you can compare prompt versions, measure failure modes, and identify whether issues come from data quality, instruction ambiguity, or context overload. For AI-assisted development, consistency matters more than one-off “good answers,” so prompt design should be versioned like code and reviewed with clear acceptance criteria.`
  );
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
  ,
  {
    slug: 'what-is-a-token-in-ai',
    title: 'What Is a Token in AI?',
    description: 'Understand token basics, counting logic, prompt budgeting, and why token limits shape AI workflow quality.',
    category: 'AI Guides',
    intro: [
      'A token is the smallest unit of text many language models use internally. Tokens are not exactly words and not exactly characters. Depending on the model tokenizer, one word may become one token, multiple tokens, or sometimes a fraction-like segmentation across punctuation and spacing.',
      'When developers build AI features, token budgeting becomes a practical engineering constraint. Input tokens + output tokens + system instructions all consume the context window. If the total grows too large, responses may truncate, latency can increase, and costs may rise in hosted model environments.',
      ...buildAiLongForm('Token budgeting')
    ],
    sections: [
      {
        heading: 'Definition and intuition',
        paragraphs: [
          'Think of tokens as model-readable chunks. English text often averages around four characters per token as a rough rule, while CJK languages may produce denser tokenization behavior. These are rough heuristics, not guarantees, because each tokenizer has its own vocabulary and merge rules.',
          'Tokens include more than plain words: punctuation, line breaks, markdown symbols, code syntax, and even repeated whitespace patterns can affect token counts. This is why prompt cleanup and structure matter when trying to keep prompts within limits.',
          ...buildAiLongForm('Token estimation')
        ],
        bullets: ['Tokens are model units, not user-facing words', 'Tokenization varies by language and content type', 'Code and markdown can inflate token usage quickly']
      },
      {
        heading: 'Why token limits matter in product workflows',
        paragraphs: [
          'If your prompt pipeline is not token-aware, users may hit unexpected truncation. A long system prompt, a large conversation history, and a verbose user message can exceed the model context. Good applications reserve output room by capping input size.',
          'Token limits also influence UX. Shorter, clearer prompts often improve reliability because the model gets focused instructions. Teams that monitor token usage can tune performance, reduce cost, and improve answer consistency across production traffic.'
        ],
        bullets: ['Reserve output space before sending requests', 'Summarize older conversation context', 'Prefer explicit, compact instructions over verbose prose']
      },
      {
        heading: 'Step-by-step token budgeting',
        paragraphs: [
          'Step 1: Estimate prompt size before submission. Use approximate browser-side counters during drafting. Step 2: Reserve expected output length so the model has response room. Step 3: If needed, trim low-value context such as repetitive chat turns or unused references.',
          'Step 4: Normalize formatting. Remove duplicated blank lines and noisy markdown where not needed. Step 5: Re-check token estimate. Step 6: Log input/output token usage in your app telemetry to tune defaults over time.'
        ]
      },
      {
        heading: 'Examples',
        paragraphs: [
          'A coding assistant with a 2,000-token context budget might allocate 1,200 for user/problem context, 300 for system constraints, and 500 for output. If a request exceeds input budget, the app can summarize old turns automatically.',
          'A support chatbot can maintain quality by preserving the most recent high-signal messages and compressing older messages into a short summary block.'
        ]
      }
    ],
    faq: [
      { q: 'Is a token the same as a word?', a: 'No. Token boundaries depend on tokenizer rules and can split words or combine punctuation differently.' },
      { q: 'Can I get exact token counts without model tokenizer?', a: 'Exact counts require model-specific tokenization. Browser estimators are useful for planning but approximate.' },
      { q: 'Why do code prompts consume many tokens?', a: 'Code has symbols, indentation, and repetitive syntax that can increase token segmentation.' },
      { q: 'How do I reduce token usage quickly?', a: 'Remove redundant context, normalize whitespace, and rewrite instructions to be concise and explicit.' },
      { q: 'What tools should I use next?', a: 'Use AI Token Counter, Prompt Formatter, and AI Text Cleaner together for practical prompt budgeting.' }
    ],
    relatedTools: ['/ai-token-counter', '/prompt-formatter', '/ai-text-cleaner', '/prompt-template-generator']
  },
  {
    slug: 'how-to-write-better-chatgpt-prompts',
    title: 'How to Write Better ChatGPT Prompts',
    description: 'Practical framework for writing clearer prompts with role, task, context, constraints, and output format.',
    category: 'AI Guides',
    intro: [
      'Better prompts are less about clever phrasing and more about structure. Strong prompts reduce ambiguity, define success criteria, and constrain output shape so answers are easier to use directly in engineering workflows.',
      'A repeatable framework helps teams collaborate: Role, Task, Context, Constraints, and Output Format. This format is portable across ChatGPT, Claude, Gemini, and many internal model wrappers.',
      ...buildAiLongForm('Prompt quality')
    ],
    sections: [
      {
        heading: 'Prompt structure that scales',
        paragraphs: [
          'Role sets the perspective. Task defines what to do. Context provides relevant background. Constraints establish boundaries such as tone, length, and policy requirements. Output format ensures machine- and human-readable results.',
          'Without output format, even good answers can be hard to integrate. Asking for bullet points, JSON schema, or markdown table improves downstream reliability.',
          ...buildAiLongForm('Prompt structure')
        ],
        bullets: ['Role', 'Task', 'Context', 'Constraints', 'Output Format']
      },
      {
        heading: 'Step-by-step prompt writing',
        paragraphs: [
          'Step 1: Write one-sentence task objective. Step 2: Add required context only. Step 3: Add hard constraints such as no fabrication and cite assumptions. Step 4: Specify output format. Step 5: Test with one realistic example and refine.',
          'When refining, change one variable at a time. If result quality changes, you can identify which instruction improved or degraded the response.'
        ]
      },
      {
        heading: 'Common mistakes',
        paragraphs: [
          'Overloading prompts with too much background can dilute the objective. Vague wording like “make it better” produces unstable results. Missing constraints often leads to unnecessary verbosity or unsupported claims.',
          'Another frequent issue is hidden context assumptions. If a model is expected to follow company style guides, those rules must appear in the prompt or system policy.'
        ],
        bullets: ['Vague goal', 'Missing constraints', 'No output schema', 'Too much low-value context']
      },
      {
        heading: 'Examples and reusable patterns',
        paragraphs: [
          'For coding tasks: ask for diff-style suggestions, edge cases, and explicit risk notes. For SEO: define target audience, search intent, and structure constraints. For translation: set terminology rules and preserve domain vocabulary.',
          'For summarization: specify length cap, must-include facts, and prohibited omissions. For product planning: request assumptions, dependencies, and phased rollout risks.'
        ]
      }
    ],
    faq: [
      { q: 'Do longer prompts always work better?', a: 'No. Clear and focused prompts usually outperform verbose prompts with redundant context.' },
      { q: 'Should I include examples in prompts?', a: 'Yes. One good example can significantly improve style and format consistency.' },
      { q: 'How do I prevent hallucinations?', a: 'Add explicit constraints, require uncertainty disclosure, and limit scope to provided context.' },
      { q: 'What is the fastest way to improve prompts?', a: 'Use a fixed template and iterate with controlled changes.' },
      { q: 'Which tools are related?', a: 'Prompt Formatter, Prompt Template Generator, and AI System Prompt Builder.' }
    ],
    relatedTools: ['/prompt-formatter', '/prompt-template-generator', '/ai-system-prompt-builder', '/ai-text-cleaner']
  },
  {
    slug: 'system-prompt-vs-user-prompt',
    title: 'System Prompt vs User Prompt',
    description: 'Learn the difference between system and user prompts, control boundaries, and safer prompt architecture.',
    category: 'AI Guides',
    intro: [
      'System prompts define persistent behavior and policy boundaries. User prompts provide per-request intent. Separating these layers is critical for stable assistant behavior in production environments.',
      'Many teams mix policy and task instructions in one place, then wonder why behavior drifts. Clean separation improves control, observability, and maintainability.',
      ...buildAiLongForm('System prompt architecture')
    ],
    sections: [
      {
        heading: 'Core distinction',
        paragraphs: [
          'System prompt: global operating contract for the assistant role, allowed behaviors, tone, and output guardrails. User prompt: specific question or task for the current turn.',
          'If the system layer is weak, user input may override desired behavior too easily. If user prompts are weak, answers may remain generic despite a good system layer.',
          ...buildAiLongForm('System vs user prompt')
        ],
        bullets: ['System = policy and behavior contract', 'User = task and context for current interaction']
      },
      {
        heading: 'Architecture pattern for apps',
        paragraphs: [
          'Use a stable system prompt template versioned in code. Inject dynamic business rules via trusted middleware. Pass user content separately with clear delimiters to reduce instruction ambiguity.',
          'Log prompt envelopes for debugging while protecting sensitive data. Monitor failure patterns where user prompts conflict with system constraints.'
        ]
      },
      {
        heading: 'Step-by-step implementation',
        paragraphs: [
          'Step 1: Define role and safety baseline in system prompt. Step 2: Add product-specific rules and output schema. Step 3: Keep user prompts short and goal-oriented. Step 4: Add validation around model output before displaying to users.',
          'Step 5: Evaluate with adversarial prompts to test prompt-injection resilience. Step 6: Update system prompt versions with changelog and regression tests.'
        ]
      },
      {
        heading: 'Practical examples',
        paragraphs: [
          'Customer support bot: system prompt enforces policy tone, escalation rules, and prohibited claims. User prompt contains issue details and expected action.',
          'Coding assistant: system prompt enforces secure coding policy, output format, and honesty constraints. User prompt provides repository context and task.'
        ]
      }
    ],
    faq: [
      { q: 'Can user prompts override system prompts?', a: 'Strong system policies should remain dominant, though model behavior can still vary by implementation.' },
      { q: 'Where should safety rules live?', a: 'Safety and policy constraints belong in system-level instructions and application guardrails.' },
      { q: 'Should output format be in system or user prompt?', a: 'Critical formatting can be in system prompt; task-specific format can be in user prompt.' },
      { q: 'How do I debug prompt conflicts?', a: 'Log structured prompt layers and compare failures across controlled test cases.' },
      { q: 'Related tools?', a: 'AI System Prompt Builder, Prompt Formatter, and Prompt Template Generator.' }
    ],
    relatedTools: ['/ai-system-prompt-builder', '/prompt-formatter', '/prompt-template-generator', '/jwt-debugger']
  },
  {
    slug: 'chatgpt-token-limit-explained',
    title: 'ChatGPT Token Limit Explained',
    description: 'Understand token limits, context windows, truncation risks, and practical strategies for reliable prompt design.',
    category: 'AI Guides',
    intro: [
      'Token limits define how much text a model can process for one request. This includes system instructions, conversation history, user input, and model output. If total usage exceeds the context window, content may be truncated or rejected.',
      'For product teams, token limits are not just technical details. They directly affect cost, latency, answer completeness, and user trust.',
      ...buildAiLongForm('Token limit operations')
    ],
    sections: [
      {
        heading: 'What counts toward the limit',
        paragraphs: [
          'Everything in the prompt envelope contributes: system messages, user messages, tool descriptions, and previously retained turns. Output tokens also consume capacity, so output budget must be reserved in advance.',
          'If you send too much input, model output room shrinks. That can produce incomplete responses even when the prompt itself seems valid.',
          ...buildAiLongForm('Context window planning')
        ]
      },
      {
        heading: 'How to avoid truncation',
        paragraphs: [
          'Apply pre-send estimation with a token counter. Trim redundant context. Summarize old turns. Use retrieval to fetch only relevant passages instead of injecting full documents each time.',
          'Set hard caps in UI and backend validators. When input exceeds limits, provide actionable guidance or auto-summarization rather than failing silently.'
        ],
        bullets: ['Estimate before send', 'Reserve output budget', 'Summarize older context', 'Keep format compact']
      },
      {
        heading: 'Step-by-step workflow',
        paragraphs: [
          'Step 1: Estimate input tokens in browser. Step 2: Reserve output tokens for desired response length. Step 3: If over budget, clean and compress prompt text. Step 4: Re-estimate and send.',
          'Step 5: Log final token envelope. Step 6: Monitor truncation and tune defaults per use case.'
        ]
      },
      {
        heading: 'Examples',
        paragraphs: [
          'A long technical prompt with logs and code snippets can easily exceed limits. Converting verbose markdown to cleaner prompt text often recovers substantial budget.',
          'For iterative chats, periodically summarize conversation state to avoid runaway context growth.'
        ]
      }
    ],
    faq: [
      { q: 'Does output length affect token limits?', a: 'Yes. Output tokens consume the same context budget as input tokens.' },
      { q: 'Why does the model stop mid-answer?', a: 'Likely output budget exhaustion or context-window constraints.' },
      { q: 'Can I estimate tokens offline?', a: 'Yes. Browser-side estimators are useful for planning, but exact counts are model-specific.' },
      { q: 'How do I reduce token cost?', a: 'Shorten prompts, remove duplication, and send only relevant context.' },
      { q: 'Related tools?', a: 'AI Token Counter, AI Text Cleaner, Markdown to Prompt.' }
    ],
    relatedTools: ['/ai-token-counter', '/ai-text-cleaner', '/markdown-to-prompt', '/prompt-formatter']
  }
];

export function getGuideBySlug(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
