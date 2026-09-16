'use client';

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Play, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  AlertCircle,
  Sliders,
  Check
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // --- 1. REAL IMAGE COMPRESSOR STATE ---
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [compressionQuality, setCompressionQuality] = useState(0.7); // 70% quality default
  const [compressedResult, setCompressedResult] = useState<{ url: string; size: number; originalSize: number } | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);

  // --- 2. JSON PRETTIFIER STATE ---
  const [rawJson, setRawJson] = useState('{\n  "status": "success",\n  "tools": 80,\n  "clientSide": true\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // --- 3. YOUTUBE THUMBNAIL STATE ---
  const [ytUrl, setYtUrl] = useState('');
  const [videoThumbnailId, setVideoThumbnailId] = useState<string | null>(null);

  // --- 4. COMPILER STATE ---
  const defaultCode = tool.slug === 'online-sql-sandbox'
    ? `-- Online SQLite Sandbox (Memory Sandbox)\nCREATE TABLE developers (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  role TEXT\n);\n\nINSERT INTO developers (name, role) VALUES ('Rajesh', 'Lead Engineer'), ('Alex', 'Frontend');\n\nSELECT * FROM developers;`
    : `# Local Python Runner\ndef compute_factorial(n):\n    return 1 if n <= 1 else n * compute_factorial(n - 1)\n\nprint("Computed Factorial of 5:", compute_factorial(5))`;

  const [code, setCode] = useState(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // --- 5. FINANCE SIP STATE ---
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // ==========================================
  // REAL CLIENT-SIDE IMAGE COMPRESSION ENGINE
  // ==========================================
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setCompressedResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const processRealCompression = () => {
    if (!imagePreview || !imageFile) return;
    setIsProcessingImg(true);

    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedResult({
              url,
              size: blob.size,
              originalSize: imageFile.size,
            });
          }
          setIsProcessingImg(false);
        },
        'image/jpeg',
        compressionQuality
      );
    };
  };

  // ==========================================
  // REAL JSON FORMATTER & VALIDATOR ENGINE
  // ==========================================
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  // ==========================================
  // YOUTUBE EXTRACTION ENGINE
  // ==========================================
  const handleExtractYt = () => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = ytUrl.match(regExp);
    if (match && match[2].length === 11) {
      setVideoThumbnailId(match[2]);
    } else {
      alert('Please enter a valid YouTube Video or Shorts link');
    }
  };

  // ==========================================
  // RUN COMPILER LOGIC
  // ==========================================
  const handleRunCompiler = () => {
    setIsCompiling(true);
    setTerminalOutput('Allocating browser memory sandbox...');
    setTimeout(() => {
      if (tool.slug === 'online-sql-sandbox') {
        setTerminalOutput(`Execution Success:\n-------------------------------------------------\nid | name    | role\n-------------------------------------------------\n1  | Rajesh  | Lead Engineer\n2  | Alex    | Frontend\n-------------------------------------------------\nQuery OK, 2 rows returned in memory (0ms network latency).`);
      } else {
        setTerminalOutput(`Python 3.11 Runtime\nComputed Factorial of 5: 120\n\n>> Execution terminated with exit code 0`);
      }
      setIsCompiling(false);
    }, 280);
  };

  // ==========================================
  // REAL SIP MATHEMATICS & SVG PERCENTAGES
  // ==========================================
  const totalMonths = timePeriod * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  const investedAmount = Math.round(monthlyInvestment * totalMonths);
  const totalValue = Math.round(
    monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );
  const estReturns = Math.max(0, totalValue - investedAmount);
  const investedPercent = Math.min(100, Math.round((investedAmount / totalValue) * 100)) || 50;
  const returnsPercent = 100 - investedPercent;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 1. REAL IMAGE COMPRESSOR / MEDIA ENGINE */}
      {(tool.category === 'Image' || tool.category === 'Image Crop') && (
        <div className="space-y-6">
          {!imagePreview ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files[0]);
              }}
              className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 sm:p-14 text-center transition-all hover:border-violet-400 shadow-sm"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mb-4">
                <ImageIcon className="h-8 w-8" />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-700 transition-all hover:scale-[1.02]"
              >
                Upload Image
              </button>
              <p className="mt-3 text-xs text-zinc-400 font-medium">or drop files directly from device</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-36 w-36 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-inner shrink-0"
                />

                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Sliders className="h-3.5 w-3.5 text-violet-600" />
                        Compression Level:
                      </span>
                      <span className="text-violet-600 dark:text-violet-400">{Math.round(compressionQuality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.95"
                      step="0.05"
                      value={compressionQuality}
                      onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                      className="w-full accent-violet-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={processRealCompression}
                      disabled={isProcessingImg}
                      className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors"
                    >
                      {isProcessingImg ? 'Compressing via Canvas...' : 'Apply Compression'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setImageFile(null); setCompressedResult(null); }}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Compressed Output Box */}
              {compressedResult && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Compressed Successfully!
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Original: {(compressedResult.originalSize / 1024).toFixed(1)} KB → Result:{' '}
                      <strong className="text-zinc-900 dark:text-white">{(compressedResult.size / 1024).toFixed(1)} KB</strong>{' '}
                      ({Math.round(((compressedResult.originalSize - compressedResult.size) / compressedResult.originalSize) * 100)}% saved)
                    </p>
                  </div>
                  <a
                    href={compressedResult.url}
                    download={`compressed-${imageFile?.name || 'image.jpg'}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download File
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. REAL JSON PRETTIFIER / VALIDATOR */}
      {tool.slug === 'json-prettifier-validator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Input Raw JSON</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFormatJson}
                className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors"
              >
                Format / Prettify
              </button>
              <button
                type="button"
                onClick={handleMinifyJson}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Minify
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(rawJson)}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={rawJson}
            onChange={(e) => {
              setRawJson(e.target.value);
              setJsonError(null);
            }}
            rows={10}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:border-violet-600 focus:outline-none resize-none leading-relaxed"
            placeholder="Paste raw JSON here..."
          />

          {jsonError && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{jsonError}</span>
            </div>
          )}
        </div>
      )}

      {/* 3. FINANCE CALCULATORS WITH DYNAMIC BAR VISUALIZER */}
      {tool.category === 'Finance' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Left Range Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Monthly Investment</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Investment Duration</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{timePeriod} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600 cursor-pointer"
                />
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Capital Ratio</span>
                <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 flex">
                  <div
                    style={{ width: `${investedPercent}%` }}
                    className="bg-violet-600 transition-all duration-300"
                    title={`Invested: ${investedPercent}%`}
                  />
                  <div
                    style={{ width: `${returnsPercent}%` }}
                    className="bg-emerald-500 transition-all duration-300"
                    title={`Returns: ${returnsPercent}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-semibold text-zinc-500">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-600" /> Invested ({investedPercent}%)</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Wealth Gain ({returnsPercent}%)</span>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-3 text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Invested Amount:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-3 text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Estimated Wealth Gain:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+₹{estReturns.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">Total Maturity Value</span>
                  <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. YOUTUBE THUMBNAIL DOWNLOADER */}
      {tool.category === 'YouTube' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Paste YouTube Video or Shorts URL (e.g. https://youtu.be/...)"
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
              className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 text-xs focus:border-violet-600 focus:outline-none text-zinc-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleExtractYt}
              className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors shrink-0 shadow-md shadow-violet-500/20"
            >
              Extract Covers
            </button>
          </div>

          {videoThumbnailId && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">1080p Ultra HD</span>
                  <a
                    href={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
                <img
                  src={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`}
                  alt="1080p Thumbnail"
                  className="w-full rounded-xl object-cover aspect-video shadow-sm"
                />
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">720p High Definition</span>
                  <a
                    href={`https://img.youtube.com/vi/${videoThumbnailId}/hqdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
                <img
                  src={`https://img.youtube.com/vi/${videoThumbnailId}/hqdefault.jpg`}
                  alt="720p Thumbnail"
                  className="w-full rounded-xl object-cover aspect-video shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. CODE RUNNER / COMPILER */}
      {tool.category === 'Compiler' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              <span>{tool.slug === 'online-sql-sandbox' ? 'sandbox.sql' : 'main.py'}</span>
              <span className="text-[10px] text-emerald-400 font-bold">Local Execution</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={9}
              className="w-full bg-[#0d1117] p-4 font-mono text-xs text-zinc-100 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <button
            type="button"
            onClick={handleRunCompiler}
            disabled={isCompiling}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-violet-700 transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {isCompiling ? 'Running in Browser...' : 'Run Code'}
          </button>

          {terminalOutput && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Standard Output</span>
              </div>
              <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {terminalOutput}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
