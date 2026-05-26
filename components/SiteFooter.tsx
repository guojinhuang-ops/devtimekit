import Link from 'next/link';
import { tools } from '@/lib/tools';
import { guidePages } from '@/lib/guides';
import { allLanguageCodes } from '@/lib/i18n';

export default function SiteFooter() {
  const popular = tools.slice(0, 6);
  const quick = ['/tools', '/tools/time', '/tools/json', '/timezone-converter'];
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page space-y-6 py-8 text-sm text-slate-600 dark:text-slate-300">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Popular Tools</h3>
            <ul className="space-y-1">
              {popular.map((tool) => <li key={tool.href}><Link href={tool.href} className="hover:underline">{tool.title}</Link></li>)}
            </ul>
          </section>
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Quick Links</h3>
            <ul className="space-y-1">
              {quick.map((href) => <li key={href}><Link href={href} className="hover:underline">{href}</Link></li>)}
            </ul>
          </section>
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Guides</h3>
            <ul className="space-y-1">
              {guidePages.slice(0, 6).map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`} className="hover:underline">{guide.title}</Link></li>)}
            </ul>
          </section>
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Languages</h3>
            <p className="text-xs break-words">{allLanguageCodes.join(' / ')}</p>
          </section>
        </div>
        <p>&copy; {new Date().getFullYear()} DevTimeKit. Fast, privacy-friendly Unix time tools for developers.</p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
