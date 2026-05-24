import type { NavSection as NavSectionType } from '@/lib/navigation';
import { localizedPath, type LanguageCode } from '@/lib/i18n';
import NavCard from '@/components/navigation/nav-card';

type NavSectionProps = {
  section: NavSectionType;
  locale: LanguageCode;
  onNavigate?: () => void;
};

export default function NavSection({ section, locale, onNavigate }: NavSectionProps) {
  return (
    <section>
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {section.title}
      </p>
      <div className="mt-2 space-y-2">
        {section.items.map((item) => (
          <NavCard key={`${section.title}-${item.title}`} item={item} href={localizedPath(item.href, locale)} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
