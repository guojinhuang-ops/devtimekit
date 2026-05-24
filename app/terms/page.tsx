import type { Metadata } from 'next';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use - DevTimeKit',
  description: 'Read DevTimeKit terms of use for developer tools, content usage, and service expectations.',
  path: '/terms',
  languages: { en: absoluteUrl('/terms'), 'x-default': absoluteUrl('/terms') }
});

export default function TermsPage() {
  return (
    <article className="card space-y-4">
      <h1 className="text-3xl font-bold">Terms of Use</h1>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">DevTimeKit is provided as-is for development and educational usage.</p>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">You are responsible for validating outputs in production workflows and following your organization policies.</p>
    </article>
  );
}
