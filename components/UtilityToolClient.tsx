'use client';

import { useMemo, useState } from 'react';
import yaml from 'js-yaml';
import CopyButton from '@/components/CopyButton';
import HashToolClient from '@/components/HashToolClient';
import ValueRow from '@/components/ValueRow';

export type UtilityKind =
  | 'utc-to-local'
  | 'local-to-utc'
  | 'iso8601-parser'
  | 'json-formatter'
  | 'json-viewer'
  | 'json-minifier'
  | 'json-escape-unescape'
  | 'json-sort'
  | 'json-to-typescript'
  | 'json-to-go'
  | 'json-to-java'
  | 'json-to-php'
  | 'json-to-csharp'
  | 'json-to-python'
  | 'xml-to-json'
  | 'json-to-xml'
  | 'yaml-to-json'
  | 'json-to-yaml'
  | 'query-string-to-json'
  | 'json-to-query-string'
  | 'csv-to-json'
  | 'json-to-csv'
  | 'base64-encode'
  | 'base64-decode'
  | 'url-encode'
  | 'url-decode'
  | 'regex-tester'
  | 'cron-expression-generator'
  | 'uuid-generator'
  | 'jwt-decoder'
  | 'hash-generator'
  | 'sql-formatter'
  | 'md5-generator'
  | 'sha1-generator'
  | 'sha256-generator'
  | 'sha512-generator'
  | 'hmac-generator'
  | 'file-checksum';

type ToolResult = {
  error: string;
  output: string;
  rows: Array<{ label: string; value: string }>;
  highlighted?: string;
};

const cronPresets = [
  { label: 'Every minute', value: '* * * * *', meaning: 'Runs once every minute.' },
  { label: 'Every hour', value: '0 * * * *', meaning: 'Runs at minute 0 of every hour.' },
  { label: 'Every day at midnight', value: '0 0 * * *', meaning: 'Runs daily at 00:00.' },
  { label: 'Every Monday at 09:00', value: '0 9 * * 1', meaning: 'Runs every Monday at 09:00.' },
  { label: 'First day of month', value: '0 0 1 * *', meaning: 'Runs at midnight on day 1 of each month.' }
];

function encodeBase64(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value: string) {
  return decodeURIComponent(escape(atob(value)));
}

function parseDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function detectJsonError(input: string, message: string) {
  const match = message.match(/position\s+(\d+)/i);
  if (!match) return message;
  const position = Number(match[1]);
  const lines = input.slice(0, position).split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return `Line ${line}, Column ${column}: ${message}`;
}

function syntaxHighlightJson(json: string) {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(
    /(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\\"])*\"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-sky-600 dark:text-sky-300';
      if (/^\".*\":$/.test(match)) cls = 'text-rose-600 dark:text-rose-300';
      else if (/^\"/.test(match)) cls = 'text-emerald-600 dark:text-emerald-300';
      else if (/true|false/.test(match)) cls = 'text-violet-600 dark:text-violet-300';
      else if (/null/.test(match)) cls = 'text-slate-500 dark:text-slate-400';
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function sortJsonValue(value: unknown, desc: boolean): unknown {
  if (Array.isArray(value)) return value.map((item) => sortJsonValue(item, desc));
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => (desc ? b.localeCompare(a) : a.localeCompare(b)))
      .map(([k, v]) => [k, sortJsonValue(v, desc)]);
    return Object.fromEntries(entries);
  }
  return value;
}

function toTsType(name: string, value: unknown, optional = false): string {
  const opt = optional ? '?' : '';
  if (Array.isArray(value)) {
    const subtype = value.length ? toTsType(name, value[0]).replace(/^\w+\s*/, '') : 'unknown';
    return `${name}${opt}: ${subtype}[];`;
  }
  if (value === null) return `${name}${opt}: null;`;
  const t = typeof value;
  if (t === 'string' || t === 'number' || t === 'boolean') return `${name}${opt}: ${t};`;
  if (t === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).map(([k, v]) => toTsType(k, v, v === null));
    return `${name}${opt}: {\n${entries.map((line) => `  ${line}`).join('\n')}\n};`;
  }
  return `${name}${opt}: unknown;`;
}

function jsonToTypeScript(name: string, value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return `export type ${name} = ${JSON.stringify(value)};`;
  }
  const fields = Object.entries(value as Record<string, unknown>).map(([k, v]) => `  ${toTsType(k, v, v === null)}`);
  return `export interface ${name} {\n${fields.join('\n')}\n}`;
}

function goType(value: unknown): string {
  if (Array.isArray(value)) return `[]${value.length ? goType(value[0]) : 'interface{}'}`;
  if (value === null) return 'interface{}';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float64';
  if (typeof value === 'boolean') return 'bool';
  if (typeof value === 'object') return 'struct';
  return 'interface{}';
}

function jsonToGoStruct(name: string, value: unknown): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `type ${name} ${goType(value)}`;
  const lines: string[] = [];
  const nested: string[] = [];
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    const field = key.charAt(0).toUpperCase() + key.slice(1).replace(/[^a-zA-Z0-9]/g, '');
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const nestedName = `${name}${field}`;
      nested.push(jsonToGoStruct(nestedName, val));
      lines.push(`  ${field} ${nestedName} \`json:"${key}"\``);
    } else {
      lines.push(`  ${field} ${goType(val)} \`json:"${key}"\``);
    }
  }
  return [...nested, `type ${name} struct {\n${lines.join('\n')}\n}`].join('\n\n');
}

function javaType(value: unknown): string {
  if (Array.isArray(value)) return `List<${value.length ? javaType(value[0]) : 'Object'}>`;
  if (value === null) return 'Object';
  if (typeof value === 'string') return 'String';
  if (typeof value === 'number') return Number.isInteger(value) ? 'Long' : 'Double';
  if (typeof value === 'boolean') return 'Boolean';
  return 'Object';
}

function jsonToJavaClass(name: string, value: unknown): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `public class ${name} {}`;
  const fields = Object.entries(value as Record<string, unknown>)
    .map(([key, val]) => `  private ${javaType(val)} ${key.replace(/[^a-zA-Z0-9_]/g, '_')};`)
    .join('\n');
  return `public class ${name} {\n${fields}\n}`;
}

function jsonToPython(name: string, value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `from typing import Any\n\n${name}: Any = ${JSON.stringify(value)}`;
  const fields = Object.entries(value as Record<string, unknown>)
    .map(([k, v]) => `    ${k}: ${typeof v === 'number' ? 'float' : typeof v === 'boolean' ? 'bool' : typeof v === 'string' ? 'str' : 'dict'}`)
    .join('\n');
  return `from dataclasses import dataclass\n\n@dataclass\nclass ${name}:\n${fields || '    pass'}`;
}

function jsonToPhpClass(name: string, value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `class ${name} {}`;
  const fields = Object.keys(value as Record<string, unknown>)
    .map((k) => `    public $${k.replace(/[^a-zA-Z0-9_]/g, '_')};`)
    .join('\n');
  return `class ${name} {\n${fields}\n}`;
}

function jsonToCSharpClass(name: string, value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `public class ${name} { }`;
  const typeOf = (v: unknown) => {
    if (Array.isArray(v)) return 'List<object>';
    if (typeof v === 'string') return 'string';
    if (typeof v === 'number') return Number.isInteger(v) ? 'long' : 'double';
    if (typeof v === 'boolean') return 'bool';
    if (v && typeof v === 'object') return 'object';
    return 'object';
  };
  const fields = Object.entries(value as Record<string, unknown>)
    .map(([k, v]) => `    public ${typeOf(v)} ${k.charAt(0).toUpperCase() + k.slice(1)} { get; set; }`)
    .join('\n');
  return `public class ${name}\n{\n${fields}\n}`;
}

function xmlToJson(xml: string): unknown {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const parserError = doc.querySelector('parsererror');
  if (parserError) throw new Error('Invalid XML input.');

  const walk = (node: Element): unknown => {
    const children = Array.from(node.children);
    if (!children.length) return node.textContent ?? '';
    const map: Record<string, unknown> = {};
    for (const child of children) {
      const val = walk(child);
      if (map[child.tagName] === undefined) map[child.tagName] = val;
      else if (Array.isArray(map[child.tagName])) (map[child.tagName] as unknown[]).push(val);
      else map[child.tagName] = [map[child.tagName], val];
    }
    return map;
  };

  const root = doc.documentElement;
  return { [root.tagName]: walk(root) };
}

function jsonToXml(value: unknown, root = 'root'): string {
  const walk = (key: string, val: unknown): string => {
    if (Array.isArray(val)) return val.map((item) => walk(key, item)).join('');
    if (val && typeof val === 'object') {
      const inner = Object.entries(val as Record<string, unknown>).map(([k, v]) => walk(k, v)).join('');
      return `<${key}>${inner}</${key}>`;
    }
    return `<${key}>${String(val ?? '')}</${key}>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n${walk(root, value)}`;
}

function parseQueryToJson(query: string) {
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  const result: Record<string, unknown> = {};
  params.forEach((value, key) => {
    if (result[key] === undefined) result[key] = value;
    else if (Array.isArray(result[key])) (result[key] as string[]).push(value);
    else result[key] = [result[key], value];
  });
  return result;
}

function jsonToQuery(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Input must be a JSON object.');
  const params = new URLSearchParams();
  Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
    if (Array.isArray(val)) val.forEach((item) => params.append(key, String(item)));
    else params.append(key, String(val ?? ''));
  });
  return params.toString();
}

function parseCsv(text: string, delimiter: string) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(delimiter).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(delimiter);
    return Object.fromEntries(headers.map((header, idx) => [header, cols[idx] ?? '']));
  });
}

function jsonToCsv(value: unknown) {
  if (!Array.isArray(value) || !value.length || typeof value[0] !== 'object') {
    throw new Error('Input must be a JSON array of objects.');
  }
  const rows = value as Array<Record<string, unknown>>;
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const head = headers.join(',');
  const body = rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')).join('\n');
  return `${head}\n${body}`;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function formatSql(input: string) {
  return input
    .replace(/\s+/g, ' ')
    .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|ON)\b/gi, '\n$1')
    .trim();
}

type TreeNodeProps = {
  label: string;
  value: unknown;
  path: string;
  search: string;
  defaultOpen: boolean;
};

function TreeNode({ label, value, path, search, defaultOpen }: TreeNodeProps) {
  const [open, setOpen] = useState(defaultOpen);
  const matches = !search || label.toLowerCase().includes(search) || String(value ?? '').toLowerCase().includes(search);

  if (!matches && (value === null || typeof value !== 'object')) return null;

  const isObject = value && typeof value === 'object';
  return (
    <div className="ml-4 border-l border-slate-200 pl-3 dark:border-slate-700">
      <div className="flex items-center gap-2 text-sm">
        {isObject ? (
          <button type="button" onClick={() => setOpen((prev) => !prev)} className="rounded border px-1 text-xs">
            {open ? '-' : '+'}
          </button>
        ) : <span className="inline-block w-5" />}
        <span className="font-medium">{label}</span>
        {!isObject ? <span className="text-slate-500">{JSON.stringify(value)}</span> : null}
        <CopyButton value={path} label="Path" />
        {!isObject ? <CopyButton value={String(value ?? '')} label="Value" /> : null}
      </div>
      {isObject && open ? (
        <div className="mt-1 space-y-1">
          {Array.isArray(value)
            ? value.map((item, idx) => (
                <TreeNode key={`${path}[${idx}]`} label={`[${idx}]`} value={item} path={`${path}[${idx}]`} search={search} defaultOpen={defaultOpen} />
              ))
            : Object.entries(value as Record<string, unknown>).map(([k, v]) => (
                <TreeNode key={`${path}.${k}`} label={k} value={v} path={`${path}.${k}`} search={search} defaultOpen={defaultOpen} />
              ))}
        </div>
      ) : null}
    </div>
  );
}

export default function UtilityToolClient({ kind }: { kind: UtilityKind }) {
  if (
    kind === 'md5-generator' ||
    kind === 'sha1-generator' ||
    kind === 'sha256-generator' ||
    kind === 'sha512-generator' ||
    kind === 'hmac-generator' ||
    kind === 'file-checksum'
  ) {
    return <HashToolClient kind={kind} />;
  }

  const [input, setInput] = useState('');
  const [secondary, setSecondary] = useState('');
  const [cronPreset, setCronPreset] = useState(cronPresets[0].value);
  const [uuidValue, setUuidValue] = useState(() => crypto.randomUUID());
  const [jsonMode, setJsonMode] = useState<'beautify' | 'minify'>('beautify');
  const [sortDesc, setSortDesc] = useState(false);
  const [csvDelimiter, setCsvDelimiter] = useState(',');
  const [rootName, setRootName] = useState('root');
  const [interfaceName, setInterfaceName] = useState('RootModel');
  const [search, setSearch] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  const result = useMemo<ToolResult>(() => {
    try {
      if (kind === 'cron-expression-generator') {
        const preset = cronPresets.find((item) => item.value === cronPreset) ?? cronPresets[0];
        return { error: '', output: preset.value, rows: [{ label: 'Meaning', value: preset.meaning }] };
      }

      if (kind === 'uuid-generator') {
        const id = uuidValue;
        return { error: '', output: id, rows: [] };
      }

      if (!input.trim()) return { error: '', output: '', rows: [] };

      if (kind === 'utc-to-local') {
        const date = parseDate(input);
        if (!date) return { error: 'Enter a valid UTC datetime, for example 2026-05-24T12:00:00Z.', output: '', rows: [] };
        return {
          error: '',
          output: date.toLocaleString(),
          rows: [
            { label: 'Local Time', value: date.toLocaleString() },
            { label: 'ISO 8601', value: date.toISOString() },
            { label: 'Unix Seconds', value: String(Math.floor(date.getTime() / 1000)) }
          ]
        };
      }

      if (kind === 'local-to-utc') {
        const date = parseDate(input);
        if (!date) return { error: 'Enter a valid local datetime, for example 2026-05-24T12:00:00.', output: '', rows: [] };
        return {
          error: '',
          output: date.toUTCString(),
          rows: [
            { label: 'UTC Time', value: date.toUTCString() },
            { label: 'ISO 8601', value: date.toISOString() },
            { label: 'Unix Seconds', value: String(Math.floor(date.getTime() / 1000)) }
          ]
        };
      }

      if (kind === 'iso8601-parser') {
        const date = parseDate(input);
        if (!date) return { error: 'Enter a valid ISO 8601 string, for example 2026-05-24T12:00:00Z.', output: '', rows: [] };
        return {
          error: '',
          output: date.toISOString(),
          rows: [
            { label: 'UTC Time', value: date.toUTCString() },
            { label: 'Local Time', value: date.toLocaleString() },
            { label: 'Unix Seconds', value: String(Math.floor(date.getTime() / 1000)) },
            { label: 'Unix Milliseconds', value: String(date.getTime()) }
          ]
        };
      }

      if (kind === 'json-formatter') {
        const parsed = JSON.parse(input);
        const output = jsonMode === 'beautify' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
        return {
          error: '',
          output,
          rows: [
            { label: 'Characters', value: String(output.length) },
            { label: 'Mode', value: jsonMode }
          ],
          highlighted: syntaxHighlightJson(output)
        };
      }

      if (kind === 'json-minifier') {
        const minified = JSON.stringify(JSON.parse(input));
        const ratio = ((1 - minified.length / input.length) * 100).toFixed(2);
        return {
          error: '',
          output: minified,
          rows: [
            { label: 'Before', value: String(input.length) },
            { label: 'After', value: String(minified.length) },
            { label: 'Reduction', value: `${ratio}%` }
          ]
        };
      }

      if (kind === 'json-escape-unescape') {
        if (secondary === 'unescape') {
          return { error: '', output: JSON.parse(`"${input.replace(/\"/g, '\\"')}"`), rows: [] };
        }
        return { error: '', output: JSON.stringify(input).slice(1, -1), rows: [] };
      }

      if (kind === 'json-sort') {
        const sorted = sortJsonValue(JSON.parse(input), sortDesc);
        return { error: '', output: JSON.stringify(sorted, null, 2), rows: [{ label: 'Order', value: sortDesc ? 'Descending' : 'Ascending' }] };
      }

      if (kind === 'json-to-typescript') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToTypeScript(interfaceName, parsed), rows: [] };
      }

      if (kind === 'json-to-go') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToGoStruct(interfaceName, parsed), rows: [] };
      }

      if (kind === 'json-to-java') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToJavaClass(interfaceName, parsed), rows: [] };
      }

      if (kind === 'json-to-php') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToPhpClass(interfaceName, parsed), rows: [] };
      }

      if (kind === 'json-to-csharp') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToCSharpClass(interfaceName, parsed), rows: [] };
      }

      if (kind === 'json-to-python') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToPython(interfaceName, parsed), rows: [] };
      }

      if (kind === 'xml-to-json') {
        const parsed = xmlToJson(input);
        return { error: '', output: JSON.stringify(parsed, null, 2), rows: [] };
      }

      if (kind === 'json-to-xml') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToXml(parsed, rootName), rows: [] };
      }

      if (kind === 'yaml-to-json') {
        const parsed = yaml.load(input);
        return { error: '', output: JSON.stringify(parsed, null, 2), rows: [] };
      }

      if (kind === 'json-to-yaml') {
        const parsed = JSON.parse(input);
        return { error: '', output: yaml.dump(parsed, { noRefs: true, lineWidth: 120 }), rows: [] };
      }

      if (kind === 'query-string-to-json') {
        const parsed = parseQueryToJson(input);
        return { error: '', output: JSON.stringify(parsed, null, 2), rows: [] };
      }

      if (kind === 'json-to-query-string') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToQuery(parsed), rows: [] };
      }

      if (kind === 'csv-to-json') {
        const parsed = parseCsv(input, csvDelimiter === 'tab' ? '\t' : csvDelimiter === 'semicolon' ? ';' : ',');
        return { error: '', output: JSON.stringify(parsed, null, 2), rows: [{ label: 'Rows', value: String(parsed.length) }] };
      }

      if (kind === 'json-to-csv') {
        const parsed = JSON.parse(input);
        return { error: '', output: jsonToCsv(parsed), rows: [] };
      }

      if (kind === 'json-viewer') {
        const parsed = JSON.parse(input);
        return { error: '', output: JSON.stringify(parsed, null, 2), rows: [{ label: 'Root Type', value: Array.isArray(parsed) ? 'Array' : typeof parsed }] };
      }

      if (kind === 'jwt-decoder') {
        const parts = input.split('.');
        if (parts.length < 2) throw new Error('Invalid JWT format.');
        const decode = (part: string) => decodeURIComponent(escape(atob(part.replace(/-/g, '+').replace(/_/g, '/'))));
        const header = JSON.parse(decode(parts[0]));
        const payload = JSON.parse(decode(parts[1]));
        return { error: '', output: JSON.stringify({ header, payload }, null, 2), rows: [] };
      }

      if (kind === 'hash-generator') {
        return { error: '', output: input, rows: [{ label: 'SHA tools', value: 'Enter text then click Generate Hashes below.' }] };
      }

      if (kind === 'sql-formatter') {
        return { error: '', output: formatSql(input), rows: [] };
      }

      if (kind === 'base64-encode') return { error: '', output: encodeBase64(input), rows: [] };
      if (kind === 'base64-decode') return { error: '', output: decodeBase64(input), rows: [] };
      if (kind === 'url-encode') return { error: '', output: encodeURIComponent(input), rows: [] };
      if (kind === 'url-decode') return { error: '', output: decodeURIComponent(input), rows: [] };

      if (kind === 'regex-tester') {
        new RegExp(input, 'g');
        return { error: '', output: secondary ? '' : 'Enter sample text in the second field below.', rows: [] };
      }

      return { error: '', output: '', rows: [] };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid input.';
      if (kind.startsWith('json')) {
        return { error: detectJsonError(input, message), output: '', rows: [] };
      }
      return { error: message, output: '', rows: [] };
    }
  }, [cronPreset, csvDelimiter, input, interfaceName, jsonMode, kind, rootName, secondary, sortDesc, uuidValue]);

  const regexMatches = useMemo(() => {
    if (kind !== 'regex-tester' || !input || !secondary) return [];
    try {
      const regex = new RegExp(input, 'g');
      return Array.from(secondary.matchAll(regex)).map((match) => match[0]);
    } catch {
      return [];
    }
  }, [input, kind, secondary]);

  const viewerData = useMemo(() => {
    if (kind !== 'json-viewer' || !input.trim()) return null;
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  }, [input, kind]);

  const hashRows = useMemo<Array<{ label: string; value: string }>>(() => [], []);

  async function generateHashes() {
    if (kind !== 'hash-generator' || !input.trim()) return;
    const encode = new TextEncoder().encode(input);
    const digests = await Promise.all(['SHA-1', 'SHA-256', 'SHA-512'].map((alg) => crypto.subtle.digest(alg, encode)));
    const toHex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    const lines = ['SHA-1', 'SHA-256', 'SHA-512'].map((alg, idx) => `${alg}: ${toHex(digests[idx])}`);
    setSecondary(lines.join('\n'));
  }

  const jsonKinds = new Set([
    'json-formatter',
    'json-viewer',
    'json-minifier',
    'json-escape-unescape',
    'json-sort',
    'json-to-typescript',
    'json-to-go',
    'json-to-java',
    'json-to-python',
    'json-to-xml',
    'json-to-yaml',
    'json-to-query-string',
    'json-to-csv'
  ]);

  return (
    <section className="card" aria-label="Tool">
      <div className="space-y-4">
        {kind === 'cron-expression-generator' ? (
          <label className="block text-sm font-medium">
            Schedule preset
            <select value={cronPreset} onChange={(event) => setCronPreset(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              {cronPresets.map((preset) => (
                <option key={preset.value} value={preset.value}>{preset.label}</option>
              ))}
            </select>
          </label>
        ) : kind === 'uuid-generator' ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUuidValue(crypto.randomUUID())}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Generate UUID
            </button>
          </div>
        ) : (
          <label className="block text-sm font-medium">
            Input
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="mt-2 min-h-40 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-800"
              placeholder={jsonKinds.has(kind) ? '{"name":"DevTimeKit"}' : 'Enter value to convert'}
            />
          </label>
        )}

        <div className="flex flex-wrap gap-2">
          {kind === 'json-formatter' ? (
            <>
              <button type="button" onClick={() => setJsonMode('beautify')} className={`rounded-md border px-2 py-1 text-xs ${jsonMode === 'beautify' ? 'bg-brand-600 text-white' : ''}`}>Beautify</button>
              <button type="button" onClick={() => setJsonMode('minify')} className={`rounded-md border px-2 py-1 text-xs ${jsonMode === 'minify' ? 'bg-brand-600 text-white' : ''}`}>Minify</button>
              <button type="button" onClick={() => setInput('{"name":"DevTimeKit","tags":["json","tool"]}')} className="rounded-md border px-2 py-1 text-xs">Example</button>
              <button type="button" onClick={() => setInput('')} className="rounded-md border px-2 py-1 text-xs">Clear</button>
              {result.output ? <button type="button" onClick={() => downloadFile('formatted.json', result.output, 'application/json')} className="rounded-md border px-2 py-1 text-xs">Download .json</button> : null}
              <label className="cursor-pointer rounded-md border px-2 py-1 text-xs">
                Upload .json
                <input
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setInput(await file.text());
                  }}
                />
              </label>
            </>
          ) : null}

          {kind === 'json-sort' ? (
            <button type="button" onClick={() => setSortDesc((prev) => !prev)} className="rounded-md border px-2 py-1 text-xs">
              {sortDesc ? 'Descending' : 'Ascending'}
            </button>
          ) : null}

          {['json-to-typescript', 'json-to-go', 'json-to-java', 'json-to-php', 'json-to-csharp', 'json-to-python'].includes(kind) ? (
            <input value={interfaceName} onChange={(event) => setInterfaceName(event.target.value || 'RootModel')} placeholder="Interface/Class name" className="rounded-md border px-2 py-1 text-xs" />
          ) : null}

          {kind === 'json-escape-unescape' ? (
            <button type="button" onClick={() => setSecondary((prev) => (prev === 'unescape' ? '' : 'unescape'))} className="rounded-md border px-2 py-1 text-xs">
              {secondary === 'unescape' ? 'Mode: Unescape' : 'Mode: Escape'}
            </button>
          ) : null}

          {kind === 'json-to-xml' ? <input value={rootName} onChange={(event) => setRootName(event.target.value || 'root')} placeholder="Root name" className="rounded-md border px-2 py-1 text-xs" /> : null}

          {kind === 'csv-to-json' ? (
            <select value={csvDelimiter} onChange={(event) => setCsvDelimiter(event.target.value)} className="rounded-md border px-2 py-1 text-xs">
              <option value=",">Comma</option>
              <option value="tab">Tab</option>
              <option value="semicolon">Semicolon</option>
            </select>
          ) : null}

          {kind === 'hash-generator' ? <button type="button" onClick={generateHashes} className="rounded-md border px-2 py-1 text-xs">Generate Hashes</button> : null}
        </div>

        {kind === 'regex-tester' ? (
          <label className="block text-sm font-medium">
            Sample text
            <textarea value={secondary} onChange={(event) => setSecondary(event.target.value)} className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder="Paste text to test against the regular expression" />
          </label>
        ) : null}

        {kind === 'json-viewer' ? (
          <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <div className="mb-3 flex flex-wrap gap-2">
              <input value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())} placeholder="Search key or value" className="rounded-md border px-2 py-1 text-xs" />
              <button type="button" onClick={() => setExpandAll(true)} className="rounded-md border px-2 py-1 text-xs">Expand All</button>
              <button type="button" onClick={() => setExpandAll(false)} className="rounded-md border px-2 py-1 text-xs">Collapse All</button>
            </div>
            {viewerData ? <TreeNode label="root" value={viewerData} path="root" search={search} defaultOpen={expandAll} /> : <p className="text-sm text-slate-500">Enter valid JSON to view tree.</p>}
          </div>
        ) : null}

        {result.error ? <p className="text-sm text-rose-600">{result.error}</p> : null}

        {result.output ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Output</h2>
              <div className="flex items-center gap-2">
                <CopyButton value={result.output} />
                {kind === 'json-to-csv' ? <button type="button" onClick={() => downloadFile('output.csv', result.output, 'text/csv')} className="rounded-md border px-2 py-1 text-xs">Download .csv</button> : null}
              </div>
            </div>
            {result.highlighted ? (
              <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm" dangerouslySetInnerHTML={{ __html: result.highlighted }} />
            ) : (
              <pre className="whitespace-pre-wrap break-words font-mono text-sm">{result.output}</pre>
            )}
          </div>
        ) : null}

        {kind === 'hash-generator' && secondary ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Hashes</h2>
              <CopyButton value={secondary} />
            </div>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm">{secondary}</pre>
          </div>
        ) : null}

        {regexMatches.length ? (
          <div className="space-y-2">
            {regexMatches.map((match, index) => (
              <ValueRow key={`${match}-${index}`} label={`Match ${index + 1}`} value={match} />
            ))}
          </div>
        ) : null}

        {[...result.rows, ...hashRows].map((row) => (
          <ValueRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </section>
  );
}
