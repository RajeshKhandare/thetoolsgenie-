'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-zinc-950 dark:text-white">
              TheTools<span className="text-violet-600 dark:text-violet-400">Genie</span>
            </span>
            <span className="hidden sm:block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              Utility Suite
            </span>
          </div>
        </Link>

        {/* Category Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          <Link href="/tools?category=pdf" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            PDF
          </Link>
          <Link href="/tools?category=image" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Image
          </Link>
          <Link href="/tools?category=compiler" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Compiler
          </Link>
          <Link href="/tools?category=finance" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Finance
          </Link>
          <Link href="/tools?category=converters" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Converters
          </Link>
        </nav>

        {/* Top-Right Actions: Language Selector + Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* International High-RPM Language Selector */}
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          <div className="sm:hidden pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <LanguageSelector />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">All 80 Tools</Link>
            <Link href="/tools?category=pdf" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">PDF Tools</Link>
            <Link href="/tools?category=image" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">Image Tools</Link>
            <Link href="/tools?category=compiler" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">Compiler Tools</Link>
            <Link href="/tools?category=finance" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">Finance Tools</Link>
            <Link href="/tools?category=converters" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">Converters</Link>
          </div>
        </div>
      )}
    </header>
  );
}
