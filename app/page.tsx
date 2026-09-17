'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY, CATEGORIES, ToolMeta } from '@/data/toolsRegistry';
import {
  Search,
  FileText,
  Image as ImageIcon,
  Code,
  Calculator,
  Video,
  Type,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  MousePointerClick,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Layers,
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Are my uploaded files, photos, or documents safe on TheToolsGenie?',
    a: 'Yes, 100%. TheToolsGenie operates purely on client-side memory using HTML5 Canvas, WebAssembly, and local JavaScript workers. Your files never get uploaded to any external server or stored in the cloud.',
  },
  {
    q: 'Are there any hidden costs, credits, or file-size subscriptions?',
    a: 'None at all. All 80+ tools across PDF, Image, Code, and Finance categories are completely unrestricted, free forever, and require no account registration or payment details.',
  },
  {
    q: 'Can I use these developer and utility tools on mobile devices?',
    a: 'Absolutely. Every tool is optimized with responsive mobile viewports and lightweight execution, allowing you to compress, convert, or calculate directly on your smartphone browser.',
  },
  {
    q: 'Why are operations faster here compared to other online utility suites?',
    a: 'Traditional platforms require sending multi-megabyte files over the internet to a server queue and waiting for processing. We eliminate network overhead by executing the code directly on your device CPU and RAM.',
  },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync category state and scroll cleanly below the sticky navbar
  useEffect(() => {
    if (categoryParam) {
      const cleanParam = categoryParam.replace(/tools$/i, '').trim().toLowerCase();
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase().trim() === cleanParam
      );
      if (matched) {
        setSelectedCategory(matched);
        setTimeout(() => {
          const el = document.getElementById('tools');
          if (el) {
            const yOffset = -88;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 120);
      }
    }
  }, [categoryParam]);

  // Filter tools based on search query & selected category
  const filteredTools = useMemo(() => {
    return TOOLS_REGISTRY.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        tool.category.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase().replace(/\s+/g, '');

      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const displayedTools = useMemo(() => {
    if (searchQuery.trim().length > 0 || selectedCategory !== 'All') return filteredTools;
    return filteredTools.slice(0, 12);
  }, [filteredTools, searchQuery, selectedCategory]);

  const getToolIcon = (cat: string) => {
    switch (cat) {
      case 'PDF': return <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      case 'Image':
      case 'Image Crop': return <ImageIcon className="h-5 w-5 text-pink-500 dark:text-pink-400" />;
      case 'Compiler':
      case 'Developer': return <Code className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
      case 'Finance': return <Calculator className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
      case 'YouTube': return <Video className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
      default: return <Type className="h-5 w-5 text-violet-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 pt-8 sm:pt-14 pb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/40 px-3.5 py-1 text-[11px] font-bold text-violet-700 dark:text-violet-300 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> High-Performance Browser Utilities
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white max-w-4xl mx-auto leading-[1.14]">
            All the Free Online Tools{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              You Need.
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base font-normal text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed tracking-normal">
            Fast, secure, and client-side utilities for PDF documents, graphic transformations, code sandboxes, and financial planning.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. compress image, python, sip)..."
                className="w-full bg-transparent py-3 pl-11 pr-4 text-xs focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
            </div>
            <button className="rounded-2xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 transition-colors shadow-md shadow-violet-500/20">
              Search
            </button>
          </div>
        </section>

        {/* Category Filter Pills & Tools Grid */}
        <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 scroll-mt-24">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {category === 'All' ? 'Popular Tools' : `${category} Tools`}
                </button>
              );
            })}
          </div>

          <div className="mt-4 mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Showing {displayedTools.length} {selectedCategory === 'All' ? 'Popular' : selectedCategory} Utilities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedTools.map((tool: ToolMeta) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-3.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 transition-all hover:shadow-md hover:border-violet-400 dark:hover:border-violet-500 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-zinc-800/80 group-hover:scale-105 transition-transform mt-0.5">
                  {getToolIcon(tool.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold truncate text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.name}
                  </h3>
                  
                  <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 block mt-0.5">
                    {tool.category} Tools
                  </span>

                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {searchQuery.trim().length === 0 && selectedCategory === 'All' && (
            <div className="mt-10 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-8 py-3.5 text-xs font-extrabold hover:bg-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all shadow-md hover:scale-[1.02]"
              >
                <span>Explore All 80+ Tools</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 1: How It Works (Visual Process Illustration)
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              Frictionless Workflow
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Three Steps. Zero Waiting Time.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              No account creation, no subscription cards, and no server roundtrips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-600 dark:text-violet-400 font-black text-sm">
                  01
                </span>
                <MousePointerClick className="h-5 w-5 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Select Any Utility</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Pick from our library of 80+ specialized tools across PDF manipulation, raster graphics, code compilers, or calculators.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl border border-violet-200 dark:border-violet-900/80 bg-violet-50/40 dark:bg-violet-950/20 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white font-black text-sm shadow-md shadow-violet-500/20">
                  02
                </span>
                <Cpu className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Direct Local Execution</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Drop your assets into the canvas. Processing runs purely inside your browser memory with zero data transferred outside your machine.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                  03
                </span>
                <Zap className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Instant Export</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Download your output or inspect interactive results immediately without watermark obstructions or artificial waiting locks.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: Client Architecture & Privacy Badges
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-950/50 p-8 sm:p-12 shadow-sm">
            
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 text-[11px] font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" /> Client-Side Architecture
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Engineered for Complete Privacy & Zero Latency
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Unlike traditional tool websites that upload your confidential files to remote servers, TheToolsGenie executes every algorithm directly inside your browser.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 mb-4">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  100% In-Browser Privacy
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Your PDF documents, photos, and code snippets never leave your computer or touch our servers. Everything processes entirely inside your local device RAM.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Zero Upload Queues
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  No uploading delays or server queue bottlenecks. Conversions and compressions render at lightning-fast native speeds utilizing WebAssembly and HTML5 Canvas.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Unlimited & Free Forever
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Because computational load is handled client-side on your browser, there are no artificial file size limits, daily usage caps, or subscription paywalls.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">80+</p>
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Active Utilities</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">0ms</p>
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Server Latency</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">100%</p>
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Client-Side Privacy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">$0</p>
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Free Usage Always</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 3: FAQ Accordion (AdSense Rich Content Guard)
            ======================================================== */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              <HelpCircle className="h-3.5 w-3.5" /> Common Questions
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-zinc-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-violet-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 4: SaaS Bottom CTA Banner
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20 mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-12 sm:px-16 sm:py-16 text-center text-white border border-zinc-800 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Layers className="h-10 w-10 text-violet-400 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Ready to Boost Your Digital Productivity?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Join creators, software engineers, and digital agencies using TheToolsGenie every day for clean, zero-trace file workflows.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools"
                  className="rounded-2xl bg-violet-600 px-7 py-3 text-xs font-bold text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/30 hover:scale-105"
                >
                  Explore All 80+ Utilities
                </Link>
                <a
                  href="#tools"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 px-7 py-3 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                >
                  Pick a Tool
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950" />}>
      <HomeContent />
    </Suspense>
  );
}
