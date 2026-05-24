import type { Metadata } from 'next';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import { buildMetadata } from '@/lib/seo';
import { utilityPages } from '@/lib/utility-pages';

const page = utilityPages['/base64-encode'];

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  keywords: page.keywords
});

export default function Base64EncodePage() {
  return <UtilitySeoPage page={page} />;
}
