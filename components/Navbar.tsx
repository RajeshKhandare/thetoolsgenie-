'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon, ChevronDown } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';

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

  // Dropdown Categories
  const navCategories = [
    { name: 'PDF', filter: 'PDF' },
    { name: 'Image', filter: 'Image' },
    { name: 'Compiler', filter: 'Compiler' },
    { name: 'Finance', filter: 'Finance' },
    { name: 'YouTube', filter: 'YouTube' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

        {/* Hover-based Dropdown Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          {navCategories.map((cat) => {
            const catTools = TOOLS_REGISTRY.filter(
              (t) => t.category.toLowerCase().includes(cat.filter.toLowerCase())
            );

            return (
              <div key={cat.name} className="relative group py-5 px-3">
                <button className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  <span>{cat.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 text-zinc-400 group-hover:text-violet-600" />
                </button>

                {/* Dropdown Menu Box on Hover */}
                <div className="absolute top-[52px] left-0 hidden group-hover:block w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-2 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                    {cat.name} Utilities
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-0.5">
                    {catTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="block rounded-lg px-2.5 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        <p className="font-semibold truncate">{tool.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate mt-0.5">{tool.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Controls */}
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
