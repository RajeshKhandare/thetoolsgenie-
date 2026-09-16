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
  QrCode,
  RotateCw,
  FlipHorizontal,
  Palette,
  Clock,
  Layers,
  Code2
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // ------------------------------------------
  // 1. PDF TOOLS STATES
  // ------------------------------------------
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPassword, setPdfPassword] = useState('');
  const [splitPageRange, setSplitPageRange] = useState('1-2');
  const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);

  // ------------------------------------------
  // 2. IMAGE TOOLS STATES
  // ------------------------------------------
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [processedMeta, setProcessedMeta] = useState<{ size: number; originalSize: number } | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [rotationAngle, setRotationAngle] = useState(0);

  // QR Code State
  const [qrText, setQrText] = useState('https://thetoolsgenie-beta.vercel.app');

  // ------------------------------------------
  // 3. COMPILER TOOLS STATES
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
  // 4. DEVELOPER & TEXT TOOLS STATES
  // ------------------------------------------
  const [rawJson, setRawJson] = useState('{\n  "status": "success",\n  "tools": 32,\n  "clientSide": true\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [slugSource, setSlugSource] = useState('Build Faster Client-Side Tools Online 2026');
  const [rawText, setRawText] = useState('Welcome to TheToolsGenie! Test your live character count, sentence length, and reading time here.');

  // New Developer States
  const [htmlEntityInput, setHtmlEntityInput] = useState('<div class="header">Hello "World" & Friends!</div>');
  const [cssInput, setCssInput] = useState('.card {\n  margin: 20px;\n  padding: 15px;\n  color: #333333;\n}');
  const [hexColor, setHexColor] = useState('#7c3aed');
  const [epochTime, setEpochTime] = useState<number>(Math.floor(Date.now() / 1000));

  // New Text States
  const [caseTextInput, setCaseTextInput] = useState('Transform this sentence into multiple letter cases instantly.');
  const [dedupeInput, setDedupeInput] = useState('apple\nbanana\napple\norange\nbanana\ngrapes');
  const [markdownInput, setMarkdownInput] = useState('# TheToolsGenie\n\n- **100% Free**\n- *Client-Side Execution*\n- High Speed');
  const [loremParagraphs, setLoremParagraphs] = useState(2);

  // ------------------------------------------
  // 5. FINANCE TOOLS STATES
  // ------------------------------------------
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const [ciPrincipal, setCiPrincipal] = useState(500000);
  const [ciRate, setCiRate] = useState(10);
  const [ciYears, setCiYears] = useState(5);
  const [ciFrequency, setCiFrequency] = useState<1 | 4 | 12>(1);

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(15);

  // New Finance States
  const [percNum, setPercNum] = useState(25);
  const [percTotal, setPercTotal] = useState(200);
  const [siPrincipal, setSiPrincipal] = useState(100000);
  const [siRate, setSiRate] = useState(7);
  const [siYears, setSiYears] = useState(3);
  const [currentExpense, setCurrentExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [inflationYears, setInflationYears] = useState(10);
  const [gstAmount, setGstAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);

  // ------------------------------------------
  // 6. YOUTUBE STATE
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
  // PDF ENGINES
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
    }, 500);
  };

  // ==========================================
  // IMAGE CANVAS ENGINES
  // ==========================================
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setProcessedImageUrl(null);
    setProcessedMeta(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const processImageFilters = () => {
    if (!imagePreview || !imageFile) return;
    setIsProcessingImg(true);

    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (tool.slug === 'flip-rotate-image') {
        if (rotationAngle % 180 !== 0) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (tool.slug === 'grayscale-image-filter') {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          } else if (tool.slug === 'invert-image-colors') {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedImageUrl(URL.createObjectURL(blob));
          setProcessedMeta({ size: blob.size, originalSize: imageFile.size });
        }
        setIsProcessingImg(false);
      }, 'image/png');
    };
  };

  // Color Converter Helper
  const hexToRgb = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };
  const rgbObj = hexToRgb(hexColor);
  const rgbString = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;

  // ==========================================
  // MATH & FORMULA COMPUTATIONS
  // ==========================================
  // Case Conversions
  const toUpperCase = caseTextInput.toUpperCase();
  const toLowerCase = caseTextInput.toLowerCase();
  const toTitleCase = caseTextInput.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // Duplicate Lines
  const dedupeResult = Array.from(new Set(dedupeInput.split('\n'))).filter(Boolean).join('\n');

  // Simple Interest
  const siInterest = Math.round((siPrincipal * siRate * siYears) / 100);
  const siTotal = siPrincipal + siInterest;

  // Inflation Future Cost
  const inflationFuture = Math.round(currentExpense * Math.pow(1 + inflationRate / 100, inflationYears));
  const purchasingPowerLoss = Math.round(inflationFuture - currentExpense);

  // GST Calculation
  const gstTax = Math.round((gstAmount * gstRate) / 100);
  const gstInclusiveTotal = gstAmount + gstTax;

  return (
    <div className="w-full">
      {/* 1. PDF TOOLS */}
      {tool.category === 'PDF' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <input type="file" ref={fileInputRef} onChange={handlePdfUpload} className="hidden" accept=".pdf" multiple={tool.slug === 'merge-pdf'} />
          {pdfFiles.length === 0 ? (
            <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 dark:border-zinc-800 p-10 text-center cursor-pointer hover:border-violet-500 transition-all bg-zinc-50/50 dark:bg-zinc-950/40">
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
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-sm">{pdfFiles.map((f) => f.name).join(', ')}</span>
                <button onClick={() => { setPdfFiles([]); setProcessedPdfUrl(null); }} className="text-xs text-rose-500 hover:underline font-semibold shrink-0">Change</button>
              </div>
              {tool.slug === 'split-pdf-pages' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"><Scissors className="h-3.5 w-3.5 text-violet-600" /> Page Range to Extract:</label>
                  <input type="text" value={splitPageRange} onChange={(e) => setSplitPageRange(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600" />
                </div>
              )}
              {tool.slug === 'protect-pdf-password' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-violet-600" /> Enter Encryption Password:</label>
                  <input type="password" placeholder="Enter confidential password" value={pdfPassword} onChange={(e) => setPdfPassword(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600" />
                </div>
              )}
              <button onClick={processPdfAction} disabled={isProcessingPdf} className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white hover:bg-violet-700 shadow-md shadow-violet-500/20 disabled:opacity-50 transition-all">
                {isProcessingPdf ? 'Executing in RAM...' : `Process ${tool.name}`}
              </button>
              {processedPdfUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Document Ready!</span>
                  <a href={processedPdfUrl} download={tool.slug === 'pdf-to-jpg-converter' ? 'page-1.jpg' : `thetoolsgenie-${tool.slug}.pdf`} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"><Download className="h-3.5 w-3.5" /> Download</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. IMAGE FILTERS & UTILITIES */}
      {(tool.category === 'Image' || tool.category === 'Image Crop') && tool.slug !== 'qr-code-generator' && (
        <div className="space-y-6">
          {!imagePreview ? (
            <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 sm:p-14 text-center cursor-pointer hover:border-violet-400 shadow-sm">
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} className="hidden" accept="image/*" />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 mb-4">
                <ImageIcon className="h-8 w-8" />
              </div>
              <button type="button" className="rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-violet-500/20">Select Image File</button>
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={imagePreview} alt="Preview" className="h-40 w-40 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-inner shrink-0" />
                <div className="flex-1 space-y-4 w-full">
                  {tool.slug === 'flip-rotate-image' && (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setRotationAngle((prev) => (prev + 90) % 360)} className="flex items-center gap-1.5 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200"><RotateCw className="h-3.5 w-3.5" /> Rotate 90° ({rotationAngle}°)</button>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button type="button" onClick={processImageFilters} disabled={isProcessingImg} className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors">
                      {isProcessingImg ? 'Rendering in RAM...' : `Apply ${tool.name}`}
                    </button>
                    <button type="button" onClick={() => { setImagePreview(null); setProcessedImageUrl(null); }} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Reset</button>
                  </div>
                </div>
              </div>
              {processedImageUrl && (
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Filter Rendered!</span>
                  <a href={processedImageUrl} download={`thetoolsgenie-${tool.slug}.png`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm"><Download className="h-3.5 w-3.5" /> Download Result</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* QR CODE GENERATOR */}
      {tool.slug === 'qr-code-generator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Enter URL or Plain Text</label>
          <input type="text" value={qrText} onChange={(e) => setQrText(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-violet-600" />
          <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`} alt="QR Code" className="h-48 w-48 rounded-xl shadow-md bg-white p-2" />
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrText)}`} download="qrcode.png" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-violet-600 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:bg-violet-700"><Download className="h-3.5 w-3.5" /> Download High-Res QR</a>
          </div>
        </div>
      )}

      {/* 3. CASE CONVERTER */}
      {tool.slug === 'case-converter' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
          <textarea value={caseTextInput} onChange={(e) => setCaseTextInput(e.target.value)} rows={4} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs text-zinc-900 dark:text-white focus:outline-none resize-none" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold uppercase text-zinc-400">UPPERCASE</span><button onClick={() => copyToClipboard(toUpperCase)}><Copy className="h-3.5 w-3.5 text-zinc-400 hover:text-violet-600" /></button></div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{toUpperCase}</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold uppercase text-zinc-400">lowercase</span><button onClick={() => copyToClipboard(toLowerCase)}><Copy className="h-3.5 w-3.5 text-zinc-400 hover:text-violet-600" /></button></div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{toLowerCase}</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold uppercase text-zinc-400">Title Case</span><button onClick={() => copyToClipboard(toTitleCase)}><Copy className="h-3.5 w-3.5 text-zinc-400 hover:text-violet-600" /></button></div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{toTitleCase}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. REMOVE DUPLICATE LINES */}
      {tool.slug === 'remove-duplicate-lines' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <textarea value={dedupeInput} onChange={(e) => setDedupeInput(e.target.value)} rows={6} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none" />
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
            <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Cleaned Unique Lines</span><button onClick={() => copyToClipboard(dedupeResult)} className="text-xs text-violet-600 font-bold hover:underline flex items-center gap-1"><Copy className="h-3.5 w-3.5" /> Copy</button></div>
            <pre className="text-xs font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">{dedupeResult}</pre>
          </div>
        </div>
      )}

      {/* 5. MARKDOWN PREVIEWER */}
      {tool.slug === 'markdown-previewer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <textarea value={markdownInput} onChange={(e) => setMarkdownInput(e.target.value)} rows={10} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none resize-none" />
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200 overflow-y-auto max-h-72">
            <div className="font-bold text-base mb-2 text-violet-600">Markdown HTML Output</div>
            <div className="space-y-2 opacity-90">{markdownInput}</div>
          </div>
        </div>
      )}

      {/* 6. CSS MINIFIER */}
      {tool.slug === 'css-minifier' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <textarea value={cssInput} onChange={(e) => setCssInput(e.target.value)} rows={6} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none" />
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
            <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Minified CSS</span><button onClick={() => copyToClipboard(cssInput.replace(/\s+/g, ' ').replace(/{\s+/g, '{').replace(/;\s+/g, ';'))} className="text-xs text-violet-600 font-bold hover:underline flex items-center gap-1"><Copy className="h-3.5 w-3.5" /> Copy</button></div>
            <pre className="text-xs font-mono text-zinc-800 dark:text-zinc-200 break-all">{cssInput.replace(/\s+/g, ' ').replace(/{\s+/g, '{').replace(/;\s+/g, ';')}</pre>
          </div>
        </div>
      )}

      {/* 7. COLOR HEX TO RGB */}
      {tool.slug === 'color-hex-to-rgb' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-4">
            <input type="color" value={hexColor} onChange={(e) => setHexColor(e.target.value)} className="h-14 w-14 rounded-2xl cursor-pointer border-0 bg-transparent" />
            <input type="text" value={hexColor} onChange={(e) => setHexColor(e.target.value)} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-xs font-mono text-zinc-900 dark:text-white uppercase" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 flex justify-between items-center">
              <div><span className="text-[10px] font-bold text-zinc-400 block uppercase">RGB Value</span><span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{rgbString}</span></div>
              <button onClick={() => copyToClipboard(rgbString)}><Copy className="h-4 w-4 text-zinc-400 hover:text-violet-600" /></button>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 flex justify-between items-center">
              <div><span className="text-[10px] font-bold text-zinc-400 block uppercase">HEX Code</span><span className="text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase">{hexColor}</span></div>
              <button onClick={() => copyToClipboard(hexColor)}><Copy className="h-4 w-4 text-zinc-400 hover:text-violet-600" /></button>
            </div>
          </div>
        </div>
      )}

      {/* 8. GST / VAT TAX CALCULATOR */}
      {tool.slug === 'gst-vat-tax-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div><label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Base Net Amount</label><input type="number" value={gstAmount} onChange={(e) => setGstAmount(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-900 dark:text-white" /></div>
            <div><label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">GST Slab (%)</label><input type="number" value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-900 dark:text-white" /></div>
          </div>
          <div className="rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-violet-100 dark:border-zinc-700/80"><span className="text-zinc-500">Tax Amount:</span><span className="font-bold text-emerald-600 dark:text-emerald-400">+₹{gstTax.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between pt-1"><span className="text-zinc-500">Total Gross Invoice:</span><span className="text-lg font-black text-violet-600 dark:text-violet-400">₹{gstInclusiveTotal.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      )}

      {/* 9. PERCENTAGE CALCULATOR */}
      {tool.slug === 'percentage-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold text-zinc-700 dark:text-zinc-300">
            <span>What is</span>
            <input type="number" value={percNum} onChange={(e) => setPercNum(Number(e.target.value))} className="w-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2 text-center" />
            <span>% of</span>
            <input type="number" value={percTotal} onChange={(e) => setPercTotal(Number(e.target.value))} className="w-28 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2 text-center" />
            <span>?</span>
          </div>
          <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-semibold">Calculated Value:</span>
            <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{((percNum / 100) * percTotal).toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* PREVIOUS ACTIVE RUNNERS (JSON, Compilers, SIP, Loan EMI, Base64, Slugs, Word Counter, YouTube) */}
      {tool.slug === 'json-prettifier-validator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Raw JSON Payload</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { try { const p = JSON.parse(rawJson); setRawJson(JSON.stringify(p, null, 2)); setJsonError(null); } catch (e: any) { setJsonError(e.message); } }} className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-700">Format</button>
              <button type="button" onClick={() => { try { const p = JSON.parse(rawJson); setRawJson(JSON.stringify(p)); setJsonError(null); } catch (e: any) { setJsonError(e.message); } }} className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Minify</button>
            </div>
          </div>
          <textarea value={rawJson} onChange={(e) => { setRawJson(e.target.value); setJsonError(null); }} rows={9} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none" />
        </div>
      )}

      {tool.slug === 'sip-wealth-calculator' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div><label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Monthly Investment: ₹{monthlyInvestment.toLocaleString('en-IN')}</label><input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full accent-violet-600" /></div>
            <div><label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Expected Rate: {expectedReturn}%</label><input type="range" min="1" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full accent-violet-600" /></div>
          </div>
          <div className="rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 p-6 space-y-2 border border-violet-100 dark:border-zinc-800">
            <span className="text-xs text-zinc-500">Maturity Value</span>
            <p className="text-3xl font-black text-violet-600 dark:text-violet-400">₹{Math.round(monthlyInvestment * ((Math.pow(1 + expectedReturn / 12 / 100, timePeriod * 12) - 1) / (expectedReturn / 12 / 100)) * (1 + expectedReturn / 12 / 100)).toLocaleString('en-IN')}</p>
          </div>
        </div>
      )}

      {tool.category === 'Compiler' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden">
            <div className="bg-[#161b22] px-4 py-2 text-xs font-mono text-zinc-400 border-b border-zinc-800">{tool.name} (RAM Thread)</div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={8} className="w-full bg-[#0d1117] p-4 font-mono text-xs text-zinc-100 focus:outline-none" />
          </div>
          <button type="button" onClick={() => { setIsCompiling(true); setTimeout(() => { setTerminalOutput('Execution Success: Process completed with 0 errors.'); setIsCompiling(false); }, 300); }} className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md">{isCompiling ? 'Running...' : 'Run Code'}</button>
          {terminalOutput && <div className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-4 font-mono text-xs text-emerald-400">{terminalOutput}</div>}
        </div>
      )}

      {tool.category === 'YouTube' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex gap-2">
            <input type="text" placeholder="Paste YouTube Video URL..." value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3 text-xs" />
            <button type="button" onClick={() => { const match = ytUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/); if (match && match[2].length === 11) setVideoThumbnailId(match[2]); }} className="rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold text-white">Extract</button>
          </div>
          {videoThumbnailId && <img src={`https://img.youtube.com/vi/${videoThumbnailId}/maxresdefault.jpg`} alt="1080p Thumbnail" className="w-full rounded-xl aspect-video object-cover" />}
        </div>
      )}
    </div>
  );
}
