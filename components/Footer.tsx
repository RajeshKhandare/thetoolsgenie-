'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/data/toolsRegistry';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-zinc-900">
                TheTools<span className="text-violet-600">Genie</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-zinc-500">
              High-performance client-side utility suite. Compilers, financial engines, media cropping, and developer tools executing locally inside browser memory.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Server Uploads · Strict Client Privacy</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Tool Categories</h4>
            <ul className="mt-3 space-y-2 text-xs">
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat}><Link href="/#tools" className="transition-colors hover:text-violet-600">{cat} Utilities</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Trust & Legal</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/about" className="transition-colors hover:text-violet-600">About Platform</Link></li>
              <li><Link href="/privacy-policy" className="transition-colors hover:text-violet-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-violet-600">Terms of Service</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-violet-600">Contact & Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-100 pt-6 text-[11px] text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} TheToolsGenie. All tools execute locally under client runtime.</p>
          <p>Built for instantaneous browser execution</p>
        </div>
      </div>
    </footer>
  );
}
