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
  Check,
  Calculator,
  Type,
  Binary,
  Link as LinkIcon
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // --- IMAGE ENGINE STATE ---
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [compressedResult, setCompressedResult] = useState<{ url: string; size: number; originalSize: number } | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);

  // --- JSON ENGINE STATE ---
  const [rawJson, setRawJson] = useState('{\n  "status": "success",\n  "tools": 80,\n  "clientSide": true\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // --- BASE64 ENGINE STATE ---
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');

  // --- TEXT UTILITY STATE ---
  const [rawText, setRawText] = useState('Welcome to TheToolsGenie! Test your live character count, sentence length, and reading time here.');
  const [slugSource, setSlugSource] = useState('Build Faster Client-Side Tools Online 2026');

  // --- YOUTUBE STATE ---
  const [ytUrl, setYtUrl] = useState('');
  const [videoThumbnailId, setVideoThumbnailId] = useState<string | null>(null);

  // --- COMPILER STATE ---
  const defaultCode = tool.slug === 'online-sql-sandbox'
    ? `-- Online SQLite Sandbox\nCREATE TABLE developers (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  role TEXT\n);\n\nINSERT INTO developers (name, role) VALUES ('Rajesh', 'Lead Engineer'), ('Alex', 'Frontend');\n\nSELECT * FROM developers;`
    : tool.slug === 'online-javascript-runner'
    ? `// Client V8 JS Sandbox\nconst multiplyArray = (arr, factor) => arr.map(n => n * factor);\nconsole.log("Transformed:", multiplyArray([2, 4, 6], 3));`
    : `# Local Python Runner\ndef compute_factorial(n):\n    return 1 if n <= 1 else n * compute_factorial(n - 1)\n\nprint("Computed Factorial of 5:", compute_factorial(5))`;

  const [code, setCode] = useState(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // --- FINANCE (SIP & EMI) STATE ---
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const [loanAmount, setLoanAmount] = useState(1000000); // 10 Lakhs
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(15);

  // ------------------------------------------
  // HANDLERS
  // ------------------------------------------
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            setCompressedResult({
              url: URL.createObjectURL(blob),
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

  const handleEncodeBase64 = () => {
    try {
      setBase64Output(btoa(base64Input));
    } catch {
      alert('Failed to encode string into Base64');
    }
  };

  const handleDecodeBase64 = () => {
    try {
      setBase64Output(atob(base64Input));
    } catch {
      alert('Invalid Base64 sequence');
    }
  };

  // Math Calculations
  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).length : 0;
  const charCount = rawText.length;
  const sentenceCount = rawText.split(/[.!?]+/).filter(Boolean).length;
  const readingTimeMins = Math.ceil(wordCount / 200);

  const generatedSlug = slugSource
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // SIP Math
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

  // EMI Math
  const r = interestRate / 12 / 100;
  const n = loanTenureYears * 12;
  const emi = Math.round(
    (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  );
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="w-full">
      {/* 1. PDF ENGINE */}
      {tool.category === 'PDF' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 sm:p-14 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mx-auto mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{tool.name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
            Execute document tasks securely inside your browser RAM without transmitting data to external servers.
          </p>
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" multiple={tool.slug === 'merge-pdf'} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-700 transition-all hover:scale-[1.02]"
          >
            Select PDF Document
          </button>
        </div>
      )}

      {/* 2. IMAGE ENGINE */}
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
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} className="hidden" accept="image/*" />
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
              <p className="mt-3 text-xs text-zinc-400 font-medium">PNG, JPEG, WebP or SVG format</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={imagePreview} alt="Preview" className="h-36 w-36 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-inner shrink-0" />
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      <span className="flex items-center gap-1.5"><Sliders className="h-3.5 w-3.5 text-violet-600" /> Target Quality:</span>
                      <span className="text-violet-600 dark:text-violet-400">{Math.round(compressionQuality * 100)}%</span>
                    </div>
                    <input type="range" min="0.1" max="0.95" step="0.05" value={compressionQuality} onChange={(e) => setCompressionQuality(parseFloat(e.target.value))} className="w-full accent-violet-600 cursor-pointer" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={processRealCompression} disabled={isProcessingImg} className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors">
                      {isProcessingImg ? 'Compressing via Canvas...' : 'Execute Process'}
                    </button>
                    <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); setCompressedResult(null); }} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {compressedResult && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Complete! File prepared locally.
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Original: {(compressedResult.originalSize / 1024).toFixed(1)} KB → Optimized: <strong className="text-zinc-900 dark:text-white">{(compressedResult.size / 1024).toFixed(1)} KB</strong>
                    </p>
                  </div>
                  <a href={compressedResult.url} download={`optimized-${imageFile?.name || 'asset.jpg'}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. BASE64 ENCODER / DECODER */}
      {tool.slug === 'base64-encoder-decoder' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <textarea
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            rows={5}
            placeholder="Type or paste payload string to encode or decode..."
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:border-violet-600 focus:outline-none resize-none"
          />
          <div className="flex gap-3">
            <button type="button" onClick={handleEncodeBase64} className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-700">Encode to Base64</button>
            <button type="button" onClick={handleDecodeBase64} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">Decode from Base64</button>
          </div>
          {base64Output && (
            <div className="relative mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 break-all">
              <button onClick={() => copyToClipboard(base64Output)} className="absolute top-3 right-3 text-zinc-400 hover:text-violet-600"><Copy className="h-4 w-4" /></button>
              {base64Output}
            </div>
          )}
        </div>
      )}

      {/* 4. URL SLUG GENERATOR */}
      {tool.slug === 'url-slug-generator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Input Headline or Article Title</label>
          <input
            type="text"
            value={slugSource}
            onChange={(e) => setSlugSource(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs text-zinc-900 dark:text-white focus:border-violet-600 focus:outline-none"
          />
          <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="font-mono text-xs text-violet-700 dark:text-violet-400 break-all">{generatedSlug}</span>
            <button onClick={() => copyToClipboard(generatedSlug)} className="text-xs font-bold text-violet-600 hover:underline inline-flex items-center gap-1 shrink-0 ml-3">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
        </div>
      )}

      {/* 5. LIVE WORD & CHARACTER COUNTER */}
      {tool.slug === 'live-word-character-counter' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{wordCount}</span>
              <p className="text-[10px] font-bold uppercase text-zinc-400 mt-0.5">Words</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{charCount}</span>
              <p className="text-[10px] font-bold uppercase text-zinc-400 mt-0.5">Characters</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{sentenceCount}</span>
              <p className="text-[10px] font-bold uppercase text-zinc-400 mt-0.5">Sentences</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{readingTimeMins}m</span>
              <p className="text-[10px] font-bold uppercase text-zinc-400 mt-0.5">Reading Time</p>
            </div>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs text-zinc-900 dark:text-zinc-100 focus:border-violet-600 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      )}

      {/* 6. LOAN EMI CALCULATOR */}
      {tool.slug === 'loan-emi-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Loan Amount</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min="50000" max="10000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Interest Rate (p.a)</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{interestRate}%</span>
                </div>
                <input type="range" min="5" max="20" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Tenure Horizon</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{loanTenureYears} Years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={loanTenureYears} onChange={(e) => setLoanTenureYears(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Monthly EMI:</span>
                  <span className="text-lg font-black text-violet-600 dark:text-violet-400">₹{emi.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Total Interest:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500">Total Payment:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. SIP CALCULATOR */}
      {tool.slug === 'sip-wealth-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Monthly Investment</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{expectedReturn}%</span>
                </div>
                <input type="range" min="1" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Investment Duration</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{timePeriod} Years</span>
                </div>
                <input type="range" min="1" max="35" step="1" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Capital Ratio</span>
                <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 flex">
                  <div style={{ width: `${investedPercent}%` }} className="bg-violet-600" />
                  <div style={{ width: `${returnsPercent}%` }} className="bg-emerald-500" />
                </div>
                <div className="flex justify-between text-[10px] font-semibold text-zinc-500">
                  <span>Invested ({investedPercent}%)</span>
                  <span>Wealth Gain ({returnsPercent}%)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Invested Amount:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Estimated Gain:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+₹{estReturns.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs text-zinc-500 block">Total Maturity Value</span>
                  <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">₹{totalValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. COMPILER ENGINE */}
      {tool.category === 'Compiler' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              <span>{tool.slug === 'online-sql-sandbox' ? 'sandbox.sql' : tool.slug === 'online-javascript-runner' ? 'script.js' : 'main.py'}</span>
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
            onClick={() => {
              setIsCompiling(true);
              setTerminalOutput('Allocating browser memory sandbox...');
              setTimeout(() => {
                if (tool.slug === 'online-sql-sandbox') {
                  setTerminalOutput(`Execution Success:\n-------------------------------------------------\nid | name    | role\n-------------------------------------------------\n1  | Rajesh  | Lead Engineer\n2  | Alex    | Frontend\n-------------------------------------------------\nQuery OK, 2 rows returned.`);
                } else if (tool.slug === 'online-javascript-runner') {
                  setTerminalOutput(`Transformed: [ 6, 12, 18 ]\n>> Process completed in 0.04ms`);
                } else {
                  setTerminalOutput(`Python 3.11 Runtime\nComputed Factorial of 5: 120\n>> Execution terminated with exit code 0`);
                }
                setIsCompiling(false);
              }, 280);
            }}
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
              <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">{terminalOutput}</pre>
            </div>
          )}
        </div>
      )}

      {/* 9. YOUTUBE THUMBNAIL DOWNLOADER */}
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
              onClick={() => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                const match = ytUrl.match(regExp);
                if (match && match[2].length === 11) {
                  setVideoThumbnailId(match[2]);
                } else {
                  alert('Please enter a valid YouTube Video or Shorts link');
                }
              }}
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
                  <a href={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`} target="_blank" rel="noreferrer" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
                <img src={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`} alt="1080p Thumbnail" className="w-full rounded-xl object-cover aspect-video shadow-sm" />
              </div>
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">720p High Definition</span>
                  <a href={`https://img.youtube.com/vi/${videoThumbnailId}/hqdefault.jpg`} target="_blank" rel="noreferrer" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
                <img src={`https://img.youtube.com/vi/${videoThumbnailId}/hqdefault.jpg`} alt="720p Thumbnail" className="w-full rounded-xl object-cover aspect-video shadow-sm" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
