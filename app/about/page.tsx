import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cpu, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-sm space-y-10">
            
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-8 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Architectural Mission
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
                About TheToolsGenie
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Rebuilding web utilities around client-side privacy, instantaneous WASM compilation, and zero cloud uploads.
              </p>
            </div>

            <section className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                Legacy utility platforms rely on obsolete architectures: whenever you crop an image, format SQL queries, or calculate loans, your sensitive files are uploaded to third-party cloud VMs. This incurs needless waiting latency and compromises file confidentiality.
              </p>
              <p>
                <strong>TheToolsGenie</strong> was engineered as an ultra-fast in-browser alternative. By executing calculations and media rendering through local client APIs, every task completes in microseconds without ever leaving your machine.
              </p>
            </section>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 p-5 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 mb-3">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Client WASM Compute</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">Compilers run locally inside isolated WebAssembly environments without server dependencies.</p>
              </div>

              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 p-5 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Absolute Privacy</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">Zero remote file storage. All operational memory is garbage-collected upon browser tab closure.</p>
              </div>

              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 p-5 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-3">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Instant 0ms Feedback</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">No upload queues or server timeouts. Your device hardware delivers instant processing.</p>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
