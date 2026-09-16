import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Scale, CheckSquare, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-sm space-y-8">
            
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Legal Terms
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                Terms of Service
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Last Updated: September 2026
              </p>
            </div>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Scale className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                1. Acceptance & Availability
              </h2>
              <p>
                By using TheToolsGenie, you agree to these Terms. All utilities are provided &ldquo;as is&rdquo; without warranties of continuous availability or commercial fitness.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                2. Commercial Rights & Ownership
              </h2>
              <p>
                You retain complete, unencumbered ownership of all assets generated or compiled through our tools. You may freely use, publish, and commercially exploit images, PDF compilations, or calculated tables without needing attribution.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                3. Financial & Informational Disclaimer
              </h2>
              <p>
                Calculators (including SIP, Compounding, and Loan engines) provide mathematical estimates only. They do not constitute formal investment advice or banking commitments.
              </p>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
