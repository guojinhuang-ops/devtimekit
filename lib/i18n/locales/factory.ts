import { tools } from '@/lib/tools';
import type { LanguageCode } from '@/lib/i18n/config';
import type { I18nDictionary, I18nToolCopy } from '@/lib/i18n/types';

type LocaleSeed = {
  locale: LanguageCode;
  dir?: 'ltr' | 'rtl';
  site: I18nDictionary['site'];
  nav: I18nDictionary['nav'];
  ui: I18nDictionary['ui'];
  home: I18nDictionary['home'];
  titles: Record<string, string>;
  phrases: {
    description: (title: string) => string;
    definition: (title: string) => string[];
    steps: (title: string) => string[];
    examples: (title: string) => string[];
    useCases: (title: string) => string[];
    faq: (title: string) => Array<{ q: string; a: string }>;
  };
};

const builtInTitles: Record<string, Record<string, string>> = {
  zh: {
    '/unix-timestamp-converter': 'Unix 时间戳转换器',
    '/current-unix-timestamp': '当前 Unix 时间戳',
    '/current-timestamp-milliseconds': '当前毫秒级时间戳',
    '/timestamp-to-date': '时间戳转日期',
    '/date-to-timestamp': '日期转时间戳',
    '/about-unix-time': '关于 Unix 时间',
    '/epoch-converter': 'Epoch 转换器',
    '/utc-time-now': '当前 UTC 时间',
    '/iso-8601-converter': 'ISO 8601 转换器',
    '/javascript-timestamp': 'JavaScript 时间戳',
    '/python-timestamp': 'Python 时间戳',
    '/mysql-unix-timestamp': 'MySQL Unix 时间戳',
    '/unix-time-in-milliseconds': '毫秒级 Unix 时间',
    '/timestamp-cheatsheet': '时间戳速查表'
  },
  'zh-TW': {
    '/unix-timestamp-converter': 'Unix 時間戳轉換器',
    '/current-unix-timestamp': '目前 Unix 時間戳',
    '/current-timestamp-milliseconds': '目前毫秒時間戳',
    '/timestamp-to-date': '時間戳轉日期',
    '/date-to-timestamp': '日期轉時間戳',
    '/about-unix-time': '關於 Unix Time',
    '/epoch-converter': 'Epoch 轉換器',
    '/utc-time-now': '目前 UTC 時間',
    '/iso-8601-converter': 'ISO 8601 轉換器',
    '/javascript-timestamp': 'JavaScript 時間戳',
    '/python-timestamp': 'Python 時間戳',
    '/mysql-unix-timestamp': 'MySQL Unix 時間戳',
    '/unix-time-in-milliseconds': '毫秒級 Unix 時間',
    '/timestamp-cheatsheet': '時間戳速查表'
  },
  ja: {
    '/unix-timestamp-converter': 'Unix タイムスタンプ変換',
    '/current-unix-timestamp': '現在の Unix タイムスタンプ',
    '/current-timestamp-milliseconds': '現在のミリ秒タイムスタンプ',
    '/timestamp-to-date': 'タイムスタンプから日付へ',
    '/date-to-timestamp': '日付からタイムスタンプへ',
    '/about-unix-time': 'Unix 時刻について',
    '/epoch-converter': 'Epoch 変換',
    '/utc-time-now': '現在の UTC 時刻',
    '/iso-8601-converter': 'ISO 8601 変換',
    '/javascript-timestamp': 'JavaScript タイムスタンプ',
    '/python-timestamp': 'Python タイムスタンプ',
    '/mysql-unix-timestamp': 'MySQL Unix タイムスタンプ',
    '/unix-time-in-milliseconds': 'ミリ秒 Unix 時刻',
    '/timestamp-cheatsheet': 'タイムスタンプ早見表'
  },
  es: {
    '/unix-timestamp-converter': 'Conversor de timestamp Unix',
    '/current-unix-timestamp': 'Timestamp Unix actual',
    '/current-timestamp-milliseconds': 'Timestamp actual en milisegundos',
    '/timestamp-to-date': 'Timestamp a fecha',
    '/date-to-timestamp': 'Fecha a timestamp',
    '/about-unix-time': 'Acerca del tiempo Unix',
    '/epoch-converter': 'Conversor Epoch',
    '/utc-time-now': 'Hora UTC actual',
    '/iso-8601-converter': 'Conversor ISO 8601',
    '/javascript-timestamp': 'Timestamp en JavaScript',
    '/python-timestamp': 'Timestamp en Python',
    '/mysql-unix-timestamp': 'Timestamp Unix en MySQL',
    '/unix-time-in-milliseconds': 'Tiempo Unix en milisegundos',
    '/timestamp-cheatsheet': 'Guia rapida de timestamps'
  },
  vi: {
    '/unix-timestamp-converter': 'Chuyen doi Unix timestamp',
    '/current-unix-timestamp': 'Unix timestamp hien tai',
    '/current-timestamp-milliseconds': 'Timestamp mili giay hien tai',
    '/timestamp-to-date': 'Timestamp sang ngay gio',
    '/date-to-timestamp': 'Ngay gio sang timestamp',
    '/about-unix-time': 'Gioi thieu Unix time',
    '/epoch-converter': 'Chuyen doi Epoch',
    '/utc-time-now': 'Gio UTC hien tai',
    '/iso-8601-converter': 'Chuyen doi ISO 8601',
    '/javascript-timestamp': 'JavaScript timestamp',
    '/python-timestamp': 'Python timestamp',
    '/mysql-unix-timestamp': 'MySQL Unix timestamp',
    '/unix-time-in-milliseconds': 'Unix time theo mili giay',
    '/timestamp-cheatsheet': 'Bang tra timestamp'
  },
  ko: {
    '/unix-timestamp-converter': 'Unix 타임스탬프 변환기',
    '/current-unix-timestamp': '현재 Unix 타임스탬프',
    '/current-timestamp-milliseconds': '현재 밀리초 타임스탬프',
    '/timestamp-to-date': '타임스탬프를 날짜로 변환',
    '/date-to-timestamp': '날짜를 타임스탬프로 변환',
    '/about-unix-time': 'Unix 시간 소개',
    '/epoch-converter': 'Epoch 변환기',
    '/utc-time-now': '현재 UTC 시간',
    '/iso-8601-converter': 'ISO 8601 변환기',
    '/javascript-timestamp': 'JavaScript 타임스탬프',
    '/python-timestamp': 'Python 타임스탬프',
    '/mysql-unix-timestamp': 'MySQL Unix 타임스탬프',
    '/unix-time-in-milliseconds': '밀리초 Unix 시간',
    '/timestamp-cheatsheet': '타임스탬프 치트시트'
  },
  ar: {
    '/unix-timestamp-converter': 'محول طابع Unix الزمني',
    '/current-unix-timestamp': 'طابع Unix الزمني الحالي',
    '/current-timestamp-milliseconds': 'الطابع الزمني الحالي بالميلي ثانية',
    '/timestamp-to-date': 'تحويل الطابع الزمني الى تاريخ',
    '/date-to-timestamp': 'تحويل التاريخ الى طابع زمني',
    '/about-unix-time': 'حول وقت Unix',
    '/epoch-converter': 'محول Epoch',
    '/utc-time-now': 'وقت UTC الحالي',
    '/iso-8601-converter': 'محول ISO 8601',
    '/javascript-timestamp': 'طابع JavaScript الزمني',
    '/python-timestamp': 'طابع Python الزمني',
    '/mysql-unix-timestamp': 'طابع Unix في MySQL',
    '/unix-time-in-milliseconds': 'وقت Unix بالميلي ثانية',
    '/timestamp-cheatsheet': 'مرجع سريع للطوابع الزمنية'
  },
  hi: {
    '/unix-timestamp-converter': 'Unix Timestamp Converter',
    '/current-unix-timestamp': 'वर्तमान Unix Timestamp',
    '/current-timestamp-milliseconds': 'वर्तमान Milliseconds Timestamp',
    '/timestamp-to-date': 'Timestamp से Date',
    '/date-to-timestamp': 'Date से Timestamp',
    '/about-unix-time': 'Unix Time के बारे में',
    '/epoch-converter': 'Epoch Converter',
    '/utc-time-now': 'वर्तमान UTC Time',
    '/iso-8601-converter': 'ISO 8601 Converter',
    '/javascript-timestamp': 'JavaScript Timestamp',
    '/python-timestamp': 'Python Timestamp',
    '/mysql-unix-timestamp': 'MySQL Unix Timestamp',
    '/unix-time-in-milliseconds': 'Milliseconds में Unix Time',
    '/timestamp-cheatsheet': 'Timestamp Cheatsheet'
  }
};

export function makeDictionary(seed: LocaleSeed): I18nDictionary {
  const localizedTools = tools.reduce<Record<string, I18nToolCopy>>((acc, tool) => {
    const title = seed.titles[tool.href] ?? builtInTitles[seed.locale]?.[tool.href] ?? tool.title;
    acc[tool.href] = {
      title,
      summary: seed.phrases.description(title),
      definition: seed.phrases.definition(title),
      steps: seed.phrases.steps(title),
      examples: seed.phrases.examples(title),
      useCases: seed.phrases.useCases(title),
      faq: seed.phrases.faq(title)
    };
    return acc;
  }, {});

  return {
    locale: seed.locale,
    dir: seed.dir ?? 'ltr',
    site: seed.site,
    nav: seed.nav,
    ui: seed.ui,
    home: seed.home,
    tools: localizedTools
  };
}
