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
} from 'lucide-react';

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sync category state whenever the URL query parameter changes
  useEffect(() => {
    if (categoryParam) {
      const cleanParam = categoryParam.replace(/tools$/i, '').trim().toLowerCase();
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase().trim() === cleanParam
      );
      if (matched) {
        setSelectedCategory(matched);
        setTimeout(() => {
          document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [categoryParam]);

  // Filter tools based on search & category
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

  // If filtered by category or search, show all matching; on default homepage, show top 12
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
        <section className="mx-auto max-w-5xl px-4 pt-8 sm:pt-12 pb-6 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white max-w-4xl mx-auto leading-[1.14]">
            All the Free Online Tools{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              You Need.
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-normal text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed tracking-normal">
            Simple, fast, and completely free utilities for PDF, images, code, and financial calculations.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. compress image, python, sip)..."
                className="w-full bg-transparent py-2.5 pl-11 pr-4 text-xs focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
            </div>
            <button className="rounded-2xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors shadow-md shadow-violet-500/20">
              Search
            </button>
          </div>
        </section>

        {/* Category Filter Pills */}
        <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
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

          {/* Active Category Heading & Counter */}
          <div className="mt-4 mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Showing {displayedTools.length} {selectedCategory === 'All' ? 'Popular' : selectedCategory} Utilities
            </p>
          </div>

          {/* Tools Grid */}
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

          {/* "Explore All Tools" Button (when default popular is active) */}
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
            NEW SECTION: Performance & Privacy Architecture (Fills Gap)
            ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20 mb-16">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-950/50 p-8 sm:p-12 shadow-sm">
            
            {/* Header */}
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

            {/* 3 Pillar Cards */}
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

            {/* Micro Stats Strip */}
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
