import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'TheToolsGenie | Free In-Browser Utility & Compiler Hub',
  description: '80+ high-performance client-side tools for compilers, finance calculators, image cropping, and PDF processing.',
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
