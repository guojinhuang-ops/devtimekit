import type { Metadata } from 'next';
import ToolHubPage, { buildHubMetadata } from '@/components/ToolHubPage';

export const metadata: Metadata = buildHubMetadata(
  'Time Tools',
  'Unix timestamp, epoch conversion, UTC and timezone tools for developer scheduling and debugging workflows.',
  '/time-tools',
  ['time tools', 'unix timestamp converter', 'timezone converter', 'epoch tools']
);

export default function Page() {
  return (
    <ToolHubPage
      title="Time Tools"
      description="All core time conversion utilities in one place, including Unix timestamp and timezone scenarios."
      path="/time-tools"
      links={[
        { href: '/unix-timestamp-converter', label: 'Unix Timestamp Converter', description: 'Convert Unix timestamps and date values fast.' },
        { href: '/timestamp-to-date', label: 'Timestamp to Date', description: 'Parse epoch values into readable date formats.' },
        { href: '/date-to-timestamp', label: 'Date to Timestamp', description: 'Convert date input to Unix seconds and milliseconds.' },
        { href: '/timezone-converter', label: 'Timezone Converter', description: 'Translate datetimes between common zones.' },
        { href: '/utc-to-local', label: 'UTC to Local', description: 'Map UTC values into local browser timezone.' },
        { href: '/world-cup-2026-time-converter', label: 'World Cup 2026 Time Converter', description: 'Event-time conversion scenario page.' }
      ]}
    />
  );
}

