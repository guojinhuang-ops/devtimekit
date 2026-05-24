import type { Metadata } from 'next';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import { buildMetadata } from '@/lib/seo';
import { utilityPages } from '@/lib/utility-pages';

const page = utilityPages['/sha512-generator'];

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  keywords: page.keywords
});

export default function Sha512GeneratorPage() {
  return <UtilitySeoPage page={page} />;
}
