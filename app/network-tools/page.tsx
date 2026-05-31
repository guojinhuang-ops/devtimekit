import type { Metadata } from 'next';
import ToolHubPage, { buildHubMetadata } from '@/components/ToolHubPage';

export const metadata: Metadata = buildHubMetadata(
  'Network Tools',
  'Network utility pages for timezone, UTC conversion, and protocol-adjacent developer workflows.',
  '/network-tools',
  ['network tools', 'developer network utilities', 'ip tools', 'dns tools']
);

export default function Page() {
  return (
    <ToolHubPage
      title="Network Tools"
      description="Network-related utility landing page for DevTimeKit. Use these tools for protocol and infrastructure support workflows."
      path="/network-tools"
      links={[
        { href: '/timezone-converter', label: 'Timezone Converter', description: 'Convert datetimes across common zones.' },
        { href: '/utc-to-local', label: 'UTC to Local', description: 'Convert UTC values for local debugging.' },
        { href: '/local-to-utc', label: 'Local to UTC', description: 'Normalize local inputs for backend systems.' },
        { href: '/utc-time-now', label: 'UTC Time Now', description: 'Read current UTC clock values quickly.' }
      ]}
    />
  );
}

