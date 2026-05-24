import Link from 'next/link';
import type { NavItem } from '@/lib/navigation';

type NavCardProps = {
  item: NavItem;
  href: string;
  onNavigate?: () => void;
};

export default function NavCard({ item, href, onNavigate }: NavCardProps) {
  const Icon = item.icon;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-start gap-2.5 rounded-xl border border-slate-200/70 bg-white/70 p-2.5 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:bg-slate-800"
    >
      <span className="mt-0.5 rounded-lg bg-slate-100 p-1.5 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700 dark:group-hover:text-brand-200">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {item.title}
          {item.comingSoon ? ' · Soon' : ''}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
      </span>
    </Link>
  );
}
