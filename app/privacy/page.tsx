import type { Metadata } from 'next';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy - DevTimeKit',
  description: 'Read DevTimeKit privacy practices, including browser-side processing and data handling principles.',
  path: '/privacy',
  languages: { en: absoluteUrl('/privacy'), 'x-default': absoluteUrl('/privacy') }
});

export default function PrivacyPage() {
  return (
    <article className="card space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">DevTimeKit is designed to process many tool operations directly in your browser.</p>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">We do not require account creation for core utilities, and we aim to minimize data collection.</p>
    </article>
  );
}
