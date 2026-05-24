export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page py-8 text-sm text-slate-600 dark:text-slate-300">
        <p>&copy; {new Date().getFullYear()} DevTimeKit. Fast, privacy-friendly Unix time tools for developers.</p>
      </div>
    </footer>
  );
}
