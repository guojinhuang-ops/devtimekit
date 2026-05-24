import type { Metadata } from 'next';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import { buildMetadata } from '@/lib/seo';
import { utilityPages } from '@/lib/utility-pages';

const page = utilityPages['/md5-generator'];

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  keywords: page.keywords
});

export default function Md5GeneratorPage() {
  return <UtilitySeoPage page={page} />;
}
