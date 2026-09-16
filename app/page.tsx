'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { TOOLS_REGISTRY, CATEGORIES, ToolMeta } from '@/data/toolsRegistry';
import { Search, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900">
      <Navbar />

      {/* Hero Zone */}
      <section className="mx-auto max-w-5xl px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-medium text-violet-700 shadow-sm mb-6">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span>Living Companion Architecture</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-zinc-950 max-w-4xl mx-auto leading-[1.15]">
          Every Tool You Need. <br />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
            Instant In-Browser Execution.
          </span>
        </h1>

        <p className="mt-4 text-base text-zinc-600 sm:text-lg max-w-2xl mx-auto">
          Execute code compilers, calculate finance plans, crop images, and process PDFs locally. Zero uploads, zero latency.
        </p>

        {/* Conversational Search Input */}
        <div className="mt-8 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What wish can I grant today? (e.g. compress image, online python, sip)..."
              className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-4 text-sm shadow-sm transition-all focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-500/10 placeholder:text-zinc-400"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-violet-300 hover:text-zinc-900'
                }`}
              >
                {category === 'All' ? 'All Tools' : `${category} Tools`}
              </button>
            );
          })}
        </div>

        {/* Tools Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 pb-20">
          {filteredTools.map((tool: ToolMeta) => (
            <div
              key={tool.slug}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all hover:border-violet-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600">
                    {tool.category} Tools
                  </span>
                  <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                    {tool.badge}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-zinc-900 group-hover:text-violet-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                  {tool.description}
                </p>

                {/* Living Companion Micro-Hint */}
                <div className="mt-4 rounded-xl bg-violet-50/60 p-3 border border-violet-100/80">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-violet-800">
                    <Zap className="h-3 w-3 text-violet-600" />
                    <span>Companion Flow</span>
                  </div>
                  <p className="mt-1 text-[11px] text-violet-700/90 leading-tight">
                    {tool.companionPitch}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold text-violet-600">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> Client Local
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Launch Engine <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
