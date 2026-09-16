'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // Sync with document element for global theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md transition-colors text-zinc-900 dark:text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight leading-none">
              TheTools<span className="text-blue-600 dark:text-blue-400">Genie</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">Utility Suite</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
          <Link href="/#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PDF Tools</Link>
          <Link href="/#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Image Tools</Link>
          <Link href="/#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compilers</Link>
          <Link href="/#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Finance Tools</Link>
        </nav>

        {/* Day / Night Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-yellow-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            title="Toggle Day/Night Mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/#tools"
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
