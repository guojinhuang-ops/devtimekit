import type { LucideIcon } from 'lucide-react';
import {
  Binary,
  Braces,
  CalendarClock,
  CheckCheck,
  Clock,
  Clock3,
  Code2,
  FileClock,
  FileDigit,
  Fingerprint,
  Globe,
  Hash,
  Link2,
  Regex,
  Shield,
  Timer,
  UserRound,
  Workflow,
  Wrench
} from 'lucide-react';
import type { LanguageCode } from '@/lib/i18n';

export type NavCategoryKey = 'time' | 'encoding' | 'json' | 'developer' | 'hash';

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

const categoryLabels: Record<LanguageCode, Record<NavCategoryKey, string>> = {
  en: { time: 'Time Tools', encoding: 'Encoding', json: 'JSON Tools', developer: 'Dev Utils', hash: 'Security' },
  zh: { time: '时间工具', encoding: '编码', json: 'JSON 工具', developer: '开发工具', hash: '安全工具' },
  'zh-TW': { time: '時間工具', encoding: '編碼', json: 'JSON 工具', developer: '開發工具', hash: '安全工具' },
  ja: { time: '時刻ツール', encoding: 'エンコード', json: 'JSON ツール', developer: '開発ユーティリティ', hash: 'セキュリティ' },
  es: { time: 'Herramientas de tiempo', encoding: 'Codificacion', json: 'Herramientas JSON', developer: 'Utilidades Dev', hash: 'Seguridad' },
  vi: { time: 'Cong cu thoi gian', encoding: 'Ma hoa', json: 'Cong cu JSON', developer: 'Tien ich Dev', hash: 'Bao mat' },
  ko: { time: '시간 도구', encoding: '인코딩', json: 'JSON 도구', developer: '개발 유틸', hash: '보안 도구' },
  ar: { time: 'ادوات الوقت', encoding: 'الترميز', json: 'ادوات JSON', developer: 'ادوات المطور', hash: 'ادوات الامان' },
  hi: { time: 'समय टूल्स', encoding: 'एन्कोडिंग', json: 'JSON टूल्स', developer: 'डेव यूटिल्स', hash: 'सिक्योरिटी' }
};

const sectionTitles: Record<LanguageCode, Record<string, string>> = {
  en: { popular: 'Popular', advanced: 'Advanced', textEncoding: 'Text Encoding', jsonTools: 'JSON Basics', utilities: 'Utilities', comingSoon: 'Coming Soon', language: 'Language Models', exchange: 'Data Exchange' },
  zh: { popular: '热门', advanced: '进阶', textEncoding: '文本编码', jsonTools: 'JSON 基础', utilities: '实用工具', comingSoon: '即将推出', language: '语言模型', exchange: '数据互转' },
  'zh-TW': { popular: '熱門', advanced: '進階', textEncoding: '文字編碼', jsonTools: 'JSON 基礎', utilities: '實用工具', comingSoon: '即將推出', language: '語言模型', exchange: '資料互轉' },
  ja: { popular: '人気', advanced: '上級', textEncoding: '文字エンコード', jsonTools: 'JSON 基本', utilities: 'ユーティリティ', comingSoon: '近日公開', language: '言語モデル', exchange: 'データ変換' },
  es: { popular: 'Popular', advanced: 'Avanzado', textEncoding: 'Codificacion', jsonTools: 'JSON Basico', utilities: 'Utilidades', comingSoon: 'Proximamente', language: 'Modelos de lenguaje', exchange: 'Intercambio de datos' },
  vi: { popular: 'Pho bien', advanced: 'Nang cao', textEncoding: 'Ma hoa van ban', jsonTools: 'JSON co ban', utilities: 'Tien ich', comingSoon: 'Sap ra mat', language: 'Mo hinh ngon ngu', exchange: 'Chuyen doi du lieu' },
  ko: { popular: '인기', advanced: '고급', textEncoding: '텍스트 인코딩', jsonTools: 'JSON 기본', utilities: '유틸리티', comingSoon: '출시 예정', language: '언어 모델', exchange: '데이터 변환' },
  ar: { popular: 'شائع', advanced: 'متقدم', textEncoding: 'ترميز النص', jsonTools: 'JSON أساسي', utilities: 'ادوات مساعدة', comingSoon: 'قريبا', language: 'نماذج اللغة', exchange: 'تحويل البيانات' },
  hi: { popular: 'लोकप्रिय', advanced: 'एडवांस्ड', textEncoding: 'टेक्स्ट एन्कोडिंग', jsonTools: 'JSON बेसिक्स', utilities: 'यूटिलिटीज', comingSoon: 'जल्द आ रहा है', language: 'लैंग्वेज मॉडल', exchange: 'डेटा रूपांतरण' }
};

const guidesLabel: Record<LanguageCode, string> = {
  en: 'Guides', zh: '指南', 'zh-TW': '指南', ja: 'ガイド', es: 'Guias', vi: 'Huong dan', ko: '가이드', ar: 'الدلائل', hi: 'गाइड्स'
};

export function getCategoryLabel(locale: LanguageCode, key: NavCategoryKey) {
  return categoryLabels[locale][key];
}

export function getGuidesLabel(locale: LanguageCode) {
  return guidesLabel[locale];
}

function t(locale: LanguageCode, key: keyof (typeof sectionTitles)['en']) {
  return sectionTitles[locale][key];
}

export function getMenuSections(locale: LanguageCode): Record<NavCategoryKey, NavSection[]> {
  return {
    time: [
      {
        title: t(locale, 'popular'),
        items: [
          { title: 'Unix Timestamp Converter', href: '/unix-timestamp-converter', description: 'Convert Unix units fast.', icon: Clock },
          { title: 'Current Unix Timestamp', href: '/current-unix-timestamp', description: 'Live seconds and UTC time.', icon: Timer },
          { title: 'Timestamp to Date', href: '/timestamp-to-date', description: 'Parse timestamp to readable date.', icon: CalendarClock },
          { title: 'Date to Timestamp', href: '/date-to-timestamp', description: 'Convert date input to Unix.', icon: FileClock }
        ]
      },
      {
        title: t(locale, 'advanced'),
        items: [
          { title: 'Epoch Converter', href: '/epoch-converter', description: 'Cross-check epoch formats.', icon: Clock3 },
          { title: 'UTC Time Now', href: '/utc-time-now', description: 'Get current UTC references.', icon: Globe },
          { title: 'ISO8601 Parser', href: '/iso8601-parser', description: 'Inspect ISO datetime values.', icon: Braces },
          { title: 'Timezone Converter', href: '/utc-to-local', description: 'UTC and local time mapping.', icon: Workflow },
          { title: 'UTC to Local', href: '/utc-to-local', description: 'Convert UTC to local time.', icon: Link2 },
          { title: 'Local to UTC', href: '/local-to-utc', description: 'Normalize local time to UTC.', icon: Hash }
        ]
      }
    ],
    encoding: [
      {
        title: t(locale, 'textEncoding'),
        items: [
          { title: 'Base64 Encode', href: '/base64-encode', description: 'Encode text safely.', icon: Binary },
          { title: 'Base64 Decode', href: '/base64-decode', description: 'Decode Base64 to plain text.', icon: CheckCheck },
          { title: 'URL Encode', href: '/url-encode', description: 'Encode URL params.', icon: Link2 },
          { title: 'URL Decode', href: '/url-decode', description: 'Decode percent-encoded text.', icon: Globe }
        ]
      },
      {
        title: t(locale, 'jsonTools'),
        items: [
          { title: 'JSON Formatter', href: '/json-formatter', description: 'Format and validate JSON.', icon: Braces },
          { title: 'JSON Validator', href: '/json-formatter', description: 'Validate JSON syntax quickly.', icon: CheckCheck }
        ]
      }
    ],
    json: [
      {
        title: t(locale, 'jsonTools'),
        items: [
          { title: 'JSON Formatter', href: '/json-formatter', description: 'Format and validate JSON.', icon: Braces },
          { title: 'JSON Viewer', href: '/json-viewer', description: 'Tree view with node search.', icon: Braces },
          { title: 'JSON Minifier', href: '/json-minifier', description: 'Compress to one line.', icon: Binary },
          { title: 'JSON Escape / Unescape', href: '/json-escape-unescape', description: 'Escape string values quickly.', icon: Link2 },
          { title: 'JSON Sort', href: '/json-sort', description: 'Sort object keys recursively.', icon: CheckCheck }
        ]
      },
      {
        title: t(locale, 'language'),
        items: [
          { title: 'JSON to TypeScript', href: '/json-to-typescript', description: 'Generate TS interfaces.', icon: Code2 },
          { title: 'JSON to Go', href: '/json-to-go', description: 'Generate Go structs.', icon: Code2 },
          { title: 'JSON to Java', href: '/json-to-java', description: 'Generate Java classes.', icon: Code2 },
          { title: 'JSON to PHP', href: '/json-to-php', description: 'Generate PHP models.', icon: Code2 },
          { title: 'JSON to C#', href: '/json-to-csharp', description: 'Generate C# classes.', icon: Code2 },
          { title: 'JSON to Python', href: '/json-to-python', description: 'Generate Python dataclasses.', icon: Code2 }
        ]
      },
      {
        title: t(locale, 'exchange'),
        items: [
          { title: 'XML to JSON', href: '/xml-to-json', description: 'Convert XML to JSON.', icon: Workflow },
          { title: 'JSON to XML', href: '/json-to-xml', description: 'Convert JSON to XML.', icon: Workflow },
          { title: 'YAML to JSON', href: '/yaml-to-json', description: 'Convert YAML to JSON.', icon: Workflow },
          { title: 'JSON to YAML', href: '/json-to-yaml', description: 'Convert JSON to YAML.', icon: Workflow },
          { title: 'Query String to JSON', href: '/query-string-to-json', description: 'Parse query params as JSON.', icon: Link2 },
          { title: 'JSON to Query String', href: '/json-to-query-string', description: 'Serialize JSON to URL params.', icon: Link2 },
          { title: 'CSV to JSON', href: '/csv-to-json', description: 'Parse CSV rows to JSON.', icon: FileClock },
          { title: 'JSON to CSV', href: '/json-to-csv', description: 'Export JSON arrays to CSV.', icon: FileClock }
        ]
      }
    ],
    developer: [
      {
        title: t(locale, 'utilities'),
        items: [
          { title: 'UUID', href: '/uuid-generator', description: 'Generate UUID v4 IDs.', icon: UserRound },
          { title: 'Regex', href: '/regex-tester', description: 'Test regex patterns fast.', icon: Regex },
          { title: 'Cron', href: '/cron-expression-generator', description: 'Build cron expressions.', icon: Wrench }
        ]
      },
      {
        title: t(locale, 'comingSoon'),
        items: [
          { title: 'JWT', href: '/jwt-decoder', description: 'Decode JWT header and payload.', icon: Shield },
          { title: 'Hash', href: '/hash-generator', description: 'Generate SHA hashes.', icon: Hash },
          { title: 'SQL', href: '/sql-formatter', description: 'Format SQL queries.', icon: Code2 }
        ]
      }
    ],
    hash: [
      {
        title: t(locale, 'popular'),
        items: [
          { title: 'MD5 Generator', href: '/md5-generator', description: 'MD5 32/16 with upper and lower output.', icon: Fingerprint },
          { title: 'SHA1 Generator', href: '/sha1-generator', description: 'Generate SHA1 digest in real time.', icon: Hash },
          { title: 'SHA256 Generator', href: '/sha256-generator', description: 'Generate SHA256 digest in real time.', icon: Shield },
          { title: 'SHA512 Generator', href: '/sha512-generator', description: 'Generate SHA512 digest in real time.', icon: Binary }
        ]
      },
      {
        title: t(locale, 'utilities'),
        items: [
          { title: 'HMAC Generator', href: '/hmac-generator', description: 'HMAC-MD5, SHA1, SHA256, and SHA512.', icon: Wrench },
          { title: 'File Checksum', href: '/file-checksum', description: 'Browser-side file checksum calculator.', icon: FileDigit }
        ]
      }
    ]
  };
}
