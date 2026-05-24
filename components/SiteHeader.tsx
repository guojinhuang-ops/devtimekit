'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navigation/navbar';

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  return <Navbar pathname={pathname} />;
}
