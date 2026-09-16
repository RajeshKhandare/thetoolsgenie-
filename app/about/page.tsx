import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Zap, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section - Balanced Top Spacing */}
        <section className="mx-auto max-w-5xl px-4 pt-8 sm:pt-10 pb-8 text-center sm:px-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            About TheToolsGenie
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.14]">
            Making Everyday Digital Tasks{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Effortless.
            </span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A free, multi-category utility hub built to help students, developers, and creators solve daily tasks without paywalls or complicated software.
          </p>

          <div className="mt-6">
            <Link
              href="/#tools"
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-700 transition-all hover:scale-[1.02]"
            >
              <span>Explore All Free Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Realistic Trust Metrics Bar */}
        <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-violet-600 dark:text-violet-400">80+</p>
              <p className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">Free Utilities</p>
              <p className="text-[11px] text-zinc-400">Expanding continuously</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-violet-600 dark:text-violet-400">100%</p>
              <p className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">No Paywalls</p>
              <p className="text-[11px] text-zinc-400">No hidden subscriptions</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-violet-600 dark:text-violet-400">0</p>
              <p className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">Sign-Ups Needed</p>
              <p className="text-[11px] text-zinc-400">Instant access to all tools</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-violet-600 dark:text-violet-400">Private</p>
              <p className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">By Design</p>
              <p className="text-[11px] text-zinc-400">Files process right in your browser</p>
            </div>
          </div>
        </section>

        {/* Narrative: Our Story */}
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-12">
          <article className="space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Built to Solve Real-World Daily Inconveniences
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
              <p>
                TheToolsGenie started from a simple frustration: whenever you need to quickly resize an image, test a query, calculate interest, or grab a thumbnail, modern search results lead to bloated websites covered in paywalls, forced email registrations, or daily limits.
              </p>
              <p>
                We believed simple tasks should remain simple. You shouldn&apos;t need to download heavy desktop software or hand over personal data just to format text or convert an image.
              </p>
              <p>
                Our vision is straightforward: bring together high-utility everyday digital tools into a clean, modern interface where anyone can get their job done instantly and get back to what matters.
              </p>
            </div>
          </article>

          {/* 4 Core Pillars */}
          <section className="space-y-5">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Core Values
              </span>
              <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white mt-1">
                What Guides TheToolsGenie
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 mb-2">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Fast & Accessible</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Every tool loads clean and fast on both mobile and desktop. No installation, no account creation, and zero waiting time.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Privacy First</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We don&apos;t ask for accounts or store your documents. Work happens directly inside your browser so your data remains yours.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-2">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Free for Everyone</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Essential digital utilities should be open to all. Students, creators, and freelancers can use every feature without hidden tiers.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 mb-2">
                  <Heart className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Built on Community Feedback</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We actively review tool suggestions and bug reports sent via our contact desk to continuously polish and expand the suite.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
