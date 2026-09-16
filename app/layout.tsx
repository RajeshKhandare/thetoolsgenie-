import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TheToolsGenie | 100% Free In-Browser Utility & Compiler Hub',
  description: '80+ high-performance client-side tools for compilers, finance calculators, image cropping, PDF processing, and developer utilities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-zinc-900 selection:bg-violet-100 selection:text-violet-900">
        {children}
      </body>
    </html>
  );
}
