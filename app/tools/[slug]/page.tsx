import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY, ToolMeta } from '@/data/toolsRegistry';
import PdfEngine from '@/components/engines/PdfEngine';
import ImageEngine from '@/components/engines/ImageEngine';
import CompilerEngine from '@/components/engines/CompilerEngine';
import FinanceEngine from '@/components/engines/FinanceEngine';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((t) => ({ slug: t.slug }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Find companion tools for the zero dead-end recommendation section
  const companionTools = TOOLS_REGISTRY.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 4);

  // Dynamic Engine Routing
  const renderEngine = () => {
    const cat = tool.category.toLowerCase();
    if (cat.includes('pdf')) return <PdfEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('image')) return <ImageEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('compiler') || cat.includes('developer')) return <CompilerEngine toolSlug={tool.slug} toolName={tool.name} />;
    return <FinanceEngine toolSlug={tool.slug} toolName={tool.name} />;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Standalone Product Header */}
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-4">
              <Link href="/" className="hover:text-violet-600 transition">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/?category=${encodeURIComponent(tool.category)}#tools`} className="hover:text-violet-600 transition">
                {tool.category} Tools
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-zinc-900 dark:text-white font-bold">{tool.name}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
              {tool.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
              {tool.description}
            </p>

            {/* Privacy Trust Banner */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 px-3.5 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Client-Side Execution: No files or data are ever transmitted to any server.</span>
            </div>
          </div>
        </div>

        {/* Tool Interactive Runner Workspace */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {renderEngine()}

          {/* Standalone Guide / Specifications (Prevents Thin Content) */}
          <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">
                How to use {tool.name}
              </h2>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Choose or input your file directly into the sandbox above.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Customize any conversion, ratio, or compilation parameters instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Download or copy the generated output with zero wait time.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">
                Privacy & Data Security
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                This utility operates directly inside your device memory (RAM) utilizing modern browser APIs. Unlike cloud converters, your proprietary documents remain protected on your hardware.
              </p>
            </div>
          </div>

          {/* Companion / Suggested Tools Section (Zero Dead-End) */}
          <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">
                Related {tool.category} Tools
              </h2>
              <Link
                href={`/?category=${encodeURIComponent(tool.category)}#tools`}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                Explore all {tool.category} tools <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {companionTools.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/tools/${comp.slug}`}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-violet-500 transition group shadow-sm"
                >
                  <p className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 transition truncate">
                    {comp.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1 font-normal">
                    {comp.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
