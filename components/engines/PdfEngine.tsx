'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, Trash2, ArrowDown, ArrowUp, Download, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  pageCount?: number;
}

export default function PdfEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setErrorMsg(null);
    const newFiles: FileItem[] = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file.type !== 'application/pdf') continue;

      newFiles.push({
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFiles(updated);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const processPdfAction = async () => {
    if (files.length === 0) {
      setErrorMsg('Please select at least one PDF file.');
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      setErrorMsg('Failed to process PDF client-side. Make sure files are not password locked.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-violet-500 dark:hover:border-violet-400 rounded-3xl p-8 text-center bg-white dark:bg-zinc-900/50 transition-all">
        <input
          type="file"
          id="pdf-upload"
          multiple
          accept=".pdf,application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
            <Upload className="h-8 w-8" />
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            Click or drag PDF files here
          </span>
          <span className="text-xs text-zinc-400 mt-1">Multi-file selection supported • In-memory execution</span>
        </label>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          <ShieldAlert className="h-4 w-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Selected Files Live Visual List */}
      {files.length > 0 && (
        <div className="space-y-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Files to Process ({files.length})
            </span>
            <button
              onClick={() => setFiles([])}
              className="text-xs font-bold text-rose-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-400">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, 'up')}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    disabled={idx === files.length - 1}
                    onClick={() => moveItem(idx, 'down')}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={processPdfAction}
              disabled={processing}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-violet-700 transition shadow-md shadow-violet-500/20 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing In Browser Memory...</span>
                </>
              ) : (
                <span>Run {toolName}</span>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`TheToolsGenie_${toolSlug}.pdf`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-500/20 animate-in fade-in"
              >
                <Download className="h-4 w-4" />
                <span>Download Result</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
