import type { Metadata } from 'next';
import ToolHubPage, { buildHubMetadata } from '@/components/ToolHubPage';

export const metadata: Metadata = buildHubMetadata(
  'Developer Tools',
  'Developer utility hub for regex, SQL, UUID, markdown, encoding, and productivity helpers.',
  '/developer-tools',
  ['developer tools', 'regex tester', 'sql formatter', 'uuid generator']
);

export default function Page() {
  return (
    <ToolHubPage
      title="Developer Tools"
      description="General-purpose developer utility tools for formatting, validation, and quick debugging."
      path="/developer-tools"
      links={[
        { href: '/regex-tester', label: 'Regex Tester', description: 'Test regex against sample text.' },
        { href: '/uuid-generator', label: 'UUID Generator', description: 'Generate unique IDs instantly.' },
        { href: '/sql-formatter', label: 'SQL Formatter', description: 'Format SQL for review and debugging.' },
        { href: '/markdown-preview', label: 'Markdown Preview', description: 'Preview markdown output and copy HTML.' },
        { href: '/base64-encode', label: 'Base64 Encode', description: 'Encode text to Base64 safely in browser.' },
        { href: '/url-encode', label: 'URL Encode', description: 'Percent-encode query and path values.' }
      ]}
    />
  );
}

