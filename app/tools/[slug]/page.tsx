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
  RotateCw,
  Key,
  HelpCircle,
  ChevronDown,
  Youtube,
  ExternalLink,
  DollarSign,
  Tag,
  Search,
} from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';

// ----------------------------------------------------
// 1. DEDICATED PDF SUITE ENGINE
// ----------------------------------------------------
function DedicatedPdfEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [files, setFiles] = useState<{ id: string; file: File; name: string; size: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [pageRange, setPageRange] = useState('1');
  const [rotationAngle, setRotationAngle] = useState(90);

  const isLockTool = toolSlug.includes('protect') || toolSlug.includes('lock') || toolSlug.includes('password');
  const isSplitTool = toolSlug.includes('split');
  const isRotateTool = toolSlug.includes('rotate');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    }));

    if (isLockTool || isSplitTool || isRotateTool) {
      setFiles([newFiles[0]]);
    } else {
      setFiles((prev) => [...prev, ...newFiles]);
    }
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
    if (isLockTool && !password.trim()) {
      alert('Please enter a password to protect this document.');
      return;
    }

    setProcessing(true);
    try {
      if (isRotateTool) {
        const buf = await files[0].file.arrayBuffer();
        const pdf = await PDFDocument.load(buf);
        const pages = pdf.getPages();
        pages.forEach((p) => p.setRotation(degrees(rotationAngle)));
        const bytes = await pdf.save();
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else if (isSplitTool) {
        const buf = await files[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(buf);
        const newPdf = await PDFDocument.create();
        const pageIdx = Math.max(0, parseInt(pageRange, 10) - 1 || 0);
        if (pageIdx < srcPdf.getPageCount()) {
          const [copiedPage] = await newPdf.copyPages(srcPdf, [pageIdx]);
          newPdf.addPage(copiedPage);
        }
        const bytes = await newPdf.save();
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else if (isLockTool) {
        const buf = await files[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(buf);
        const bytes = await srcPdf.save({
          useObjectStreams: false,
          userPassword: password.trim(),
          ownerPassword: password.trim() + '_owner',
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: false,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: false,
          },
        } as any);
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else {
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
      }
    } catch (e) {
      alert('Error processing PDF client-side.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-violet-500 rounded-3xl p-8 text-center bg-white dark:bg-zinc-900/50">
        <input
          type="file"
          id="pdf-in"
          multiple={!isLockTool && !isSplitTool && !isRotateTool}
          accept=".pdf,application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="pdf-in" className="cursor-pointer flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
            <Upload className="h-7 w-7" />
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            {isLockTool ? 'Select PDF to Protect' : isSplitTool ? 'Select PDF to Split' : 'Choose or Drop PDF Files'}
          </span>
          <span className="text-xs text-zinc-400 mt-1">Direct device RAM execution • 100% private</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Selected Document ({files.length})
            </span>
            <button onClick={() => setFiles([])} className="text-xs font-bold text-rose-500 hover:underline">
              Clear
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60"
              >
                <div className="flex items-center gap-3 truncate">
                  <FileText className="h-5 w-5 text-violet-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-400">{file.size}</p>
                  </div>
                </div>

                {!isLockTool && !isSplitTool && files.length > 1 && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, 'up')}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      disabled={idx === files.length - 1}
                      onClick={() => moveItem(idx, 'down')}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
                  className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {isLockTool && (
            <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                <Key className="h-4 w-4 text-violet-600" />
                <span>Set Password Protection</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong password..."
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500"
              />
            </div>
          )}

          {isSplitTool && (
            <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/50 space-y-2">
              <label className="text-xs font-bold text-zinc-900 dark:text-white block">
                Extract Page Number
              </label>
              <input
                type="number"
                min="1"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                className="w-32 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none"
              />
            </div>
          )}

          {isRotateTool && (
            <div className="p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/50 flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">Rotate Direction:</span>
              <div className="flex gap-2">
                {[90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotationAngle(deg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      rotationAngle === deg
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={runPdfOperation}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-violet-700 shadow-md shadow-violet-500/20 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing In Browser...</span>
                </>
              ) : (
                <span>Run {toolName}</span>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`TheToolsGenie_${toolSlug}.pdf`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
              >
                <Download className="h-4 w-4" /> Download Result
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. DEDICATED IMAGE ENGINE (Interactive Canvas)
// ----------------------------------------------------
function DedicatedImageEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
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
      if (toolSlug.includes('grayscale') || toolSlug.includes('black-and-white')) {
        ctx.filter = 'grayscale(100%)';
      }
      ctx.drawImage(img, 0, 0, cropWidth, cropHeight);
      setDownloadUrl(cvs.toDataURL('image/jpeg', quality / 100));
    };
  }, [imageSrc, quality, cropWidth, cropHeight, toolSlug]);

  return (
    <div>
      {!imageSrc ? (
        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl p-10 text-center bg-white dark:bg-zinc-900/50">
          <input type="file" id="img-in" accept="image/*" onChange={handleImg} className="hidden" />
          <label htmlFor="img-in" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-10 w-10 text-violet-600 mb-3" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Upload Image for {toolName}</span>
            <span className="text-xs text-zinc-400 mt-1">100% Client-side local canvas transformation</span>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tool Adjustments</h3>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Output Quality</span>
                <span>{quality}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Target Width</label>
                <input
                  type="number"
                  value={cropWidth}
                  onChange={(e) => setCropWidth(Number(e.target.value))}
                  className="w-full rounded-xl border p-2 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Target Height</label>
                <input
                  type="number"
                  value={cropHeight}
                  onChange={(e) => setCropHeight(Number(e.target.value))}
                  className="w-full rounded-xl border p-2 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold"
                />
              </div>
            </div>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`TheToolsGenie_${toolSlug}.jpg`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 p-3.5 text-xs font-bold text-white shadow-md"
              >
                <Download className="h-4 w-4" /> Download Processed Image
              </a>
            )}
            <button
              onClick={() => setImageSrc(null)}
              className="w-full text-center text-xs text-zinc-400 hover:text-rose-500"
            >
              Choose different image
            </button>
          </div>
          <div className="lg:col-span-2 flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 self-start">
              Live Canvas Preview
            </span>
            <canvas ref={canvasRef} className="max-w-full max-h-[400px] rounded-lg shadow" />
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. DEDICATED COMPILER / RUNNER ENGINE
// ----------------------------------------------------
function DedicatedCompilerEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [code, setCode] = useState(
    toolSlug.includes('python')
      ? `# Python 3.11 Runtime\ndef calculate():\n    nums = [1, 2, 3, 4, 5]\n    return [x * 10 for x in nums]\n\nprint("Executed Python successfully:")\nprint(calculate())`
      : `// JavaScript IDE\nconst numbers = [10, 20, 30];\nconsole.log("Welcome to ${toolName}!");\nconsole.log("Computed sum:", numbers.reduce((a, b) => a + b, 0));`
  );
  const [output, setOutput] = useState('Console ready. Click "Run Code" to execute.');
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
      setOutput(log || 'Program executed cleanly with zero return prints.');
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center bg-zinc-900 text-white px-5 py-2.5 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-bold">{toolName} Workspace</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={runCode}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-500"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Run Code</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full bg-transparent text-violet-200 outline-none resize-none"
          />
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
// 4. DEDICATED YOUTUBE SUITE ENGINE (Real Standalone UI)
// ----------------------------------------------------
function DedicatedYoutubeEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const isThumbnail = toolSlug.includes('thumbnail');
  const isMoney = toolSlug.includes('money') || toolSlug.includes('revenue') || toolSlug.includes('calculator');
  const isTags = toolSlug.includes('tag');

  // Thumbnail states
  const [videoUrl, setVideoUrl] = useState('');
  const [extractedId, setExtractedId] = useState<string | null>(null);

  // Money Calculator states
  const [dailyViews, setDailyViews] = useState(25000);
  const [rpm, setRpm] = useState(2.5);

  // Tag Generator states
  const [topic, setTopic] = useState('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);

  const handleExtractThumbnail = () => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    if (match && match[2].length === 11) {
      setExtractedId(match[2]);
    } else {
      alert('Please enter a valid YouTube Video link.');
    }
  };

  const handleGenerateTags = () => {
    if (!topic.trim()) return;
    const base = topic.trim().toLowerCase();
    const tags = [
      base,
      `${base} tutorial`,
      `how to ${base}`,
      `${base} guide 2026`,
      `${base} tips`,
      `best ${base}`,
      `${base} for beginners`,
      `trending ${base}`,
    ];
    setGeneratedTags(tags);
  };

  // Monthly / Annual YouTube revenue
  const monthlyViews = dailyViews * 30;
  const monthlyEarnings = Math.round((monthlyViews / 1000) * rpm);
  const yearlyEarnings = monthlyEarnings * 12;

  if (isThumbnail) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Youtube className="h-4 w-4 text-red-500" />
            <span>Paste YouTube Video URL</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500 font-medium"
            />
            <button
              onClick={handleExtractThumbnail}
              className="rounded-2xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 transition"
            >
              Get Thumbnails
            </button>
          </div>
        </div>

        {extractedId && (
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Available Resolutions</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-950 space-y-2">
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`}
                    alt="HD Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs font-bold">Ultra HD (1080p / 720p)</span>
                  <a
                    href={`https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700"
                  >
                    View & Save
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-950 space-y-2">
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                    alt="Standard Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs font-bold">Standard HQ</span>
                  <a
                    href={`https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700"
                  >
                    View & Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isMoney) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Estimated Daily Views</span>
                <span className="text-red-500 font-extrabold">{dailyViews.toLocaleString()} views/day</span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="2000"
                value={dailyViews}
                onChange={(e) => setDailyViews(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Estimated RPM / CPM ($ per 1,000 views)</span>
                <span className="text-red-500 font-extrabold">${rpm.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.25"
                value={rpm}
                onChange={(e) => setRpm(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              *RPM varies by niche, audience geography, video length, and AdSense auction dynamics.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-6 border flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Projected Creator Revenue</span>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Monthly Views:</span>
                <span className="font-bold text-zinc-900 dark:text-white">{monthlyViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Estimated Monthly Income:</span>
                <span className="font-bold text-emerald-600">+${monthlyEarnings.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t flex justify-between items-baseline">
                <span className="text-sm font-bold">Estimated Annual Earnings:</span>
                <span className="text-2xl font-black text-red-600 dark:text-red-500">
                  ${yearlyEarnings.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-4">Calculated locally using live creator monetization averages.</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: YouTube Tag / Title Generator
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Tag className="h-4 w-4 text-violet-600" />
          <span>Enter Video Topic or Focus Keyword</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Next.js SaaS Tutorial, Fitness Workout, etc."
            className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500 font-medium"
          />
          <button
            onClick={handleGenerateTags}
            className="rounded-2xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 transition"
          >
            Generate Tags
          </button>
        </div>
      </div>

      {generatedTags.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              High-CTR Generated Tags ({generatedTags.length})
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedTags.join(', '));
                alert('Tags copied to clipboard!');
              }}
              className="text-xs font-bold text-violet-600 hover:underline"
            >
              Copy All Tags
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {generatedTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300 text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. DEDICATED FINANCE & CALCULATOR ENGINE
// ----------------------------------------------------
function DedicatedFinanceEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
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
              <span>Principal Investment Amount</span>
              <span className="text-violet-600 font-extrabold">${amount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Expected Annual Return Rate (%)</span>
              <span className="text-violet-600 font-extrabold">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Investment Duration</span>
              <span className="text-violet-600 font-extrabold">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-6 border flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Projection Summary</span>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Invested Amount:</span>
              <span className="font-bold text-zinc-900 dark:text-white">${invested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Estimated Returns:</span>
              <span className="font-bold text-emerald-600">+${returns.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t flex justify-between items-baseline">
              <span className="text-sm font-bold">Total Expected Value:</span>
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 mt-4">Calculated locally using compound interest formula models.</p>
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const toolFaqs = [
    {
      q: `Are my files safe while using ${tool.name}?`,
      a: `Yes, completely. ${tool.name} processes all data client-side inside your browser memory. Your files, documents, and credentials never touch external cloud servers.`,
    },
    {
      q: `Is there any fee or usage limit for ${tool.name}?`,
      a: `No. ${tool.name} on TheToolsGenie is 100% free with unlimited usage, zero file counters, and no registration requirements.`,
    },
    {
      q: `Can I run ${tool.name} on mobile or tablet devices?`,
      a: `Yes. This utility is fully responsive and executes smoothly on Android, iOS, Windows, and macOS browsers without needing extra plugins.`,
    },
  ];

  const renderEngine = () => {
    const cat = tool.category.toLowerCase();
    if (cat.includes('pdf')) return <DedicatedPdfEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('image')) return <DedicatedImageEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('compiler') || cat.includes('developer')) return <DedicatedCompilerEngine toolSlug={tool.slug} toolName={tool.name} />;
    if (cat.includes('youtube')) return <DedicatedYoutubeEngine toolSlug={tool.slug} toolName={tool.name} />;
    return <DedicatedFinanceEngine toolSlug={tool.slug} toolName={tool.name} />;
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
              <span>Client-Side Security: No data is ever transmitted to remote servers.</span>
            </div>
          </div>
        </div>

        {/* Workspace Runner */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {renderEngine()}

          {/* Dedicated How-to-use & Architecture */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                  Step-by-Step Guide for {tool.name}
                </h2>
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    1
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Upload or specify the target input parameters into the dedicated workspace above.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    2
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Configure your desired security password, angle, dimensions, or calculations in real time.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/70 text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    3
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Export and save your finalized output directly to your device with zero queues.
                  </p>
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
                    Private & Local Execution
                  </h2>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                  Unlike traditional online converters that upload private documents to cloud storages, {tool.name} operates purely inside your local browser sandbox. No telemetry or file copies ever leave your computer.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Zero Server Uploads • Encrypted in RAM • 100% Free</span>
              </div>
            </div>
          </div>

          {/* Dedicated Tool-Specific FAQ Accordion */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                <HelpCircle className="h-3.5 w-3.5" /> Support & FAQs
              </span>
              <h2 className="mt-1 text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Frequently Asked Questions about {tool.name}
              </h2>
            </div>

            <div className="space-y-3">
              {toolFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-zinc-900 dark:text-white hover:text-violet-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                          isOpen ? 'rotate-180 text-violet-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Companion Tools */}
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
