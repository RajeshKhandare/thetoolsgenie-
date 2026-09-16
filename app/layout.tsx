import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const SITE_URL = 'https://thetoolsgenie-beta.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TheToolsGenie | Free In-Browser Utility & Compiler Hub',
    template: '%s | TheToolsGenie',
  },
  description:
    '80+ high-performance client-side tools for compilers, finance calculators, image cropping, and PDF processing. Zero server uploads, instant execution.',
  keywords: [
    'online tools',
    'free utility suite',
    'pdf tools',
    'image compressor',
    'client side compiler',
    'finance calculator',
    'developer utilities',
    'in-browser tools',
    'zero upload privacy',
  ],
  authors: [{ name: 'TheToolsGenie Team' }],
  creator: 'TheToolsGenie',
  publisher: 'TheToolsGenie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Global High-RPM Hreflang Configuration
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'en-GB': SITE_URL,
      'de-DE': SITE_URL,
      'fr-FR': SITE_URL,
      'es-ES': SITE_URL,
      'it-IT': SITE_URL,
      'ja-JP': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'TheToolsGenie | Free In-Browser Utility & Compiler Hub',
    description:
      '80+ high-performance client-side tools for compilers, finance calculators, image cropping, and PDF processing.',
    url: SITE_URL,
    siteName: 'TheToolsGenie',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheToolsGenie | Free In-Browser Utility & Compiler Hub',
    description:
      'Fast, private, client-side executed utilities. Zero server upload latency.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-violet-100 selection:text-violet-900">
        {children}
      </body>
    </html>
  );
}
