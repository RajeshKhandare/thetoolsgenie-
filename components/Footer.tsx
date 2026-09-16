'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/data/toolsRegistry';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-zinc-900 dark:text-white">
                TheTools<span className="text-violet-600 dark:text-violet-400">Genie</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
              High-performance client-side utility suite. Compilers, financial engines, media cropping, and developer tools executing locally inside browser memory.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Server Uploads · Strict Client Privacy</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Tool Categories
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat}>
                  <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {cat} Utilities
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Trust & Legal
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-zinc-100 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} TheToolsGenie. All tools execute locally under client runtime.</p>
          <p>Built for instantaneous browser execution</p>
        </div>
      </div>
    </footer>
  );
}
