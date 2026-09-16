import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolEngineRunner from '@/components/ToolEngineRunner';
import { TOOLS_REGISTRY, ToolMeta } from '@/data/toolsRegistry';
import { ShieldCheck, Cpu, BookOpen, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS_REGISTRY.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const companionTool = TOOLS_REGISTRY.find(
    (t) => t.slug === tool.companionToolSlug
  );

  const relatedTools = TOOLS_REGISTRY.filter(
    (t) => t.slug !== tool.slug
  ).slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is this ${tool.name} completely free to use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${tool.name} is 100% free with no registration, no hidden usage tiers, and zero server upload latency.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does ${tool.name} store or upload my files and queries?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No. All operations, mathematical calculations, and media processing execute strictly within your client browser RAM via WebAssembly and Canvas APIs.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-violet-100 selection:text-violet-900 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <main className="mx-auto max-w-5xl px-4 pt-10 pb-16 sm:px-6">
          {/* Standalone Tool Hero */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-zinc-900 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-400 border border-violet-200/60 dark:border-zinc-800 mb-4">
              <Zap className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>{tool.badge} · Instant Local Execution</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
              {tool.name}
            </h1>
            
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Engine Runner */}
          <ToolEngineRunner tool={tool} />

          {/* Next Recommended Workflow */}
          {companionTool && (
            <section className="mt-12 rounded-2xl border border-violet-200 dark:border-zinc-800 bg-gradient-to-r from-violet-50/70 via-white to-indigo-50/70 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                  ✦ Recommended Workflow
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {tool.companionPitch}
                </p>
              </div>
              <Link
                href={`/tools/${companionTool.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-all shrink-0"
              >
                <span>Launch {companionTool.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          )}

          {/* E-E-A-T Technical Guide */}
          <article className="mt-14 space-y-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm text-zinc-800 dark:text-zinc-200">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full w-fit border border-emerald-200/60 dark:border-emerald-800 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Server Uploads · 100% Client-Side Local</span>
              </div>
              <h2 className="text-xl font-black tracking-tight sm:text-2xl text-zinc-950 dark:text-white">
                How {tool.name} Operates
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Technical overview of browser thread isolation and memory sandboxing.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                Browser Thread Execution Paradigm
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Unlike traditional online utility platforms that force users to upload files, queries, or image binaries across remote servers, this tool operates strictly within your local machine RAM.
              </p>
            </section>

            {/* Tech Specs Table */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                  <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold border-b border-zinc-200 dark:border-zinc-700">
                    <tr>
                      <th className="p-3">Parameter</th>
                      <th className="p-3">Runtime Specification</th>
                      <th className="p-3">Privacy Guarantee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                    <tr>
                      <td className="p-3 font-medium text-zinc-900 dark:text-white">Engine Sandbox</td>
                      <td className="p-3">{tool.badge}</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">100% Client Local</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-zinc-900 dark:text-white">Network Latency</td>
                      <td className="p-3">0ms (Local RAM Compute)</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Zero Remote Uploads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </article>

          {/* Related Utilities */}
          <section className="mt-14">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Related Utilities</h3>
              <Link href="/#tools" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                Explore All Tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((relTool: ToolMeta) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}`}
                  className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:border-violet-400 dark:hover:border-violet-500 transition-all text-left"
                >
                  <span className="text-[10px] font-semibold text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {relTool.category}
                  </span>
                  <h4 className="mt-2 text-xs font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {relTool.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {relTool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
