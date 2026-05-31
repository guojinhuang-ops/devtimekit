import type { Metadata } from 'next';
import ToolHubPage, { buildHubMetadata } from '@/components/ToolHubPage';

export const metadata: Metadata = buildHubMetadata(
  'JSON Tools',
  'JSON formatter, validator, viewer, converters, and schema tools for API and data workflows.',
  '/json-tools',
  ['json tools', 'json formatter', 'json validator', 'json converter']
);

export default function Page() {
  return (
    <ToolHubPage
      title="JSON Tools"
      description="Central hub for JSON formatting, validation, diff, and language conversion workflows."
      path="/json-tools"
      links={[
        { href: '/json-formatter', label: 'JSON Formatter', description: 'Beautify JSON for readable output.' },
        { href: '/json-validator', label: 'JSON Validator', description: 'Validate syntax and parser errors.' },
        { href: '/json-viewer', label: 'JSON Viewer', description: 'Inspect JSON with highlighted structure.' },
        { href: '/json-minifier', label: 'JSON Minifier', description: 'Compress JSON payloads quickly.' },
        { href: '/json-to-typescript', label: 'JSON to TypeScript', description: 'Generate interface stubs from sample JSON.' },
        { href: '/json-to-go', label: 'JSON to Go', description: 'Generate Go struct output from JSON.' }
      ]}
    />
  );
}

