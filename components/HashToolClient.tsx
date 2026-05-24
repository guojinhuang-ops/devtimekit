'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import CryptoJS from 'crypto-js';
import CopyButton from '@/components/CopyButton';
import { getLocaleFromPath } from '@/lib/i18n';

type HashKind =
  | 'md5-generator'
  | 'sha1-generator'
  | 'sha256-generator'
  | 'sha512-generator'
  | 'hmac-generator'
  | 'file-checksum';

const sampleText = 'DevTimeKit hash test 中文 😀';

const labels: Record<string, { input: string; output: string; key: string; algorithm: string; clear: string; example: string; chars: string; bytes: string; file: string; noUpload: string; size: string; processing: string }> = {
  en: { input: 'Input', output: 'Output', key: 'Secret key', algorithm: 'Algorithm', clear: 'Clear', example: 'Example', chars: 'Characters', bytes: 'UTF-8 bytes', file: 'Choose file', noUpload: 'File is processed in your browser only.', size: 'File size', processing: 'Computing checksums...' },
  zh: { input: '输入', output: '输出', key: '密钥', algorithm: '算法', clear: '清空', example: '示例', chars: '字符数', bytes: 'UTF-8 字节', file: '选择文件', noUpload: '文件仅在浏览器本地处理。', size: '文件大小', processing: '正在计算校验值...' },
  'zh-TW': { input: '輸入', output: '輸出', key: '密鑰', algorithm: '演算法', clear: '清空', example: '範例', chars: '字元數', bytes: 'UTF-8 位元組', file: '選擇檔案', noUpload: '檔案僅在瀏覽器端處理。', size: '檔案大小', processing: '正在計算校驗值...' },
  ja: { input: '入力', output: '出力', key: 'シークレットキー', algorithm: 'アルゴリズム', clear: 'クリア', example: '例', chars: '文字数', bytes: 'UTF-8 バイト', file: 'ファイルを選択', noUpload: 'ファイルはブラウザ内のみで処理されます。', size: 'ファイルサイズ', processing: 'チェックサムを計算中...' },
  es: { input: 'Entrada', output: 'Salida', key: 'Clave secreta', algorithm: 'Algoritmo', clear: 'Limpiar', example: 'Ejemplo', chars: 'Caracteres', bytes: 'Bytes UTF-8', file: 'Elegir archivo', noUpload: 'El archivo se procesa solo en tu navegador.', size: 'Tamano del archivo', processing: 'Calculando checksums...' },
  vi: { input: 'Du lieu vao', output: 'Ket qua', key: 'Khoa bi mat', algorithm: 'Thuat toan', clear: 'Xoa', example: 'Vi du', chars: 'So ky tu', bytes: 'Byte UTF-8', file: 'Chon tep', noUpload: 'Tep chi duoc xu ly trong trinh duyet.', size: 'Kich thuoc tep', processing: 'Dang tinh checksum...' },
  ko: { input: '입력', output: '출력', key: '비밀 키', algorithm: '알고리즘', clear: '지우기', example: '예시', chars: '문자 수', bytes: 'UTF-8 바이트', file: '파일 선택', noUpload: '파일은 브라우저에서만 처리됩니다.', size: '파일 크기', processing: '체크섬 계산 중...' },
  ar: { input: 'الادخال', output: 'الناتج', key: 'المفتاح السري', algorithm: 'الخوارزمية', clear: 'مسح', example: 'مثال', chars: 'عدد الاحرف', bytes: 'بايت UTF-8', file: 'اختر ملف', noUpload: 'تتم معالجة الملف داخل المتصفح فقط.', size: 'حجم الملف', processing: 'جار حساب القيم...' },
  hi: { input: 'इनपुट', output: 'आउटपुट', key: 'सीक्रेट की', algorithm: 'एल्गोरिद्म', clear: 'साफ करें', example: 'उदाहरण', chars: 'अक्षर', bytes: 'UTF-8 बाइट', file: 'फाइल चुनें', noUpload: 'फाइल केवल ब्राउजर में प्रोसेस होती है।', size: 'फाइल आकार', processing: 'चेकसम बन रहा है...' }
};

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export default function HashToolClient({ kind }: { kind: HashKind }) {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPath(pathname);
  const copy = labels[locale] ?? labels.en;
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [hmacAlgorithm, setHmacAlgorithm] = useState<'HMAC-MD5' | 'HMAC-SHA1' | 'HMAC-SHA256' | 'HMAC-SHA512'>('HMAC-SHA256');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileHashes, setFileHashes] = useState<{ md5: string; sha1: string; sha256: string; sha512: string } | null>(null);
  const [processingFile, setProcessingFile] = useState(false);

  const utf8Bytes = useMemo(() => new TextEncoder().encode(input).length, [input]);

  const md5 = useMemo(() => {
    if (!input) return null;
    const lower32 = CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
    const upper32 = lower32.toUpperCase();
    const lower16 = lower32.slice(8, 24);
    const upper16 = upper32.slice(8, 24);
    return { lower32, upper32, lower16, upper16 };
  }, [input]);

  const sha = useMemo(() => {
    if (!input) return '';
    if (kind === 'sha1-generator') return CryptoJS.SHA1(input).toString(CryptoJS.enc.Hex);
    if (kind === 'sha256-generator') return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    if (kind === 'sha512-generator') return CryptoJS.SHA512(input).toString(CryptoJS.enc.Hex);
    return '';
  }, [input, kind]);

  const hmacOutput = useMemo(() => {
    if (kind !== 'hmac-generator' || !input || !key) return '';
    if (hmacAlgorithm === 'HMAC-MD5') return CryptoJS.HmacMD5(input, key).toString(CryptoJS.enc.Hex);
    if (hmacAlgorithm === 'HMAC-SHA1') return CryptoJS.HmacSHA1(input, key).toString(CryptoJS.enc.Hex);
    if (hmacAlgorithm === 'HMAC-SHA256') return CryptoJS.HmacSHA256(input, key).toString(CryptoJS.enc.Hex);
    return CryptoJS.HmacSHA512(input, key).toString(CryptoJS.enc.Hex);
  }, [hmacAlgorithm, input, key, kind]);

  async function onPickFile(file: File) {
    setProcessingFile(true);
    setFileName(file.name);
    setFileSize(file.size);
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as unknown as number[]);
    const [sha1, sha256, sha512] = await Promise.all([
      crypto.subtle.digest('SHA-1', arrayBuffer).then(toHex),
      crypto.subtle.digest('SHA-256', arrayBuffer).then(toHex),
      crypto.subtle.digest('SHA-512', arrayBuffer).then(toHex)
    ]);
    const md5Hex = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
    setFileHashes({ md5: md5Hex, sha1, sha256, sha512 });
    setProcessingFile(false);
  }

  function clearAll() {
    setInput('');
    setKey('');
    setFileHashes(null);
    setFileName('');
    setFileSize(0);
  }

  return (
    <section className="card" aria-label="Hash Tool">
      <div className="space-y-4">
        {kind !== 'file-checksum' ? (
          <>
            <label className="block text-sm font-medium">
              {copy.input}
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="mt-2 min-h-40 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-800"
                placeholder="Enter text"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setInput(sampleText)} className="rounded-md border px-3 py-1.5 text-xs">{copy.example}</button>
              <button type="button" onClick={clearAll} className="rounded-md border px-3 py-1.5 text-xs">{copy.clear}</button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
                <p>{copy.chars}: {input.length}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
                <p>{copy.bytes}: {utf8Bytes}</p>
              </div>
            </div>
          </>
        ) : null}

        {kind === 'md5-generator' && md5 ? (
          <div className="space-y-3">
            {[
              ['MD5 32 Lowercase', md5.lower32],
              ['MD5 32 Uppercase', md5.upper32],
              ['MD5 16 Lowercase', md5.lower16],
              ['MD5 16 Uppercase', md5.upper16]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold">{label}</p>
                  <CopyButton value={value} />
                </div>
                <pre className="whitespace-pre-wrap break-words font-mono text-sm">{value}</pre>
              </div>
            ))}
          </div>
        ) : null}

        {['sha1-generator', 'sha256-generator', 'sha512-generator'].includes(kind) && sha ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold">{copy.output}</p>
              <CopyButton value={sha} />
            </div>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm">{sha}</pre>
          </div>
        ) : null}

        {kind === 'hmac-generator' ? (
          <>
            <label className="block text-sm font-medium">
              {copy.key}
              <input value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
            </label>
            <label className="block text-sm font-medium">
              {copy.algorithm}
              <select value={hmacAlgorithm} onChange={(event) => setHmacAlgorithm(event.target.value as typeof hmacAlgorithm)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option>HMAC-MD5</option>
                <option>HMAC-SHA1</option>
                <option>HMAC-SHA256</option>
                <option>HMAC-SHA512</option>
              </select>
            </label>
            {hmacOutput ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold">HMAC</p>
                  <CopyButton value={hmacOutput} />
                </div>
                <pre className="whitespace-pre-wrap break-words font-mono text-sm">{hmacOutput}</pre>
              </div>
            ) : null}
          </>
        ) : null}

        {kind === 'file-checksum' ? (
          <>
            <label className="block text-sm font-medium">
              {copy.file}
              <input
                type="file"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (file) await onPickFile(file);
                }}
              />
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">{copy.noUpload}</p>
            {fileName ? <p className="text-sm">{fileName} | {copy.size}: {fileSize} bytes</p> : null}
            {processingFile ? <p className="text-sm text-slate-500">{copy.processing}</p> : null}
            {fileHashes ? (
              <div className="space-y-3">
                {[
                  ['MD5', fileHashes.md5],
                  ['SHA1', fileHashes.sha1],
                  ['SHA256', fileHashes.sha256],
                  ['SHA512', fileHashes.sha512]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold">{label}</p>
                      <CopyButton value={value} />
                    </div>
                    <pre className="whitespace-pre-wrap break-words font-mono text-sm">{value}</pre>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}

