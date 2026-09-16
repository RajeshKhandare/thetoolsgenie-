'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY, CATEGORIES, ToolMeta } from '@/data/toolsRegistry';
import { Search, FileText, Image as ImageIcon, Code, Calculator, Video, Type } from 'lucide-react';

export default function AllToolsPage() {
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

        {/* Directory Header */}
        <section className="mx-auto max-w-5xl px-4 pt-8 sm:pt-10 pb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Full Tool Directory
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            Explore All Free Online Tools
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Browse our complete collection of client-side browser utilities. Search, sort, and filter instantly.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all tools..."
                className="w-full bg-transparent py-2.5 pl-11 pr-4 text-xs focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
            </div>
          </div>
        </section>

        {/* Category Filter Pills */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
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

          {/* Full Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20">
            {filteredTools.map((tool: ToolMeta) => (
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
        </section>
      </div>

      <Footer />
    </div>
  );
}
