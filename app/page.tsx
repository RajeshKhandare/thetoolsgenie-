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
  const [isDark, setIsDark] = useState(true); // Default matching TinyWow primary dark hero

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

  // TinyWow category icon mapping
  const getToolIcon = (cat: string) => {
    switch (cat) {
      case 'PDF': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Image':
      case 'Image Crop': return <ImageIcon className="h-4 w-4 text-amber-500" />;
      case 'Compiler':
      case 'Developer': return <Code className="h-4 w-4 text-emerald-500" />;
      case 'Finance': return <Calculator className="h-4 w-4 text-violet-500" />;
      case 'YouTube': return <Video className="h-4 w-4 text-rose-500" />;
      default: return <Type className="h-4 w-4 text-cyan-500" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDark ? 'bg-[#0b0f19] text-white' : 'bg-slate-50 text-zinc-900'
    }`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* TinyWow Exact Hero Section */}
      <section className="mx-auto max-w-5xl px-4 pt-14 pb-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight">
          Free Tools to Make{' '}
          <span className="rounded-lg bg-blue-600 px-3 py-1 text-white inline-block">
            Your Life
          </span>{' '}
          Simple
        </h1>

        <p className={`mt-3 text-xs sm:text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          We offer PDF, video, image, compiler and financial tools to make your work easier.
        </p>

        {/* Centered Search Bar */}
        <div className="mt-8 max-w-xl mx-auto flex items-center gap-2">
          <div className={`relative flex-1 rounded-2xl border ${
            isDark ? 'border-zinc-800 bg-[#161f30]' : 'border-zinc-300 bg-white'
          }`}>
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent py-3 pl-11 pr-4 text-xs focus:outline-none"
            />
          </div>
          <button className="rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
            Search
          </button>
        </div>
      </section>

      {/* Categories Bar */}
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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'bg-[#161f30] text-zinc-300 hover:bg-[#1f2c42]'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {category === 'All' ? 'All Tools' : `${category} Tools`}
              </button>
            );
          })}
        </div>

        {/* TinyWow Compact 4-Column Tool Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20">
          {filteredTools.map((tool: ToolMeta) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className={`group flex items-start gap-3 rounded-2xl border p-4 transition-all hover:scale-[1.02] cursor-pointer ${
                isDark
                  ? 'border-zinc-800/80 bg-[#161f30]/80 hover:bg-[#1a253a] hover:border-blue-500/50'
                  : 'border-zinc-200 bg-white hover:border-blue-400 hover:shadow-sm'
              }`}
            >
              {/* Tool Category Icon */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isDark ? 'bg-zinc-800/90' : 'bg-slate-100'
              }`}>
                {getToolIcon(tool.category)}
              </div>

              {/* Tool Text Information */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-[10px] font-medium text-blue-500 block mt-0.5">
                  {tool.category} Tools
                </span>
                <p className={`mt-1 text-[11px] leading-snug line-clamp-2 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
