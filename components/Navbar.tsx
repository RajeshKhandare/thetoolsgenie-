'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon, Search } from 'lucide-react';

export default function Navbar({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}) {
  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors ${
      isDark ? 'bg-[#0f172a] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight leading-none">
              TheTools<span className="text-blue-500">Genie</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">by UtilityLab</span>
          </div>
        </Link>

        {/* Center Quick Navigation Links (TinyWow style) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
          <Link href="/#tools" className="hover:text-blue-500 transition-colors">PDF Tools</Link>
          <Link href="/#tools" className="hover:text-blue-500 transition-colors">Image Tools</Link>
          <Link href="/#tools" className="hover:text-blue-500 transition-colors">Compilers</Link>
          <Link href="/#tools" className="hover:text-blue-500 transition-colors">Finance Tools</Link>
        </nav>

        {/* Right Actions: Dark/Light Filter + Action */}
        <div className="flex items-center gap-3">
          {/* Day / Night Toggle Icon */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-xl border transition-all ${
              isDark 
                ? 'border-zinc-700 bg-zinc-800/80 text-yellow-400 hover:bg-zinc-700' 
                : 'border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
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
