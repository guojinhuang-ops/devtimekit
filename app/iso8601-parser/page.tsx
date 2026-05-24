import type { Metadata } from 'next';
import UtilitySeoPage from '@/components/UtilitySeoPage';
import { buildMetadata } from '@/lib/seo';
import { utilityPages } from '@/lib/utility-pages';

const page = utilityPages['/iso8601-parser'];

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  keywords: page.keywords
});

export default function Iso8601ParserPage() {
  return <UtilitySeoPage page={page} />;
}
