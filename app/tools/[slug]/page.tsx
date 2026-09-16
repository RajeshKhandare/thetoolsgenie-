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

function getCategoryFaqs(tool: ToolMeta) {
  switch (tool.category) {
    case 'PDF':
      return [
        {
          question: `Does ${tool.name} store or view the contents of my PDF?`,
          answer: `No. ${tool.name} processes byte streams locally in your browser memory via WebAssembly and Canvas APIs. No documents or data are transferred to external servers.`,
        },
        {
          question: `Will page quality, font rendering, or text sharpness degrade?`,
          answer: `Vector elements, high-resolution text layers, and embedded layout structures remain completely intact without lossy compression.`,
        },
        {
          question: `Can I process password-protected PDF documents?`,
          answer: `Yes, provided you provide the correct authorization password to decrypt and parse the document in local client RAM.`,
        },
        {
          question: `Is there any page limit or restriction on document length?`,
          answer: `Because processing runs client-side, the file capacity depends entirely on your machine's browser RAM rather than arbitrary server limits.`,
        },
      ];

    case 'Image':
    case 'Image Crop':
      return [
        {
          question: `Does ${tool.name} preserve alpha transparency and color depth?`,
          answer: `Yes, transparent alpha channels for PNG and WebP files are fully preserved alongside high dynamic range color coordinates.`,
        },
        {
          question: `Is there an upload limit on image dimensions or megapixels?`,
          answer: `No server ceiling exists. You can process high-resolution DSLR photos or large canvas graphics up to the browser memory allocation.`,
        },
        {
          question: `Will my exported image contain any watermark or branding?`,
          answer: `No. All rendered output graphics are 100% clean, unbranded, and suitable for direct commercial and personal publishing.`,
        },
        {
          question: `Are EXIF metadata tags preserved during image processing?`,
          answer: `Standard processing optimizes file payloads by stripping redundant metadata, but you can retain clean source pixels without visual degradation.`,
        },
      ];

    case 'Finance':
      return [
        {
          question: `How accurate are the formulas applied in ${tool.name}?`,
          answer: `All figures follow standardized banking amortization, CAGR models, and standard compound growth interest algorithms.`,
        },
        {
          question: `Are tax adjustments or inflation factored into these outputs?`,
          answer: `Calculations represent nominal, pre-tax metrics. Pair these numbers with our Inflation Calculator to evaluate real purchasing power.`,
        },
        {
          question: `Can I export or copy the calculation results for financial reports?`,
          answer: `Yes, results can be copied directly with one click to transfer into spreadsheets, invoices, or budget planners.`,
        },
        {
          question: `Does this calculator recommend specific investment products?`,
          answer: `No. This utility functions strictly as a mathematical visualization engine and does not constitute certified financial advice.`,
        },
      ];

    case 'Compiler':
      return [
        {
          question: `How does ${tool.name} compile code without a remote server?`,
          answer: `Execution runs locally using lightweight WebAssembly (WASM) and browser V8 JavaScript runtimes directly inside your browser tab.`,
        },
        {
          question: `Can I make outbound network requests (API calls) from this runner?`,
          answer: `Cross-origin sandbox policies prevent external socket calls to guarantee user security and local containment.`,
        },
        {
          question: `What prevents my browser tab from hanging during heavy execution?`,
          answer: `Execution handles thread isolation and automatic timeout limits to stop long or infinite computational loops safely.`,
        },
        {
          question: `Is my source code or database query logged anywhere?`,
          answer: `No. Code remains strictly in volatile client memory and is wiped clean as soon as the tab is refreshed.`,
        },
      ];

    case 'Converters':
    case 'Calculators':
      return [
        {
          question: `Which measurement standards are used by ${tool.name}?`,
          answer: `Calculations adhere strictly to International System of Units (SI) standards and standardized conversion factors.`,
        },
        {
          question: `Can I run conversions offline without an active internet connection?`,
          answer: `Yes. Once the web application is loaded in your browser cache, the conversion logic functions fully offline.`,
        },
        {
          question: `What degree of fractional precision is maintained?`,
          answer: `Outputs preserve high floating-point precision, rounded cleanly for display while avoiding common binary floating inaccuracies.`,
        },
        {
          question: `Does ${tool.name} support negative or exponential values?`,
          answer: `Yes, standard negative offsets (such as sub-zero temperatures) and large numerical values are parsed seamlessly.`,
        },
      ];

    default: // Developer & Text Utilities
      return [
        {
          question: `Is data entered into ${tool.name} recorded or sent to a database?`,
          answer: `Never. String manipulations, token parsing, and encoding transformations execute strictly in client RAM and vanish on refresh.`,
        },
        {
          question: `Does ${tool.name} support UTF-8, multi-byte languages, and emojis?`,
          answer: `Yes. Full Unicode UTF-8 character sets, special symbols, and multi-byte language scripts are supported natively.`,
        },
        {
          question: `Can I use ${tool.name} with sensitive tokens, keys, or JSON payloads?`,
          answer: `Yes. Because zero network packets are dispatched during string parsing, your confidential keys remain entirely on your local machine.`,
        },
        {
          question: `Does ${tool.name} provide 1-click clipboard integration?`,
          answer: `Yes. Simply hit the copy button to transfer sanitized, converted, or encoded results straight to your system clipboard.`,
        },
      ];
  }
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

  const dynamicFaqs = getCategoryFaqs(tool);

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

          {/* Tool Engine Runner */}
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

          {/* FAQ Section with Clean Hierarchy */}
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
                  Common queries about {tool.name} security, data privacy, and usage limits
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Related {tool.category} Utilities
                </h3>
                <Link href="/tools" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
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
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
