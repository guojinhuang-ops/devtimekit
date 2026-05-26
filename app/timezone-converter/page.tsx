import type { Metadata } from 'next';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import { buildMetadata } from '@/lib/seo';
import { utilityPages } from '@/lib/utility-pages';

const page = utilityPages['/utc-to-local'];

export const metadata: Metadata = buildMetadata({
  title: 'Timezone Converter',
  description: 'Convert time between UTC and local timezone with browser-side tooling.',
  path: '/timezone-converter',
  keywords: ['timezone converter', 'utc to local', 'local to utc']
});

export default function TimezoneConverterPage() {
  return <UtilitySeoPage page={page} />;
}
