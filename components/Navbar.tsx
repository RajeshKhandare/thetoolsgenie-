'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo - Original Violet Theme */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white font-black shadow-md shadow-violet-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight leading-none text-zinc-900 dark:text-white">
              TheTools<span className="text-violet-600 dark:text-violet-400">Genie</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Utility Suite</span>
          </div>
        </Link>

        {/* Navigation Categories */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">PDF Tools</Link>
          <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Image Tools</Link>
          <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Compilers</Link>
          <Link href="/#tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Finance Tools</Link>
        </nav>

        {/* Controls: Day/Night + CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-yellow-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
            title="Toggle Day/Night Mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/#tools"
            className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
