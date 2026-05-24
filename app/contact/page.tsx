import type { Metadata } from 'next';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact DevTimeKit',
  description: 'Contact DevTimeKit for feedback, feature requests, and developer-tool suggestions.',
  path: '/contact',
  languages: { en: absoluteUrl('/contact'), 'x-default': absoluteUrl('/contact') }
});

export default function ContactPage() {
  return (
    <article className="card space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">For feedback and feature requests, please open an issue or contact the maintainer channel for this project.</p>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">When reporting bugs, include tool path, sample input, expected output, and browser version.</p>
    </article>
  );
}
