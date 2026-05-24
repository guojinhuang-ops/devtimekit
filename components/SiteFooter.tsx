import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page space-y-4 py-8 text-sm text-slate-600 dark:text-slate-300">
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
