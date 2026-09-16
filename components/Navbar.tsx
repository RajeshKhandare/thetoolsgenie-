'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-violet-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-zinc-900 leading-none">
              TheTools<span className="text-violet-600">Genie</span>
            </span>
            <span className="text-[10px] font-medium text-zinc-400 mt-0.5">
              Client-Side Utility Suite
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% In-Browser · ₹0 Server Upload</span>
          </div>
          <div className="flex items-center gap-1.5 text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200/60">
            <Terminal className="h-3.5 w-3.5 text-violet-600" />
            <span>WASM & Canvas Compute</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#tools"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
