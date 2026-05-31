export type PromptPage = {
  title: string;
  path: string;
  description: string;
  keywords: string[];
  prompts: string[];
  faq: Array<{ q: string; a: string }>;
  relatedGuides: string[];
};

function buildPrompts(topic: string): string[] {
  return Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;
    return [
      `Role: Senior ${topic} assistant`,
      `Task: Produce a practical output for scenario #${id}.`,
      `Context: Team needs clear, production-usable results with assumptions listed.`,
      'Constraints: Keep answer concise, include edge cases, and avoid unsupported claims.',
      'Output Format: Summary, Step-by-step, Example, Common mistakes.'
    ].join('\n');
  });
}

const defaultFaq = [
  { q: 'Are these prompts free to use?', a: 'Yes. You can copy, modify, and reuse these templates in your own workflows.' },
  { q: 'Will these prompts work in all AI tools?', a: 'Most should work with ChatGPT, Claude, Gemini, and similar LLM chat tools.' },
  { q: 'Should I include my own context?', a: 'Yes. Add your domain, constraints, and output format for best results.' },
  { q: 'Do prompts guarantee perfect output?', a: 'No. Prompts improve quality but you should still review and validate responses.' },
  { q: 'Can I use these prompts for production tasks?', a: 'Yes, but always add human review, especially for sensitive workflows.' }
];

export const promptPages: Record<string, PromptPage> = {
  '/chatgpt-prompts-for-developers': {
    title: 'ChatGPT Prompts for Developers',
    path: '/chatgpt-prompts-for-developers',
    description: '50+ ChatGPT prompts for developers covering debugging, refactoring, code review, testing, and documentation workflows.',
    keywords: ['chatgpt prompts for developers', 'developer prompts', 'coding prompts'],
    prompts: buildPrompts('software development'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'chatgpt-token-limit-explained', 'system-prompt-vs-user-prompt']
  },
  '/chatgpt-prompts-for-seo': {
    title: 'ChatGPT Prompts for SEO',
    path: '/chatgpt-prompts-for-seo',
    description: '50+ ChatGPT prompts for SEO research, content briefs, technical SEO checks, and long-tail keyword workflows.',
    keywords: ['chatgpt prompts for seo', 'seo prompts', 'ai seo prompts'],
    prompts: buildPrompts('SEO strategy'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'what-is-a-token-in-ai', 'chatgpt-token-limit-explained']
  },
  '/chatgpt-prompts-for-students': {
    title: 'ChatGPT Prompts for Students',
    path: '/chatgpt-prompts-for-students',
    description: '50+ ChatGPT prompts for students for note summaries, study plans, concept explanations, and revision practice.',
    keywords: ['chatgpt prompts for students', 'study prompts', 'ai prompts for learning'],
    prompts: buildPrompts('learning and study support'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'system-prompt-vs-user-prompt', 'what-is-a-token-in-ai']
  },
  '/chatgpt-prompts-for-programming': {
    title: 'ChatGPT Prompts for Programming',
    path: '/chatgpt-prompts-for-programming',
    description: '50+ ChatGPT prompts for programming tasks including algorithms, API integration, testing, and bug fixing.',
    keywords: ['chatgpt prompts for programming', 'programming prompts', 'ai coding prompts'],
    prompts: buildPrompts('programming'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'system-prompt-vs-user-prompt', 'chatgpt-token-limit-explained']
  },
  '/claude-prompts-for-coding': {
    title: 'Claude Prompts for Coding',
    path: '/claude-prompts-for-coding',
    description: '50+ Claude prompts for coding workflows including design, implementation, debugging, and documentation.',
    keywords: ['claude prompts for coding', 'claude coding prompts', 'ai prompt library'],
    prompts: buildPrompts('Claude coding'),
    faq: defaultFaq,
    relatedGuides: ['system-prompt-vs-user-prompt', 'how-to-write-better-chatgpt-prompts', 'what-is-a-token-in-ai']
  },
  '/gemini-prompts-for-coding': {
    title: 'Gemini Prompts for Coding',
    path: '/gemini-prompts-for-coding',
    description: '50+ Gemini prompts for coding tasks, code reasoning, architecture planning, and review workflows.',
    keywords: ['gemini prompts for coding', 'gemini coding prompts', 'ai coding prompts'],
    prompts: buildPrompts('Gemini coding'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'system-prompt-vs-user-prompt', 'chatgpt-token-limit-explained']
  },
  '/ai-prompt-library': {
    title: 'AI Prompt Library',
    path: '/ai-prompt-library',
    description: 'AI prompt library with 50+ reusable templates for coding, SEO, content, planning, and analysis.',
    keywords: ['ai prompt library', 'prompt templates', 'ai prompt generator'],
    prompts: buildPrompts('AI prompt engineering'),
    faq: defaultFaq,
    relatedGuides: ['how-to-write-better-chatgpt-prompts', 'what-is-a-token-in-ai', 'system-prompt-vs-user-prompt']
  }
};

