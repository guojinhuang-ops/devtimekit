import type { Metadata } from 'next';
import './globals.css';
import BackToTopButton from '@/components/BackToTopButton';
import CopyToast from '@/components/CopyToast';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { defaultSiteMeta } from '@/lib/seo';
import { BASE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: defaultSiteMeta.title,
    template: `%s | DevTimeKit`
  },
  description: defaultSiteMeta.description,
  metadataBase: new URL(BASE_URL),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  },
  openGraph: {
    title: defaultSiteMeta.title,
    description: defaultSiteMeta.description,
    siteName: 'DevTimeKit',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSiteMeta.title,
    description: defaultSiteMeta.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="container-page py-6 sm:py-8 lg:py-10">{children}</main>
        <SiteFooter />
        <BackToTopButton />
        <CopyToast />
      </body>
    </html>
  );
}
