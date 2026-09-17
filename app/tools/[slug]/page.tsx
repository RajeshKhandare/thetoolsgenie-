import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import PdfEngine from '@/components/engines/PdfEngine';
import ImageEngine from '@/components/engines/ImageEngine';
import CompilerEngine from '@/components/engines/CompilerEngine';
import FinanceEngine from '@/components/engines/FinanceEngine';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Lock,
  Zap,
} from 'lucide-react';

export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((t) => ({ slug: t.slug }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const companionTools = TOOLS_REGISTRY.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 4);

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

        {/* Header Strip */}
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 py-7">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-3">
              <Link href="/" className="hover:text-violet-600 transition">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/?category=${encodeURIComponent(tool.category)}#tools`} className="hover:text-violet-600 transition">
                {tool.category} Tools
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-zinc-900 dark:text-white font-bold">{tool.name}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
              {tool.name}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
              {tool.description}
            </p>

            {/* Privacy Trust Pill */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Client-Side: Zero server uploads, processed in browser memory.</span>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {renderEngine()}

          {/* Polished Guide & Privacy Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: How To Use */}
            <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                  How to use {tool.name}
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    1
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Select, drop, or input your file directly into the sandbox canvas above.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    2
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Adjust dimensions, compression ratio, or settings with instant live preview.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    3
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Download your converted output directly without queues, locks, or watermarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Privacy Guarantee */}
            <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                    Privacy & In-Browser Execution
                  </h2>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                  Unlike traditional cloud converters that upload your personal documents to third-party servers, TheToolsGenie operates entirely inside your local device RAM using WebAssembly and HTML5 Canvas.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Zero Server Uploads • Zero Logs • 100% Private</span>
              </div>
            </div>

          </div>

          {/* Companion / Related Tools Grid */}
          <div className="mt-14">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
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
                  className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 hover:border-violet-500 dark:hover:border-violet-400 transition-all hover:-translate-y-0.5 group shadow-sm"
                >
                  <p className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                    {comp.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1.5 font-normal leading-relaxed">
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
