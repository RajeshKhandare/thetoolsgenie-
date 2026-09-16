'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          
          {/* Brand Info (2 Columns Wide) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white font-black shadow-md shadow-violet-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white">
                TheTools<span className="text-violet-600 dark:text-violet-400">Genie</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
              Free, fast, and accessible digital utilities built for creators, students, and developers. Edit, calculate, and convert directly in your browser.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All utilities operational · 100% Free</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Compilers & Code
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Finance Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/tools/youtube-4k-thumbnail-grabber" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  YouTube Thumbnail Grabber
                </Link>
              </li>
              <li>
                <Link href="/tools/sip-wealth-calculator" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  SIP Wealth Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/online-python-compiler" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Online Python Runner
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Merge PDF Documents
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Contact Support
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
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 border-t border-zinc-100 dark:border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} TheToolsGenie. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for speed and privacy
          </p>
        </div>

      </div>
    </footer>
  );
}
