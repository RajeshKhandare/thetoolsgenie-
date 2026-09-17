'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Sun, Moon, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';

// Category mapping aligned with Homepage categories
const CATEGORIES_CONFIG = [
  { label: 'PDF', query: 'PDF' },
  { label: 'Image', query: 'Image' },
  { label: 'Compiler', query: 'Compiler' },
  { label: 'Finance', query: 'Finance' },
  { label: 'YouTube', query: 'YouTube' },
];

export default function Navbar() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
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

  // Direct homepage category filter & smooth scroll
  const handleCategoryNavigate = (categoryName: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    // Homepage ke tools section par bhejega
    router.push(`/?category=${encodeURIComponent(categoryName)}#tools`);
    
    // Agar user pehle se homepage par hai, toh smooth scroll trigger karega
    const el = document.getElementById('tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

        {/* Categories Navigation with Hover Tool Cards */}
        <nav className="hidden lg:flex items-center gap-1">
          {CATEGORIES_CONFIG.map((cat) => {
            const catTools = TOOLS_REGISTRY.filter(
              (t) => t.category.toLowerCase() === cat.label.toLowerCase()
            ).slice(0, 5);

            return (
              <div
                key={cat.label}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(cat.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate(cat.query)}
                  className="flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-900 transition-all"
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      activeDropdown === cat.label ? 'rotate-180 text-violet-600' : ''
                    }`}
                  />
                </button>

                {/* Hover Cards Dropdown */}
                {activeDropdown === cat.label && (
                  <div className="absolute top-full left-0 w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-2xl shadow-zinc-950/15 dark:shadow-zinc-950/60 z-50 animate-in fade-in duration-150">
                    <div className="p-2 border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex justify-between items-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Popular {cat.label} Utilities
                      </span>
                      
                      {/* View all button connected to Homepage Pills */}
                      <button
                        type="button"
                        onClick={() => handleCategoryNavigate(cat.query)}
                        className="text-[11px] font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View all <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      {catTools.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="block p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                        >
                          <p className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {t.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                            {t.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          <LanguageSelector />

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-400 dark:hover:border-violet-500 transition-all"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/tools');
              }}
              className="p-2 text-left rounded-lg bg-zinc-50 dark:bg-zinc-900"
            >
              All 80 Tools
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryNavigate(cat.query)}
                className="p-2 text-left rounded-lg bg-zinc-50 dark:bg-zinc-900"
              >
                {cat.label} Tools
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
