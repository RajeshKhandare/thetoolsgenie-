'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Sliders, RefreshCw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ImageEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(85);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [cropWidth, setCropWidth] = useState<number>(400);
  const [cropHeight, setCropHeight] = useState<number>(400);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      if (grayscale) {
        ctx.filter = 'grayscale(100%)';
      } else {
        ctx.filter = 'none';
      }

      ctx.drawImage(img, 0, 0, cropWidth, cropHeight);
      const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setOutputUrl(dataUrl);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    if (imageSrc) {
      processImage();
    }
  }, [imageSrc, quality, grayscale, cropWidth, cropHeight]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {!imageSrc ? (
        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-violet-500 rounded-3xl p-10 text-center bg-white dark:bg-zinc-900/50">
          <input type="file" id="img-upload" accept="image/*" onChange={handleImageLoad} className="hidden" />
          <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-10 w-10 text-violet-600 mb-3" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">Choose an image from your device</span>
            <span className="text-xs text-zinc-400 mt-1">Direct GPU/Canvas memory transformation</span>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Side Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-5 h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Settings & Parameters</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Output Quality</span>
                <span>{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1">Width (px)</label>
                <input
                  type="number"
                  value={cropWidth}
                  onChange={(e) => setCropWidth(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2 text-xs font-bold text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1">Height (px)</label>
                <input
                  type="number"
                  value={cropHeight}
                  onChange={(e) => setCropHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2 text-xs font-bold text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={grayscale}
                onChange={(e) => setGrayscale(e.target.checked)}
                className="rounded accent-violet-600 h-4 w-4"
              />
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Apply Monochrome Filter</span>
            </label>

            {outputUrl && (
              <a
                href={outputUrl}
                download={`TheToolsGenie_${toolSlug}.jpg`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 transition w-full shadow-md shadow-violet-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Download Result</span>
              </a>
            )}

            <button
              onClick={() => setImageSrc(null)}
              className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-rose-500 transition"
            >
              Choose different image
            </button>
          </div>

          {/* Live Dynamic Preview Canvas */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[350px]">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 self-start">Live Canvas View</span>
            <div className="overflow-auto max-w-full max-h-[500px] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 bg-zinc-50 dark:bg-zinc-950">
              <canvas ref={canvasRef} className="max-w-full rounded-xl shadow-md" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
