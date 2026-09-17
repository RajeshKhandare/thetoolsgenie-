'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import {
  Upload,
  FileText,
  Trash2,
  ArrowDown,
  ArrowUp,
  Download,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Code2,
  Play,
  Copy,
  Check,
  Terminal,
  RotateCcw,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

// ----------------------------------------------------
// 1. EMBEDDED PDF ENGINE (Multi-file & Reorder)
// ----------------------------------------------------
function EmbeddedPdfEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [files, setFiles] = useState<{ id: string; file: File; name: string; size: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const moveItem = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setFiles(updated);
  };

  const runPdfOperation = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const buf = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(buf);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((p) => mergedPdf.addPage(p));
      }
      const bytes = await mergedPdf.save();
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert('Error processing PDF in browser memory.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-violet-500 rounded-3xl p-8 text-center bg-white dark:bg-zinc-900/50">
        <input type="file" id="pdf-in" multiple accept=".pdf,application/pdf" onChange={handleFileUpload} className="hidden" />
        <label htmlFor="pdf-in" className="cursor-pointer flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
            <Upload className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white">Choose or Drop PDF Files</span>
          <span className="text-xs text-zinc-400 mt-1">Multi-file selection active • In-memory client execution</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Files Queue ({files.length})</span>
            <button onClick={() => setFiles([])} className="text-xs font-bold text-rose-500 hover:underline">Clear</button>
          </div>

          <div className="space-y-2">
            {files.map((file, idx) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-3 truncate">
                  <FileText className="h-5 w-5 text-violet-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-400">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button disabled={idx === 0} onClick={() => moveItem(idx, 'up')} className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button disabled={idx === files.length - 1} onClick={() => moveItem(idx, 'down')} className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setFiles(files.filter((f) => f.id !== file.id))} className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <button
              onClick={runPdfOperation}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 shadow-md shadow-violet-500/20 disabled:opacity-50"
            >
              {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : `Execute ${toolName}`}
            </button>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`TheToolsGenie_${toolSlug}.pdf`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
              >
                <Download className="h-4 w-4" /> Download Processed PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. EMBEDDED IMAGE CANVAS ENGINE (Live Interactive)
// ----------------------------------------------------
function EmbeddedImageEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState(85);
  const [cropWidth, setCropWidth] = useState(400);
  const [cropHeight, setCropHeight] = useState(400);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target?.result as string);
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      cvs.width = cropWidth;
      cvs.height = cropHeight;
      ctx.drawImage(img, 0, 0, cropWidth, cropHeight);
      setDownloadUrl(cvs.toDataURL('image/jpeg', quality / 100));
    };
  }, [imageSrc, quality, cropWidth, cropHeight]);

  return (
    <div>
      {!imageSrc ? (
        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl p-10 text-center bg-white dark:bg-zinc-900/50">
          <input type="file" id="img-in" accept="image/*" onChange={handleImg} className="hidden" />
          <label htmlFor="img-in" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-10 w-10 text-violet-600 mb-3" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Upload Image for Real-Time Canvas Transformation</span>
            <span className="text-xs text-zinc-400 mt-1">100% In-memory execution</span>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Controls</h3>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Output Quality</span>
                <span>{quality}%</span>
              </div>
              <input type="range" min="20" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-violet-600" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Width (px)</label>
                <input type="number" value={cropWidth} onChange={(e) => setCropWidth(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Height (px)</label>
                <input type="number" value={cropHeight} onChange={(e) => setCropHeight(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold" />
              </div>
            </div>
            {downloadUrl && (
              <a href={downloadUrl} download={`TheToolsGenie_${toolSlug}.jpg`} className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 p-3 text-xs font-bold text-white shadow-md">
                <Download className="h-4 w-4" /> Download Result
              </a>
            )}
            <button onClick={() => setImageSrc(null)} className="w-full text-center text-xs text-zinc-400 hover:text-rose-500">Change Image</button>
          </div>
          <div className="lg:col-span-2 flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 self-start">Live Output Canvas</span>
            <canvas ref={canvasRef} className="max-w-full max-h-[400px] rounded-lg shadow" />
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. EMBEDDED COMPILER (Programiz-Style Split IDE)
// ----------------------------------------------------
function EmbeddedCompilerEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [code, setCode] = useState(`// Online Sandbox\nconsole.log("Welcome to ${toolName}!");\nconst result = [1, 2, 3, 4].map(x => x * 2);\nconsole.log("Computed Array:", result);`);
  const [output, setOutput] = useState('Output console ready. Click "Run Code" to execute.');
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    try {
      let log = '';
      const orig = console.log;
      console.log = (...args) => {
        log += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ') + '\n';
      };
      // eslint-disable-next-line no-eval
      eval(code);
      console.log = orig;
      setOutput(log || 'Executed cleanly with zero log returns.');
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center bg-zinc-900 text-white px-5 py-2.5 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-bold">{toolName} Sandbox</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button onClick={runCode} className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-500">
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Run Code</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
          <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={14} className="w-full bg-transparent text-violet-200 outline-none resize-none" />
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-black p-4 font-mono text-xs flex flex-col">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 mb-2">
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Terminal Output</span>
          </div>
          <pre className="flex-1 text-emerald-400 whitespace-pre-wrap overflow-auto">{output}</pre>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. EMBEDDED FINANCE ENGINE (Formulations)
// ----------------------------------------------------
function EmbeddedFinanceEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const i = rate / 12 / 100;
  const n = years * 12;
  const invested = amount * n;
  const total = Math.round(amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const returns = total - invested;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Investment Amount</span>
              <span className="text-violet-600 font-extrabold">${amount.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="100000" step="500" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Expected Annual Return Rate (%)</span>
              <span className="text-violet-600 font-extrabold">{rate}%</span>
            </div>
            <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Time Period</span>
              <span className="text-violet-600 font-extrabold">{years} Years</span>
            </div>
            <input type="range" min="1" max="35" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-6 border flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Projection Summary</span>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Invested Amount:</span>
              <span className="font-bold">${invested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Estimated Returns:</span>
              <span className="font-bold text-emerald-600">+${returns.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t flex justify-between items-baseline">
              <span className="text-sm font-bold">Total Expected Value:</span>
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">${total.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 mt-4">Real-time dynamic compound formulation calculation.</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN DYNAMIC TOOL PAGE
// ----------------------------------------------------
export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS_REGISTRY.find((t) => t.slug === params.slug);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tool not found.</p>
      </div>
    );
  }

  const companionTools = TOOLS_REGISTRY.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 4);

  const renderEngine = () => {
    const cat = tool.category.toLowerCase();
    if (cat.includes('pdf')) return <EmbeddedPdfEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('image')) return <EmbeddedImageEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('compiler') || cat.includes('developer')) return <EmbeddedCompilerEngine toolSlug={tool.slug} toolName={tool.name} />;
    return <EmbeddedFinanceEngine toolSlug={tool.slug} toolName={tool.name} />;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Clean Header (No Breadcrumbs) */}
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
              {tool.name}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
              {tool.description}
            </p>
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Client-Side: Zero server uploads, processed locally in browser memory.</span>
            </div>
          </div>
        </div>

        {/* Workspace Runner */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {renderEngine()}

          {/* Guide & Privacy Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                  How to use {tool.name}
                </h2>
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">1</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Input, drop, or customize your assets in the workspace above.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">2</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Tweak configuration controls with real-time browser preview.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">3</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Save or export your generated result immediately with zero delays.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                    Privacy & In-Browser Execution
                  </h2>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                  TheToolsGenie runs calculations and binary transformations directly inside your local browser memory. No files are ever sent to remote cloud servers.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Zero Server Uploads • Zero Logs • 100% Client-Side</span>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-14">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                Related {tool.category} Tools
              </h2>
              <Link
                href={`/?category=${encodeURIComponent(tool.category)}#tools`}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                Explore all {tool.category} tools <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {companionTools.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/tools/${comp.slug}`}
                  className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 hover:border-violet-500 dark:hover:border-violet-400 transition-all hover:-translate-y-0.5 group shadow-sm"
                >
                  <p className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                    {comp.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                    {comp.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
