import { useEffect, useRef } from 'react';
import type { NavCategoryKey } from '@/lib/navigation';
import { getMenuSections } from '@/lib/navigation';
import type { LanguageCode } from '@/lib/i18n';
import NavSection from '@/components/navigation/nav-section';

type MegaMenuProps = {
  openKey: NavCategoryKey | null;
  locale: LanguageCode;
  onClose: () => void;
  onMenuEnter?: () => void;
  onMenuLeave?: () => void;
  direction: 'ltr' | 'rtl';
};

export default function MegaMenu({ openKey, locale, onClose, onMenuEnter, onMenuLeave, direction }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openKey) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, openKey]);

  if (!openKey) return null;

  const sections = getMenuSections(locale)[openKey];
  const columns = sections.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  const compact = openKey === 'json';

  return (
    <div
      className="absolute inset-x-0 top-full z-40 pt-2"
      onMouseEnter={onMenuEnter}
      onMouseLeave={onMenuLeave ?? onClose}
    >
      <div
        ref={panelRef}
        role="menu"
        dir={direction}
        className={`mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 ${
          compact ? 'max-h-[72vh] overflow-y-auto' : ''
        }`}
      >
        <div className={`grid gap-4 ${columns}`}>
          {sections.map((section) => (
            <NavSection key={section.title} section={section} locale={locale} onNavigate={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}
