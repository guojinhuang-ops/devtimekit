import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';
import {
  allLanguageCodes,
  getDictionary,
  getLocaleFromPath,
  languageNames,
  localizedPath,
  stripLocale,
  type LanguageCode
} from '@/lib/i18n';
import { getCategoryLabel, getGuidesLabel, type NavCategoryKey } from '@/lib/navigation';
import { SITE_NAME } from '@/lib/site';

const MegaMenu = dynamic(() => import('@/components/navigation/mega-menu'));
const MobileMenu = dynamic(() => import('@/components/navigation/mobile-menu'));
const ToolSearch = dynamic(() => import('@/components/navigation/tool-search'));

type NavbarProps = {
  pathname: string;
};

const hoverDelay = 220;

export default function Navbar({ pathname }: NavbarProps) {
  const locale = getLocaleFromPath(pathname);
  const dictionary = getDictionary(locale);
  const isRtl = dictionary.dir === 'rtl';
  const currentPath = stripLocale(pathname);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavCategoryKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRootRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);

  const primaryLinks = useMemo<Array<
    | { type: 'link'; href: string; label: string }
    | { type: 'menu'; key: NavCategoryKey; label: string }
  >>(
    () => [
      { type: 'link', href: localizedPath('/', locale), label: dictionary.nav.home },
      { type: 'menu', key: 'time', label: getCategoryLabel(locale, 'time') },
      { type: 'menu', key: 'encoding', label: getCategoryLabel(locale, 'encoding') },
      { type: 'menu', key: 'json', label: getCategoryLabel(locale, 'json') },
      { type: 'menu', key: 'developer', label: getCategoryLabel(locale, 'developer') },
      { type: 'menu', key: 'hash', label: getCategoryLabel(locale, 'hash') },
      { type: 'link', href: '/guides', label: getGuidesLabel(locale) }
    ],
    [dictionary.nav.home, locale]
  );

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), hoverDelay);
  };

  const openWithDelay = (key: NavCategoryKey) => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(key), hoverDelay);
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navRootRef.current?.contains(target)) return;

      if (languageRef.current && !languageRef.current.contains(target)) {
        setLanguageOpen(false);
      }
      setOpenMenu(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div dir={dictionary.dir} className={`flex h-14 items-center justify-between sm:h-16 ${isRtl ? 'xl:flex-row-reverse' : ''}`}>
          <div className={`flex min-w-0 items-center gap-2 sm:gap-8 ${isRtl ? 'xl:flex-row-reverse' : ''}`}>
            <Link
              href={localizedPath('/', locale)}
              className="inline-flex min-w-0 flex-shrink items-center gap-2 whitespace-nowrap rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={SITE_NAME}
            >
              <Image src="/logo-devtimekit-icon.svg" alt="" width={30} height={30} priority />
              <span className="hidden text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:inline">{SITE_NAME}</span>
            </Link>

            <div ref={navRootRef} className="relative hidden xl:flex" onMouseLeave={scheduleClose}>
              <nav aria-label="Main navigation" className="flex flex-nowrap items-center gap-2 whitespace-nowrap text-sm">
                {primaryLinks.map((item) => {
                  if (item.type === 'link') {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const expanded = openMenu === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="menu"
                      onMouseEnter={() => openWithDelay(item.key)}
                      onFocus={() => setOpenMenu(item.key)}
                      onClick={() => setOpenMenu((prev) => (prev === item.key ? null : item.key))}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })}
              </nav>

              <MegaMenu
                openKey={openMenu}
                locale={locale}
                direction={dictionary.dir}
                onClose={() => setOpenMenu(null)}
                onMenuEnter={clearCloseTimer}
                onMenuLeave={scheduleClose}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 xl:hidden">
            <ToolSearch locale={locale} compact />
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                aria-expanded={languageOpen}
                aria-label={dictionary.nav.language}
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="inline-flex min-h-11 items-center rounded-md border border-slate-300 px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {locale.toUpperCase()}
              </button>
              {languageOpen ? (
                <div className={`absolute z-50 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900 ${isRtl ? 'left-0' : 'right-0'}`}>
                  {allLanguageCodes.map((lang) => (
                    <Link key={lang} href={localizedPath(currentPath, lang)} onClick={() => setLanguageOpen(false)} className={`block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${lang === locale ? 'font-semibold text-brand-700 dark:text-brand-100' : 'text-slate-700 dark:text-slate-200'}`}>
                      {languageNames[lang]}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <MobileMenu locale={locale} pathname={pathname} direction={dictionary.dir} compact />
          </div>

          <div className="hidden flex-shrink-0 items-center gap-3 xl:flex">
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="whitespace-nowrap rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {languageNames[locale as LanguageCode]}
              </button>
              {languageOpen ? (
                <div
                  className={`absolute z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900 ${
                    isRtl ? 'left-0' : 'right-0'
                  }`}
                >
                  {allLanguageCodes.map((lang) => (
                    <Link
                      key={lang}
                      href={localizedPath(currentPath, lang)}
                      onClick={() => setLanguageOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        lang === locale ? 'font-semibold text-brand-700 dark:text-brand-100' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {languageNames[lang]}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <ToolSearch locale={locale} />
            <DarkModeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
