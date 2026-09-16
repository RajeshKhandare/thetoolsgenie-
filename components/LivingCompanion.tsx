'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ArrowRight, ShieldCheck, ChevronUp } from 'lucide-react';
import { ToolMeta, TOOLS_REGISTRY } from '@/data/toolsRegistry';
interface CompanionProps {
  currentTool: ToolMeta;
}
export default function LivingCompanion({ currentTool }: CompanionProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const companionTool = TOOLS_REGISTRY.find(
    (t) => t.slug === currentTool.companionToolSlug
  );
  return (
    <aside className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-auto">
      {!isMinimized ? (
        <div className="w-72 sm:w-80 rounded-2xl border border-violet-200 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 block leading-none">
                  Genie Companion
                </span>
                <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-2.5 w-2.5" /> Client Sandbox Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md transition-colors"
              title="Minimize Companion"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[11px] text-zinc-600 leading-snug">
            Executing <strong>{currentTool.name}</strong> entirely in browser RAM. Zero files leave your machine.
          </p>
          {companionTool && (
            <div className="mt-2.5 rounded-xl border border-violet-100 bg-violet-50/70 p-2.5">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-violet-700 block">
                ✦ Suggested Next Workflow
              </span>
              <p className="mt-0.5 text-[11px] text-zinc-700 font-medium leading-tight">
                {currentTool.companionPitch}
              </p>
              <Link
                href={`/tools/${companionTool.slug}`}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-violet-700 hover:text-violet-950 hover:underline"
              >
                Launch {companionTool.name} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-xl hover:bg-violet-700 transition-all hover:scale-105"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Genie Flow</span>
          <ChevronUp className="h-3 w-3" />
        </button>
      )}
    </aside>
  );
}
