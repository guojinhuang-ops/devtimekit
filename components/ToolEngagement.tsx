'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type RecentItem = { title: string; path: string };

const FAVORITES_KEY = 'dtk_favorites';
const RECENT_KEY = 'dtk_recent';

export default function ToolEngagement({ title, path }: { title: string; path: string }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<RecentItem[]>([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]') as string[];
    const rec = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') as RecentItem[];
    setFavorites(fav);
    setRecent(rec);

    const nextRecent = [{ title, path }, ...rec.filter((item) => item.path !== path)].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
    setRecent(nextRecent);
  }, [path, title]);

  const isFavorite = useMemo(() => favorites.includes(path), [favorites, path]);

  const toggleFavorite = () => {
    const next = isFavorite ? favorites.filter((item) => item !== path) : [...favorites, path];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  };

  return (
    <section className="card mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Tool Actions</h2>
        <button type="button" onClick={toggleFavorite} className="min-h-11 rounded-md border px-4 text-sm">
          {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Recently Used</h3>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {recent.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="text-sm text-brand-700 hover:underline dark:text-brand-100">{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
