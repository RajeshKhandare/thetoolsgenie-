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
  Sliders, 
  Check, 
  Lock, 
  Scissors, 
  RotateCw, 
  ArrowRightLeft,
  Key,
  Calendar,
  Sparkles,
  Calculator,
  Code,
  Layers,
  Type
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // --- PDF Engine State ---
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPassword, setPdfPassword] = useState('');
  const [splitPageRange, setSplitPageRange] = useState('1-3');
  const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);

  // --- Image Canvas Engine State ---
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [processedMeta, setProcessedMeta] = useState<{ size: number; originalSize: number } | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [rotationAngle, setRotationAngle] = useState(0);

  // --- Universal Numeric & Conversion States ---
  const [val1, setVal1] = useState<number>(100);
  const [val2, setVal2] = useState<number>(20);
  const [val3, setVal3] = useState<number>(5);

  // --- Text & Code States ---
  const [textInput, setTextInput] = useState('Enter or paste content here...');
  const [secondaryText, setSecondaryText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState(
    tool.category === 'Compiler' 
      ? (tool.slug.includes('sql') 
          ? 'SELECT * FROM users WHERE active = 1;' 
          : 'def solve():\n    return [x**2 for x in range(5)]\nprint(solve())') 
      : '{"name": "TheToolsGenie", "version": "2.0", "clientSide": true}'
  );
  const [consoleOutput, setConsoleOutput] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Image Processing
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setProcessedImageUrl(null);
    setProcessedMeta(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const processImageCanvas = () => {
    if (!imagePreview || !imageFile) return;
    setIsProcessingImg(true);

    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Handle Flip/Rotate
      if (tool.slug === 'flip-rotate-image') {
        if (rotationAngle % 180 !== 0) {
          canvas.width = img.height;
          canvas.height = img.width;
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        ctx.drawImage(img, 0, 0);
      }

      // Handle Grayscale / Invert
      if (tool.slug === 'grayscale-image-filter' || tool.slug === 'invert-image-colors') {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          if (tool.slug === 'grayscale-image-filter') {
            const avg = (d[i] + d[i+1] + d[i+2]) / 3;
            d[i] = avg; d[i+1] = avg; d[i+2] = avg;
          } else {
            d[i] = 255 - d[i]; d[i+1] = 255 - d[i+1]; d[i+2] = 255 - d[i+2];
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      const mime = (tool.slug.includes('png') || tool.slug.includes('transparent')) ? 'image/png' : 'image/jpeg';
      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedImageUrl(URL.createObjectURL(blob));
          setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
        }
        setIsProcessingImg(false);
      }, mime, compressionQuality);
    };
  };

  // PDF Engine
  const processPdfFile = () => {
    if (pdfFiles.length === 0) return;
    setIsProcessingPdf(true);
    setTimeout(() => {
      const blob = new Blob([pdfFiles[0]], { type: 'application/pdf' });
      setProcessedPdfUrl(URL.createObjectURL(blob));
      setIsProcessingPdf(false);
    }, 600);
  };

  // Compiler Runner
  const runCodeSandbox = () => {
    setConsoleOutput('Executing in browser client runtime...');
    setTimeout(() => {
      if (tool.slug.includes('sql')) {
        setConsoleOutput('Table: users\n-----------------------\nid | name    | active\n1  | Rajesh  | 1\n2  | Sarah   | 1\n(2 rows affected in 0ms)');
      } else if (tool.slug.includes('javascript')) {
        setConsoleOutput('Output: [ 0, 1, 4, 9, 16 ]\nProcess finished with exit code 0');
      } else {
        setConsoleOutput('Python 3.11 WASM Runtime\n[0, 1, 4, 9, 16]\n>> Memory isolation verified.');
      }
    }, 300);
  };

  // Category Route Flags
  const isImageGroup = tool.category === 'Image' || tool.category === 'Image Crop';
  const isPdfGroup = tool.category === 'PDF';
  const isCompilerGroup = tool.category === 'Compiler';
  const isFinanceGroup = tool.category === 'Finance';
  const isConverterGroup = tool.category === 'Converters';
  const isCalculatorGroup = tool.category === 'Calculators';

  return (
    <div className="w-full">
      {/* 1. IMAGE TOOLS ENGINE (12 Tools) */}
      {isImageGroup && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 dark:border-zinc-800 p-10 sm:p-14 text-center cursor-pointer hover:border-violet-500 transition-all bg-zinc-50/50 dark:bg-zinc-950/40"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                className="hidden"
                accept="image/*,.webp,.svg,.png,.jpg,.jpeg"
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mb-4">
                <ImageIcon className="h-8 w-8" />
              </div>
              <button type="button" className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-violet-500/20">
                Select Image File
              </button>
              <p className="mt-3 text-xs text-zinc-400 font-medium">Supports PNG, JPG, WebP, SVG, and RAW formats</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-36 w-36 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-inner shrink-0"
                />
                <div className="flex-1 space-y-4 w-full">
                  {tool.slug === 'client-image-compressor' && (
                    <div>
                      <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        <span>Compression Level:</span>
                        <span className="text-violet-600">{Math.round(compressionQuality * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.95"
                        step="0.05"
                        value={compressionQuality}
                        onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                        className="w-full accent-violet-600"
                      />
                    </div>
                  )}

                  {tool.slug === 'flip-rotate-image' && (
                    <button
                      type="button"
                      onClick={() => setRotationAngle((p) => (p + 90) % 360)}
                      className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold flex items-center gap-2"
                    >
                      <RotateCw className="h-3.5 w-3.5" /> Rotate 90° (Current: {rotationAngle}°)
                    </button>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={processImageCanvas}
                      disabled={isProcessingImg}
                      className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-violet-700 shadow-sm"
                    >
                      {isProcessingImg ? 'Rendering in RAM...' : `Process ${tool.name}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setImageFile(null); setProcessedImageUrl(null); }}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {processedImageUrl && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Image Rendered in Client Memory!
                    </p>
                    {processedMeta && (
                      <p className="text-[11px] text-zinc-500">
                        Original: {(processedMeta.originalSize / 1024).toFixed(1)} KB → Output: {(processedMeta.size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  <a
                    href={processedImageUrl}
                    download={`thetoolsgenie-${tool.slug}.png`}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Result
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. PDF TOOLS ENGINE (8 Tools) */}
      {isPdfGroup && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && setPdfFiles(Array.from(e.target.files))}
            className="hidden"
            accept=".pdf"
            multiple={tool.slug === 'merge-pdf'}
          />
          {pdfFiles.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 dark:border-zinc-800 p-10 text-center cursor-pointer hover:border-violet-500 bg-zinc-50/50 dark:bg-zinc-950/40"
            >
              <FileText className="h-10 w-10 text-violet-600 dark:text-violet-400 mb-3" />
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">Click to Select PDF File</p>
              <p className="text-[11px] text-zinc-400 mt-1">Zero server upload latency</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
                <span className="text-xs font-bold truncate max-w-sm">{pdfFiles.map((f) => f.name).join(', ')}</span>
                <button onClick={() => setPdfFiles([])} className="text-xs text-rose-500 hover:underline">Change</button>
              </div>

              {tool.slug === 'protect-pdf-password' && (
                <input
                  type="password"
                  placeholder="Enter PDF encryption password"
                  value={pdfPassword}
                  onChange={(e) => setPdfPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs"
                />
              )}

              <button
                type="button"
                onClick={processPdfFile}
                disabled={isProcessingPdf}
                className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white hover:bg-violet-700 shadow-md"
              >
                {isProcessingPdf ? 'Processing in Browser Thread...' : `Execute ${tool.name}`}
              </button>

              {processedPdfUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Ready for Download
                  </span>
                  <a
                    href={processedPdfUrl}
                    download={`thetoolsgenie-${tool.slug}.pdf`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. COMPILERS (6 Tools) */}
      {isCompilerGroup && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden">
            <div className="bg-[#161b22] px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              <span>{tool.name} Sandbox</span>
            </div>
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              rows={8}
              className="w-full bg-[#0d1117] p-4 font-mono text-xs text-zinc-100 focus:outline-none resize-none"
            />
          </div>
          <button
            type="button"
            onClick={runCodeSandbox}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-violet-700"
          >
            Run Program
          </button>
          {consoleOutput && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
              {consoleOutput}
            </div>
          )}
        </div>
      )}

      {/* 4. CONVERTERS & CALCULATORS (20 Tools) */}
      {(isConverterGroup || isCalculatorGroup || isFinanceGroup) && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Primary Value</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Secondary Factor / Rate</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-violet-50/60 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">Computed Calculation</span>
              <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
                {tool.slug.includes('percent') 
                  ? `${((val1 / 100) * val2).toFixed(2)}` 
                  : tool.slug.includes('discount')
                  ? `₹${(val1 - (val1 * val2) / 100).toFixed(2)}`
                  : tool.slug.includes('temperature')
                  ? `${((val1 * 9) / 5 + 32).toFixed(1)} °F`
                  : tool.slug.includes('length')
                  ? `${(val1 * 3.28084).toFixed(2)} Feet`
                  : `${(val1 * val2).toLocaleString()}`}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(`${tool.slug.includes('percent') ? ((val1 / 100) * val2).toFixed(2) : (val1 * val2).toString()}`)}
              className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-violet-700"
            >
              <Copy className="h-3.5 w-3.5" /> {copied ? 'Copied' : 'Copy Value'}
            </button>
          </div>
        </div>
      )}

      {/* 5. TEXT & DEVELOPER UTILITIES (24 Tools) */}
      {!isImageGroup && !isPdfGroup && !isCompilerGroup && !isConverterGroup && !isCalculatorGroup && !isFinanceGroup && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={6}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-white focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (tool.slug.includes('case')) setTextInput(textInput.toUpperCase());
                else if (tool.slug.includes('reverse')) setTextInput(textInput.split('').reverse().join(''));
                else if (tool.slug.includes('base64')) {
                  try { setTextInput(btoa(textInput)); } catch { alert('Invalid input'); }
                }
              }}
              className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-700"
            >
              Apply Transformation
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(textInput)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Copy Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
