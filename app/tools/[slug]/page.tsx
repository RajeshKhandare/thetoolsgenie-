import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolEngineRunner from '@/components/ToolEngineRunner';
import { TOOLS_REGISTRY, ToolMeta } from '@/data/toolsRegistry';
import { ShieldCheck, Cpu, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tool = TOOLS_REGISTRY.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | TheToolsGenie',
      description: 'The requested utility is not available.',
    };
  }

  const title = `${tool.name} – Free Online Utility | TheToolsGenie`;
  const description = `${tool.description} Fast, secure, and client-side executed in your browser.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://thetoolsgenie-beta.vercel.app/tools/${tool.slug}`,
      siteName: 'TheToolsGenie',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
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
    (t) => t.slug !== tool.slug && t.category === tool.category
  ).slice(0, 3);

  // Dynamic FAQs tailored specifically to tool context
  const dynamicFaqs = [
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes, ${tool.name} is 100% free with unlimited usage, no account signup, and no subscription tiers.`
    },
    {
      question: `Does ${tool.name} store or upload my private files or data?`,
      answer: `No. ${tool.name} runs entirely inside your web browser using HTML5 Canvas, WebAssembly, and modern JavaScript engines. No files or inputs ever touch remote servers.`
    },
    {
      question: `Can I use ${tool.name} on mobile devices?`,
      answer: `Yes, TheToolsGenie is fully responsive. You can execute ${tool.name} on iOS, Android, macOS, Windows, or Linux browsers seamlessly.`
    },
    {
      question: `What is the maximum file size or input limit for ${tool.name}?`,
      answer: `Because processing occurs locally inside your device's memory (RAM), limits are defined solely by your browser's allocated memory rather than server bandwidth restrictions.`
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dynamicFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-violet-100 selection:text-violet-900 transition-colors flex flex-col justify-between">
      <div>
        <Navbar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <main className="mx-auto max-w-5xl px-4 pt-8 sm:pt-10 pb-16 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
              {tool.name}
            </h1>
            
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* 100% Active Universal Runner */}
          <ToolEngineRunner tool={tool} />

          {/* Recommended Companion Tool */}
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

         {/* Interactive FAQs Section - Clean Structured List */}
          <section className="mt-14 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2.5 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-zinc-400 font-medium">
                  Common queries about {tool.name} security and runtime
                </p>
              </div>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {dynamicFaqs.map((faq, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-start gap-2.5 leading-snug">
                    <span className="text-violet-600 dark:text-violet-400 font-mono text-xs mt-0.5 font-bold">
                      0{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Related {tool.category} Utilities</h3>
                <Link href="/tools" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                  Explore All 80 Tools →
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
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
