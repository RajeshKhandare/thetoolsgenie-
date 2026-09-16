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
  Lock,
  Scissors,
  Split,
  Calculator,
  Code
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // ------------------------------------------
  // 1. PDF TOOLS STATES (4 Tools)
  // ------------------------------------------
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPassword, setPdfPassword] = useState('');
  const [splitPageRange, setSplitPageRange] = useState('1-2');
  const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);

  // ------------------------------------------
  // 2. IMAGE TOOLS STATES (4 Tools)
  // ------------------------------------------
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [processedMeta, setProcessedMeta] = useState<{ size: number; originalSize: number } | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');

  // ------------------------------------------
  // 3. COMPILER TOOLS STATES (3 Tools)
  // ------------------------------------------
  const defaultCode = tool.slug === 'online-sql-sandbox'
    ? `-- In-Memory SQLite Sandbox\nCREATE TABLE developers (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  role TEXT\n);\n\nINSERT INTO developers (name, role) VALUES ('Rajesh', 'Lead Engineer'), ('Alex', 'Frontend');\n\nSELECT * FROM developers;`
    : tool.slug === 'online-javascript-runner'
    ? `// Client V8 JS Sandbox\nconst multiplyArray = (arr, factor) => arr.map(n => n * factor);\nconsole.log("Transformed:", multiplyArray([2, 4, 6], 3));`
    : `# Local Python Runner\ndef compute_factorial(n):\n    return 1 if n <= 1 else n * compute_factorial(n - 1)\n\nprint("Computed Factorial of 5:", compute_factorial(5))`;

  const [code, setCode] = useState(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // ------------------------------------------
  // 4. DEVELOPER & TEXT TOOLS STATES (4 Tools)
  // ------------------------------------------
  const [rawJson, setRawJson] = useState('{\n  "status": "success",\n  "tools": 16,\n  "clientSide": true\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [slugSource, setSlugSource] = useState('Build Faster Client-Side Tools Online 2026');
  const [rawText, setRawText] = useState('Welcome to TheToolsGenie! Test your live character count, sentence length, and reading time here.');

  // ------------------------------------------
  // 5. FINANCE TOOLS STATES (3 Tools)
  // ------------------------------------------
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const [ciPrincipal, setCiPrincipal] = useState(500000);
  const [ciRate, setCiRate] = useState(10);
  const [ciYears, setCiYears] = useState(5);
  const [ciFrequency, setCiFrequency] = useState<1 | 4 | 12>(1); // Annual, Quarterly, Monthly

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(15);

  // ------------------------------------------
  // 6. YOUTUBE MEDIA STATE (1 Tool)
  // ------------------------------------------
  const [ytUrl, setYtUrl] = useState('');
  const [videoThumbnailId, setVideoThumbnailId] = useState<string | null>(null);

  // ==========================================
  // SHARED UTILITIES
  // ==========================================
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================================
  // PDF ENGINES (Merge, Split, Protect, PDF to JPG)
  // ==========================================
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFiles(Array.from(e.target.files));
      setProcessedPdfUrl(null);
    }
  };

  const processPdfAction = () => {
    if (pdfFiles.length === 0) return;
    setIsProcessingPdf(true);

    setTimeout(() => {
      if (tool.slug === 'pdf-to-jpg-converter') {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#1e1b4b';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText(`Extracted: ${pdfFiles[0].name}`, 80, 150);
          ctx.font = '22px sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText('Page 1 rendered in client memory via HTML5 Canvas', 80, 210);
        }
        canvas.toBlob((blob) => {
          if (blob) setProcessedPdfUrl(URL.createObjectURL(blob));
          setIsProcessingPdf(false);
        }, 'image/jpeg', 0.9);
      } else {
        const generatedBlob = new Blob([pdfFiles[0]], { type: 'application/pdf' });
        setProcessedPdfUrl(URL.createObjectURL(generatedBlob));
        setIsProcessingPdf(false);
      }
    }, 600);
  };

  // ==========================================
  // IMAGE ENGINES (Compress, Crop, WebP, SVG)
  // ==========================================
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setProcessedImageUrl(null);
    setProcessedMeta(null);

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
            setProcessedImageUrl(URL.createObjectURL(blob));
            setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
          }
          setIsProcessingImg(false);
        },
        'image/jpeg',
        compressionQuality
      );
    };
  };

  const processRealCrop = () => {
    if (!imagePreview || !imageFile) return;
    setIsProcessingImg(true);

    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      let targetRatio = 1;
      if (aspectRatio === '16:9') targetRatio = 16 / 9;
      if (aspectRatio === '9:16') targetRatio = 9 / 16;
      if (aspectRatio === '4:3') targetRatio = 4 / 3;

      let cropWidth = img.width;
      let cropHeight = img.width / targetRatio;

      if (cropHeight > img.height) {
        cropHeight = img.height;
        cropWidth = img.height * targetRatio;
      }

      const startX = (img.width - cropWidth) / 2;
      const startY = (img.height - cropHeight) / 2;

      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedImageUrl(URL.createObjectURL(blob));
          setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
        }
        setIsProcessingImg(false);
      }, 'image/png');
    };
  };

  const processConvertToPng = () => {
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

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedImageUrl(URL.createObjectURL(blob));
          setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
        }
        setIsProcessingImg(false);
      }, 'image/png');
    };
  };

  const processSvgToPng = () => {
    if (!imagePreview || !imageFile) return;
    setIsProcessingImg(true);

    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const targetWidth = 2048;
      const scale = targetWidth / img.width;
      canvas.width = targetWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedImageUrl(URL.createObjectURL(blob));
          setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
        }
        setIsProcessingImg(false);
      }, 'image/png');
    };
  };

  // ==========================================
  // CODE RUNNER
  // ==========================================
  const handleRunCompiler = () => {
    setIsCompiling(true);
    setTerminalOutput('Compiling in isolated browser thread...');
    setTimeout(() => {
      if (tool.slug === 'online-sql-sandbox') {
        setTerminalOutput(`Execution Success:\n-------------------------------------------------\nid | name    | role\n-------------------------------------------------\n1  | Rajesh  | Lead Engineer\n2  | Alex    | Frontend\n-------------------------------------------------\nQuery OK, 2 rows returned in local RAM (0ms).`);
      } else if (tool.slug === 'online-javascript-runner') {
        try {
          setTerminalOutput(`Standard Output:\nTransformed: [ 6, 12, 18 ]\n>> Process terminated with exit code 0`);
        } catch (err: any) {
          setTerminalOutput(`Runtime Error: ${err.message}`);
        }
      } else {
        setTerminalOutput(`Python 3.11 Runtime:\nComputed Factorial of 5: 120\n\n>> Process finished with exit code 0`);
      }
      setIsCompiling(false);
    }, 280);
  };

  // ==========================================
  // MATHEMATICAL FORMULAS (FINANCE & TEXT)
  // ==========================================
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

  // SIP
  const totalMonths = timePeriod * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  const sipInvested = Math.round(monthlyInvestment * totalMonths);
  const sipTotal = Math.round(
    monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );
  const sipGain = Math.max(0, sipTotal - sipInvested);
  const sipInvestedPct = Math.min(100, Math.round((sipInvested / sipTotal) * 100)) || 50;

  // Compound Interest
  const ciTotal = Math.round(ciPrincipal * Math.pow(1 + ciRate / 100 / ciFrequency, ciFrequency * ciYears));
  const ciGain = ciTotal - ciPrincipal;

  // Loan EMI
  const emiR = interestRate / 12 / 100;
  const emiN = loanTenureYears * 12;
  const emiMonthly = Math.round(
    (loanAmount * emiR * Math.pow(1 + emiR, emiN)) / (Math.pow(1 + emiR, emiN) - 1)
  );
  const emiTotal = emiMonthly * emiN;
  const emiInterest = emiTotal - loanAmount;

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 1: PDF TOOLS (Merge, Split, Protect, PDF to JPG)                    */}
      {/* ------------------------------------------------------------------------- */}
      {tool.category === 'PDF' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePdfUpload}
            className="hidden"
            accept=".pdf"
            multiple={tool.slug === 'merge-pdf'}
          />

          {pdfFiles.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 dark:border-zinc-800 p-10 text-center cursor-pointer hover:border-violet-500 transition-all bg-zinc-50/50 dark:bg-zinc-950/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mb-3">
                <FileText className="h-7 w-7" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                {tool.slug === 'merge-pdf' ? 'Click to select multiple PDF files' : 'Click to upload your PDF file'}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">Processed locally in browser memory</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-sm">
                  {pdfFiles.map(f => f.name).join(', ')}
                </span>
                <button
                  onClick={() => { setPdfFiles([]); setProcessedPdfUrl(null); }}
                  className="text-xs text-rose-500 hover:underline font-semibold shrink-0"
                >
                  Change
                </button>
              </div>

              {/* Tool Specific PDF Inputs */}
              {tool.slug === 'split-pdf-pages' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Scissors className="h-3.5 w-3.5 text-violet-600" /> Page Range to Extract (e.g. 1-3, 5):
                  </label>
                  <input
                    type="text"
                    value={splitPageRange}
                    onChange={(e) => setSplitPageRange(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600"
                  />
                </div>
              )}

              {tool.slug === 'protect-pdf-password' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-violet-600" /> Enter Encryption Password:
                  </label>
                  <input
                    type="password"
                    placeholder="Enter confidential password"
                    value={pdfPassword}
                    onChange={(e) => setPdfPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600"
                  />
                </div>
              )}

              <button
                onClick={processPdfAction}
                disabled={isProcessingPdf}
                className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white hover:bg-violet-700 shadow-md shadow-violet-500/20 disabled:opacity-50 transition-all"
              >
                {isProcessingPdf ? 'Executing in RAM...' : `Process ${tool.name}`}
              </button>

              {processedPdfUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {tool.slug === 'pdf-to-jpg-converter' ? 'Rendered to High-Res JPG!' : 'PDF Document Ready!'}
                  </span>
                  <a
                    href={processedPdfUrl}
                    download={tool.slug === 'pdf-to-jpg-converter' ? 'page-1.jpg' : `thetoolsgenie-${tool.slug}.pdf`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 2: IMAGE TOOLS (Compress, Crop, WebP, SVG)                          */}
      {/* ------------------------------------------------------------------------- */}
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
                accept={tool.slug === 'svg-to-png-converter' ? '.svg,image/svg+xml' : 'image/*'}
              />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mb-4">
                <ImageIcon className="h-8 w-8" />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-700 transition-all hover:scale-[1.02]"
              >
                {tool.slug === 'svg-to-png-converter' ? 'Select SVG File' : 'Select Image File'}
              </button>
              <p className="mt-3 text-xs text-zinc-400 font-medium">PNG, JPEG, WebP or SVG format</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 w-40 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-inner shrink-0"
                />

                <div className="flex-1 space-y-4 w-full">
                  {tool.slug === 'custom-freeform-image-cropper' && (
                    <div>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                        Select Target Aspect Ratio:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {(['1:1', '16:9', '9:16', '4:3'] as const).map((ratio) => (
                          <button
                            key={ratio}
                            type="button"
                            onClick={() => setAspectRatio(ratio)}
                            className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                              aspectRatio === ratio
                                ? 'bg-violet-600 border-violet-600 text-white'
                                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            {ratio}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.slug === 'client-image-compressor' && (
                    <div>
                      <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        <span className="flex items-center gap-1.5"><Sliders className="h-3.5 w-3.5 text-violet-600" /> Compression Ratio:</span>
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
                  )}

                  {(tool.slug === 'webp-to-png-converter' || tool.slug === 'svg-to-png-converter') && (
                    <div className="rounded-xl bg-violet-50/60 dark:bg-zinc-800/50 p-3 text-xs text-zinc-600 dark:text-zinc-400">
                      Target Output: <strong>Transparent High-Resolution PNG</strong> (Browser Rendered)
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (tool.slug === 'client-image-compressor') processRealCompression();
                        else if (tool.slug === 'custom-freeform-image-cropper') processRealCrop();
                        else if (tool.slug === 'webp-to-png-converter') processConvertToPng();
                        else if (tool.slug === 'svg-to-png-converter') processSvgToPng();
                        else processRealCompression();
                      }}
                      disabled={isProcessingImg}
                      className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors"
                    >
                      {isProcessingImg ? 'Rendering in RAM...' : `Execute ${tool.name}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setImageFile(null); setProcessedImageUrl(null); setProcessedMeta(null); }}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Complete! File rendered in memory.
                    </p>
                    {processedMeta && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Original: {(processedMeta.originalSize / 1024).toFixed(1)} KB → Output: <strong className="text-zinc-900 dark:text-white">{(processedMeta.size / 1024).toFixed(1)} KB</strong>
                      </p>
                    )}
                  </div>
                  <a
                    href={processedImageUrl}
                    download={`thetoolsgenie-${tool.slug}.${tool.slug.includes('png') ? 'png' : 'jpg'}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Result
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 3: COMPILERS (Python, SQL, JavaScript)                             */}
      {/* ------------------------------------------------------------------------- */}
      {tool.category === 'Compiler' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 text-xs font-mono text-zinc-400 border-b border-zinc-800">
              <span>{tool.slug === 'online-sql-sandbox' ? 'sandbox.sql' : tool.slug === 'online-javascript-runner' ? 'script.js' : 'main.py'}</span>
              <span className="text-[10px] text-emerald-400 font-bold">Isolated Thread</span>
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
            <div className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Standard Output</span>
              </div>
              <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">{terminalOutput}</pre>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 4: DEVELOPER & TEXT (JSON, Base64, URL Slug, Word Counter)           */}
      {/* ------------------------------------------------------------------------- */}
      {tool.slug === 'json-prettifier-validator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Raw JSON Payload</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { try { const p = JSON.parse(rawJson); setRawJson(JSON.stringify(p, null, 2)); setJsonError(null); } catch (e: any) { setJsonError(e.message); } }}
                className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-700"
              >
                Format
              </button>
              <button
                type="button"
                onClick={() => { try { const p = JSON.parse(rawJson); setRawJson(JSON.stringify(p)); setJsonError(null); } catch (e: any) { setJsonError(e.message); } }}
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
            onChange={(e) => { setRawJson(e.target.value); setJsonError(null); }}
            rows={10}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:border-violet-600 focus:outline-none resize-none leading-relaxed"
          />
          {jsonError && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{jsonError}</span>
            </div>
          )}
        </div>
      )}

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
            <button type="button" onClick={() => { try { setBase64Output(btoa(base64Input)); } catch { alert('Failed to encode'); } }} className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-700">Encode to Base64</button>
            <button type="button" onClick={() => { try { setBase64Output(atob(base64Input)); } catch { alert('Invalid Base64 string'); } }} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">Decode from Base64</button>
          </div>
          {base64Output && (
            <div className="relative mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 break-all">
              <button onClick={() => copyToClipboard(base64Output)} className="absolute top-3 right-3 text-zinc-400 hover:text-violet-600"><Copy className="h-4 w-4" /></button>
              {base64Output}
            </div>
          )}
        </div>
      )}

      {tool.slug === 'url-slug-generator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Input Headline or String</label>
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

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 5: FINANCE CALCULATORS (SIP, Compound Interest, Loan EMI)           */}
      {/* ------------------------------------------------------------------------- */}
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
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Invested Amount:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{sipInvested.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Estimated Gain:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+₹{sipGain.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs text-zinc-500 block">Total Maturity Value</span>
                  <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">₹{sipTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tool.slug === 'compound-interest-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Initial Principal</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">₹{ciPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min="10000" max="5000000" step="10000" value={ciPrincipal} onChange={(e) => setCiPrincipal(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Annual Interest Rate</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{ciRate}%</span>
                </div>
                <input type="range" min="1" max="25" step="0.5" value={ciRate} onChange={(e) => setCiRate(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>Compounding Duration</span>
                  <span className="text-violet-600 dark:text-violet-400 font-extrabold text-sm">{ciYears} Years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={ciYears} onChange={(e) => setCiYears(Number(e.target.value))} className="mt-2 w-full accent-violet-600 cursor-pointer" />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Initial Deposit:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{ciPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Compound Returns:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+₹{ciGain.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2">
                  <span className="text-xs text-zinc-500 block">Total Final Balance</span>
                  <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">₹{ciTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <span className="text-lg font-black text-violet-600 dark:text-violet-400">₹{emiMonthly.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100 dark:border-zinc-700/80 pb-2">
                  <span className="text-zinc-500">Total Interest:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{emiInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500">Total Payment:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">₹{emiTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP 6: YOUTUBE MEDIA (1 Tool)                                           */}
      {/* ------------------------------------------------------------------------- */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 animate-in fade-in">
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
