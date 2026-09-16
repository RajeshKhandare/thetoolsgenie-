import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, FileLock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-sm space-y-8">
            
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Trust & Security
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                Privacy Policy
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Effective: September 2026 · Client-Side Zero Storage Standard
              </p>
            </div>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Lock className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                1. Complete In-Browser Execution Guarantee
              </h2>
              <p>
                TheToolsGenie runs entirely on a client-side execution model. Whether you are using our code compilers, financial calculators, image compressors, or PDF tools, all computations take place directly in your device RAM through HTML5 Canvas, Web Workers, and WebAssembly.
              </p>
              <p>
                Your files, inputs, and documents are never transferred to remote servers or stored on remote databases.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                2. Data Retention & Tab Termination
              </h2>
              <p>
                We do not maintain user accounts or personal profiles. All memory buffers created during your session are immediately purged via browser garbage collection as soon as the tab or window is closed.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                3. Third-Party Analytics & Cookies
              </h2>
              <p>
                To keep this platform 100% free, we may integrate non-intrusive traffic telemetry and contextual advertising networks (e.g. Google AdSense). These services may use standard browser cookies for analytics and fraud detection, but they never have access to your in-browser tool inputs or document payloads.
              </p>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
