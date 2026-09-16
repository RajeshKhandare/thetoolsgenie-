import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LivingCompanion from '@/components/LivingCompanion';
import ToolEngineRunner from '@/components/ToolEngineRunner';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { ShieldCheck, Cpu, Globe2, BookOpen } from 'lucide-react';
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is this ${tool.name} completely free to use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${tool.name} is 100% free with no registration, no file limits, and no server upload requirements.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does ${tool.name} upload my files or data to external servers?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No. All operations, memory buffers, and scripts execute entirely within your client browser using WebAssembly and HTML5 Canvas.`,
        },
      },
    ],
  };
  return (
    <div className="min-h-screen bg-zinc-50/40 text-zinc-900">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-violet-600">Home</Link>
          <span>/</span>
          <span>{tool.category} Tools</span>
          <span>/</span>
          <span className="font-semibold text-zinc-900">{tool.name}</span>
        </div>
        <ToolEngineRunner tool={tool} />
        <article className="mt-14 space-y-8 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-sm text-zinc-800">
          <div className="border-b border-zinc-100 pb-6">
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
              Technical Guide: {tool.name} Architecture
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              An authoritative breakdown of client-side execution, algorithmic complexity, and memory safety.
            </p>
          </div>
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-violet-600" />
              How It Works Under the Hood
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
              Unlike traditional SaaS utility platforms that force users to upload payloads to remote EC2 instances,
              this tool operates under a strict <strong>Zero-Server Architecture</strong>. Code, file streams, and memory buffers
              are managed inside your browser thread via sandboxed WebAssembly (WASM) and Canvas memory allocations.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900">Architecture & Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-100">
                <thead className="bg-zinc-50 text-zinc-700 font-bold border-b border-zinc-100">
                  <tr>
                    <th className="p-3">Parameter</th>
                    <th className="p-3">Specification</th>
                    <th className="p-3">Privacy Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600">
                  <tr>
                    <td className="p-3 font-medium text-zinc-900">Execution Sandbox</td>
                    <td className="p-3">{tool.badge}</td>
                    <td className="p-3 text-emerald-600 font-semibold">100% Client-Side Local</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-900">Server Latency</td>
                    <td className="p-3">0ms (Local RAM)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Zero Uploads</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-900">Data Retention</td>
                    <td className="p-3">Garbage-collected on tab close</td>
                    <td className="p-3 text-emerald-600 font-semibold">Zero Telemetry</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="space-y-4 pt-4 border-t border-zinc-100">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-violet-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <div className="rounded-xl border border-zinc-100 p-4 bg-zinc-50/50">
                <h4 className="text-xs font-bold text-zinc-900">
                  Is {tool.name} free for commercial use?
                </h4>
                <p className="mt-1 text-xs text-zinc-600">
                  Yes. All output files, parsed data, and computation graphs generated by this engine are 100% royalty-free.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-100 p-4 bg-zinc-50/50">
                <h4 className="text-xs font-bold text-zinc-900">
                  Why does this tool execute faster than other web utilities?
                </h4>
                <p className="mt-1 text-xs text-zinc-600">
                  Standard websites upload files over your network before running logic. This engine bypasses network serialization completely by computing in browser memory.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <LivingCompanion currentTool={tool} />
    </div>
  );
}
