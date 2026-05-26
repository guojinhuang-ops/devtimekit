import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';
import DarkModeToggle from '@/components/DarkModeToggle';
import { allLanguageCodes, getDictionary, languageNames, localizedPath, stripLocale, type LanguageCode } from '@/lib/i18n';
import { getCategoryLabel, getGuidesLabel, getMenuSections, type NavCategoryKey } from '@/lib/navigation';

type MobileMenuProps = {
  locale: LanguageCode;
  pathname: string;
  direction: 'ltr' | 'rtl';
  compact?: boolean;
};

export default function MobileMenu({ locale, pathname, direction, compact = false }: MobileMenuProps) {
  const isRtl = direction === 'rtl';
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openSection, setOpenSection] = useState<NavCategoryKey | null>(null);
  const dictionary = getDictionary(locale);
  const currentPath = stripLocale(pathname);
  const menus = getMenuSections(locale);
  const categories: NavCategoryKey[] = ['time', 'encoding', 'json', 'developer', 'hash'];

  const topLinks = useMemo(
    () => [
      { href: localizedPath('/', locale), label: dictionary.nav.home },
      { href: localizedPath('/guides', locale), label: getGuidesLabel(locale) }
    ],
    [dictionary.nav.home, locale]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
        className={`min-h-11 rounded-md border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 ${compact ? 'px-2.5' : ''}`}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && mounted ? createPortal(
        <div className="fixed inset-0 z-[120] bg-slate-950/40" onClick={() => setOpen(false)}>
          <aside
            dir={direction}
            className={`h-full w-[92vw] max-w-sm overflow-y-auto border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 ${
              isRtl ? 'mr-auto border-l' : 'ml-auto border-l'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">DevTimeKit</p>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="rounded-md border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="mt-5 space-y-3" aria-label="Mobile navigation">
              {topLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}

              {categories.map((key) => {
                const expanded = openSection === key;
                return (
                  <section key={key} className="rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setOpenSection((prev) => (prev === key ? null : key))}
                      aria-expanded={expanded}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold"
                    >
                      {getCategoryLabel(locale, key)}
                      <ChevronDown className={`transition ${expanded ? 'rotate-180' : ''}`} size={16} />
                    </button>

                    {expanded ? (
                      <div className="space-y-3 border-t border-slate-200 p-3 dark:border-slate-700">
                        {menus[key].map((section) => (
                          <div key={section.title}>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{section.title}</p>
                            <ul className="mt-2 space-y-2">
                              {section.items.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={localizedPath(item.href, locale)}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </section>
                );
              })}

              <section className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{dictionary.nav.language}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {allLanguageCodes.map((lang) => (
                    <Link
                      key={lang}
                      href={localizedPath(currentPath, lang)}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        lang === locale ? 'bg-slate-100 font-semibold dark:bg-slate-800' : ''
                      }`}
                    >
                      {languageNames[lang]}
                    </Link>
                  ))}
                </div>
              </section>

              <div className="pt-2">
                <DarkModeToggle />
              </div>
            </nav>
          </aside>
        </div>
      , document.body) : null}
    </div>
  );
}
