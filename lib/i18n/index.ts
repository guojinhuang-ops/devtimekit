import { allLanguageCodes, type LanguageCode, type Locale } from '@/lib/i18n/config';
import ar from '@/lib/i18n/locales/ar';
import en from '@/lib/i18n/locales/en';
import es from '@/lib/i18n/locales/es';
import hi from '@/lib/i18n/locales/hi';
import ja from '@/lib/i18n/locales/ja';
import ko from '@/lib/i18n/locales/ko';
import vi from '@/lib/i18n/locales/vi';
import zhTW from '@/lib/i18n/locales/zh-TW';
import zh from '@/lib/i18n/locales/zh';
import { absoluteUrl } from '@/lib/seo';

export { allLanguageCodes, getLocaleFromPath, languageNames, locales, localizedPath, stripLocale } from '@/lib/i18n/config';
export type { LanguageCode, Locale } from '@/lib/i18n/config';

export const dictionaries = {
  en,
  zh,
  'zh-TW': zhTW,
  ja,
  es,
  vi,
  ko,
  ar,
  hi
};

export function getDictionary(locale: LanguageCode) {
  return dictionaries[locale] ?? dictionaries.en;
}

export function buildLanguageAlternates(path: string) {
  return allLanguageCodes.reduce<Record<string, string>>((acc, locale) => {
    const localized = locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    acc[locale] = absoluteUrl(localized);
    return acc;
  }, {
    'x-default': absoluteUrl(path)
  });
}

export function localePrefix(locale: LanguageCode | Locale) {
  return locale === 'en' ? '' : `/${locale}`;
}
