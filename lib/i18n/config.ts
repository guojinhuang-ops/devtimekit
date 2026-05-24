export const locales = ['zh', 'zh-TW', 'ja', 'es', 'vi', 'ko', 'ar', 'hi'] as const;
export const allLanguageCodes = ['en', ...locales] as const;

export type Locale = (typeof locales)[number];
export type LanguageCode = (typeof allLanguageCodes)[number];

export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  es: 'Español',
  vi: 'Tiếng Việt',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी'
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (isLocale(parts[0])) {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

export function getLocaleFromPath(pathname: string): LanguageCode {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : 'en';
}

export function localizedPath(path: string, locale: LanguageCode): string {
  const normalized = path === '/' ? '' : path;
  return locale === 'en' ? path : `/${locale}${normalized}`;
}

