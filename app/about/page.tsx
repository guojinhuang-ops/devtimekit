import type { Metadata } from 'next';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About DevTimeKit - Privacy-First Developer Tools',
  description: 'Learn why DevTimeKit exists, how tools run in the browser, and our focus on practical developer workflows.',
  path: '/about',
  languages: { en: absoluteUrl('/about'), 'x-default': absoluteUrl('/about') }
});

export default function AboutPage() {
  return (
    <article className="card space-y-4">
      <h1 className="text-3xl font-bold">About DevTimeKit</h1>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        DevTimeKit is a multi-language developer utility site focused on practical tools for timestamps, JSON, encoding, and hashing workflows.
      </p>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        We prioritize browser-side processing for fast feedback and privacy-friendly usage. Our goal is to help developers debug, validate, and document data formats with less friction.
      </p>
    </article>
  );
}
