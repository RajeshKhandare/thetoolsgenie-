'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY, CATEGORIES, ToolMeta } from '@/data/toolsRegistry';
import { Search, FileText, Image as ImageIcon, Code, Calculator, Video, Type } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const getToolIcon = (cat: string) => {
    switch (cat) {
      case 'PDF': return <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />;
      case 'Image':
      case 'Image Crop': return <ImageIcon className="h-4 w-4 text-pink-500 dark:text-pink-400" />;
      case 'Compiler':
      case 'Developer': return <Code className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
      case 'Finance': return <Calculator className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />;
      case 'YouTube': return <Video className="h-4 w-4 text-rose-500 dark:text-rose-400" />;
      default: return <Type className="h-4 w-4 text-violet-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 pt-14 pb-8 text-center">
          <h1 className="text-3xl font-black sm:text-5xl lg:text-6xl tracking-tight text-zinc-950 dark:text-white">
            Free Tools to Make{' '}
            <span className="rounded-xl bg-violet-600 px-3.5 py-1 text-white inline-block shadow-md shadow-violet-500/20">
              Your Work
            </span>{' '}
            Instant
          </h1>

          <p className="mt-4 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Execute compilers, calculate finance plans, process PDFs, and crop images directly in your browser RAM. Zero uploads, zero latency.
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

        {/* Category Pills */}
        <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6">
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
                  {category === 'All' ? 'All Tools' : `${category} Tools`}
                </button>
              );
            })}
          </div>

          {/* Compact 4-Column Tool Cards Grid */}
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20">
            {filteredTools.map((tool: ToolMeta) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all hover:scale-[1.02] hover:border-violet-400 dark:hover:border-violet-500 cursor-pointer shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-zinc-800">
                  {getToolIcon(tool.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-zinc-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 block mt-0.5">
                    {tool.category} Tools
                  </span>
                  <p className="mt-1 text-[11px] leading-snug line-clamp-2 text-zinc-500 dark:text-zinc-400">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
