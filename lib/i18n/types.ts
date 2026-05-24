import type { LanguageCode } from '@/lib/i18n/config';

export type I18nToolCopy = {
  title: string;
  summary: string;
  definition: string[];
  steps: string[];
  examples: string[];
  useCases: string[];
  faq: Array<{ q: string; a: string }>;
};

export type I18nDictionary = {
  locale: LanguageCode;
  dir: 'ltr' | 'rtl';
  site: {
    homeTitle: string;
    homeDescription: string;
    developerToolkit: string;
  };
  nav: {
    home: string;
    unixConverter: string;
    guides: string;
    allTools: string;
    toolDirectory: string;
    quickAccess: string;
    language: string;
  };
  ui: {
    openTool: string;
    copy: string;
    copied: string;
    input: string;
    output: string;
    relatedTools: string;
    faq: string;
    tool: string;
    definition: string;
    steps: string;
    examples: string;
    useCases: string;
    toolsByCategory: string;
    recentTools: string;
    popularTools: string;
  };
  home: {
    h1: string;
    intro: string;
    sections: Array<{ title: string; paragraphs: string[] }>;
    faq: Array<{ q: string; a: string }>;
  };
  tools: Record<string, I18nToolCopy>;
};
