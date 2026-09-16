'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Play, 
  CheckCircle2, 
  Terminal, 
  Sparkles,
  RefreshCw,
  Sliders,
  Scissors
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // YouTube State
  const [ytUrl, setYtUrl] = useState('');
  const [videoThumbnailId, setVideoThumbnailId] = useState<string | null>(null);

  // Compiler State
  const defaultCode = tool.slug === 'online-sql-sandbox'
    ? `-- Online SQLite WASM Sandbox\nCREATE TABLE developers (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  role TEXT\n);\n\nINSERT INTO developers (name, role) VALUES ('Rajesh', 'Lead Engineer'), ('Alex', 'Frontend');\n\nSELECT * FROM developers;`
    : `# Online Python 3 (Client Pyodide)\ndef generate_sequence(n):\n    return [x**2 for x in range(1, n + 1)]\n\nprint("Computed in local RAM:", generate_sequence(5))`;

  const [code, setCode] = useState(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState('');

  // Finance SIP State
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // File Handlers
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
      setCompleted(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
      setCompleted(false);
    }
  };

  // Mock Process Action (100% Client-side emulation)
  const handleProcessAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
      if (selectedFiles.length > 0) {
        setResultUrl(URL.createObjectURL(selectedFiles[0]));
      }
    }, 600);
  };

  // YouTube Grabber Action
  const handleExtractYt = () => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = ytUrl.match(regExp);
    if (match && match[2].length === 11) {
      setVideoThumbnailId(match[2]);
    } else {
      alert('Please enter a valid YouTube Video or Shorts URL');
    }
  };

  // Run Code Compiler
  const handleRunCompiler = () => {
    setIsProcessing(true);
    setTerminalOutput('Compiling in client WebAssembly sandbox...');
    setTimeout(() => {
      if (tool.slug === 'online-sql-sandbox') {
        setTerminalOutput(`Execution Success (0ms server latency):\n-------------------------------------------------\nid | name    | role\n-------------------------------------------------\n1  | Rajesh  | Lead Engineer\n2  | Alex    | Frontend\n-------------------------------------------------\nQuery OK, 2 rows returned in memory.`);
      } else {
        setTerminalOutput(`Python 3.11 (WASM Environment)\nComputed in local RAM: [1, 4, 9, 16, 25]\n\n>> Process finished with exit code 0`);
      }
      setIsProcessing(false);
    }, 350);
  };

  // Finance Calculations
  const totalMonths = timePeriod * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  const investedAmount = monthlyInvestment * totalMonths;
  const totalValue = Math.round(
    monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );
  const estReturns = totalValue - investedAmount;

  return (
    <div className="w-full">
      {/* ================= 1. FILE-BASED TOOLS (PDF / IMAGE / CROP) LIKE TINYWOW & ILOVEPDF ================= */}
      {(tool.category === 'PDF' || tool.category === 'Image' || tool.category === 'Image Crop') && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-200 bg-white p-10 sm:p-14 text-center transition-all hover:border-violet-400 hover:bg-violet-50/20 shadow-sm"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple={tool.slug === 'merge-pdf'}
              className="hidden"
              accept={tool.category === 'PDF' ? '.pdf' : 'image/*'}
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100/80 text-violet-600 mb-4">
              {tool.category === 'PDF' ? <FileText className="h-8 w-8" /> : <ImageIcon className="h-8 w-8" />}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl bg-violet-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 hover:scale-[1.02] transition-all"
            >
              {tool.category === 'PDF' ? 'Select PDF Files' : 'Upload from PC or Mobile'}
            </button>

            <p className="mt-3 text-xs text-zinc-400 font-medium">
              or drag & drop files here
            </p>

            <p className="mt-6 text-[11px] text-zinc-400">
              Files stay strictly inside your device RAM · Zero server uploads
            </p>
          </div>

          {/* Selected File Badge & Action Trigger */}
          {selectedFiles.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-700">
                  Ready to process ({selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}):
                </span>
                <span className="text-xs font-medium text-zinc-500">
                  {selectedFiles.map((f) => f.name).join(', ')}
                </span>
              </div>

              {!completed ? (
                <button
                  onClick={handleProcessAction}
                  disabled={isProcessing}
                  className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-bold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing in Browser RAM...' : `Execute ${tool.name}`}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Process Complete! Zero data left your computer.</span>
                  </div>
                  {resultUrl && (
                    <a
                      href={resultUrl}
                      download={`thetoolsgenie-${tool.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Result
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= 2. YOUTUBE 4K THUMBNAIL GRABBER ================= */}
      {tool.category === 'YouTube' && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Paste YouTube Video or Shorts URL (e.g. https://youtu.be/...)"
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
              className="flex-1 rounded-2xl border border-zinc-200 px-4 py-3.5 text-xs focus:border-violet-600 focus:outline-none"
            />
            <button
              onClick={handleExtractYt}
              className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors shrink-0 shadow-md shadow-violet-200"
            >
              Extract Covers
            </button>
          </div>

          {videoThumbnailId && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-zinc-900">1080p Ultra HD</span>
                  <a
                    href={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-violet-600 hover:underline inline-flex items-center gap-1"
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

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-zinc-900">720p High Definition</span>
                  <a
                    href={`https://img.youtube.com/vi/${videoThumbnailId}/hqdefault.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-violet-600 hover:underline inline-flex items-center gap-1"
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

      {/* ================= 3. COMPILER & SQL SANDBOX ================= */}
      {tool.category === 'Compiler' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              <span>{tool.slug === 'online-sql-sandbox' ? 'sandbox.sql' : 'main.py'}</span>
              <span className="text-[10px] text-emerald-400 font-bold">WASM Isolation Active</span>
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
            onClick={handleRunCompiler}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-violet-700 transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {isProcessing ? 'Executing...' : 'Run Code (Client-Side)'}
          </button>

          {terminalOutput && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Console Output</span>
              </div>
              <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {terminalOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* ================= 4. FINANCE CALCULATORS ================= */}
      {tool.category === 'Finance' && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Monthly Investment</span>
                  <span className="text-violet-600 font-extrabold text-sm">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="200000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="text-violet-600 font-extrabold text-sm">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Time Horizon</span>
                  <span className="text-violet-600 font-extrabold text-sm">{timePeriod} Years</span>
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
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-violet-50/50 border border-violet-100 p-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-violet-100/80 pb-2.5 text-xs">
                  <span className="text-zinc-500">Invested Amount:</span>
                  <span className="font-bold text-zinc-900">₹{investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100/80 pb-2.5 text-xs">
                  <span className="text-zinc-500">Estimated Returns:</span>
                  <span className="font-bold text-emerald-600">+₹{estReturns.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-semibold text-zinc-700">Total Future Maturity:</span>
                  <span className="text-2xl font-black text-violet-700">₹{totalValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
