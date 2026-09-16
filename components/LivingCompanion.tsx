'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { ToolMeta, TOOLS_REGISTRY } from '@/data/toolsRegistry';
interface CompanionProps {
  currentTool: ToolMeta;
}
export default function LivingCompanion({ currentTool }: CompanionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const companionTool = TOOLS_REGISTRY.find(
    (t) => t.slug === currentTool.companionToolSlug
  );
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="w-80 sm:w-96 rounded-2xl border border-violet-200 bg-white/95 p-4 shadow-xl backdrop-blur-md transition-all">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 block leading-tight">
                  Genie Companion
                </span>
                <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Client Memory Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3">
            <p className="text-xs text-zinc-600 leading-relaxed">
              &ldquo;Executing <strong>{currentTool.name}</strong> directly in your browser. No files or variables leave your machine.&rdquo;
            </p>
          </div>
          {companionTool && (
            <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50/70 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 block">
                ✦ Suggested Next Wish
              </span>
              <p className="mt-1 text-xs text-zinc-700 font-medium leading-snug">
                {currentTool.companionPitch}
              </p>
              <Link
                href={`/tools/${companionTool.slug}`}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 hover:underline"
              >
                Launch {companionTool.name} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-300 hover:scale-105 transition-all"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
