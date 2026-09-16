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
  Palette,
  Calculator,
  ArrowRightLeft,
  Key,
  Calendar,
  Layers
} from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';

export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // --- UNIVERSAL NUMERIC & CONVERTER STATES ---
  const [inputVal, setInputVal] = useState<number>(100);
  const [secondaryVal, setSecondaryVal] = useState<number>(20);
  const [textInput, setTextInput] = useState('Type or paste content here...');
  const [generatedResult, setGeneratedResult] = useState<string>('');

  // Password / UUID
  const [passLength, setPassLength] = useState(16);

  // Copy Helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Unit Converter Math
  const meters = inputVal;
  const feet = (inputVal * 3.28084).toFixed(2);
  const inches = (inputVal * 39.3701).toFixed(2);
  const kilometers = (inputVal / 1000).toFixed(3);
  const miles = (inputVal * 0.000621371).toFixed(3);

  const kg = inputVal;
  const lbs = (inputVal * 2.20462).toFixed(2);
  const grams = (inputVal * 1000).toLocaleString();
  const ounces = (inputVal * 35.274).toFixed(2);

  const celsius = inputVal;
  const fahrenheit = ((inputVal * 9) / 5 + 32).toFixed(1);
  const kelvin = (inputVal + 273.15).toFixed(2);

  const mb = inputVal;
  const gb = (inputVal / 1024).toFixed(3);
  const kb = (inputVal * 1024).toLocaleString();
  const tb = (inputVal / (1024 * 1024)).toFixed(4);

  // BMI Math
  const bmi = secondaryVal > 0 ? (inputVal / Math.pow(secondaryVal / 100, 2)).toFixed(1) : '0';

  // Discount Math
  const savedAmount = ((inputVal * secondaryVal) / 100).toFixed(2);
  const finalPrice = (inputVal - parseFloat(savedAmount)).toFixed(2);

  // Random Password Generator
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedResult(res);
  };

  // UUID Generator
  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setGeneratedResult(uuid);
  };

  return (
    <div className="w-full">
      {/* 1. UNIT CONVERTERS (Length, Weight, Temp, Storage) */}
      {tool.category === 'Converters' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 shrink-0">Enter Base Value:</label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(Number(e.target.value))}
              className="w-full sm:w-60 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-900 dark:text-white font-bold"
            />
          </div>

          {tool.slug === 'length-converter' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Kilometers</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{kilometers} km</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Miles</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{miles} mi</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Feet</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{feet} ft</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Inches</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{inches} in</span>
              </div>
            </div>
          )}

          {tool.slug === 'weight-converter' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Pounds (lbs)</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{lbs} lbs</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Grams</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{grams} g</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Ounces</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{ounces} oz</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Metric Tons</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{(kg / 1000).toFixed(4)} t</span>
              </div>
            </div>
          )}

          {tool.slug === 'temperature-converter' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Fahrenheit</span>
                <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{fahrenheit}°F</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Kelvin</span>
                <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{kelvin} K</span>
              </div>
            </div>
          )}

          {tool.slug === 'data-storage-converter' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Gigabytes</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{gb} GB</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Kilobytes</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{kb} KB</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Terabytes</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{tb} TB</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Megabytes</span>
                <span className="text-lg font-black text-violet-600 dark:text-violet-400">{mb} MB</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. DAILY CALCULATORS (Discount, BMI, Trip, Age) */}
      {tool.category === 'Calculators' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          {tool.slug === 'discount-calculator' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Original Price (₹)</label>
                  <input type="number" value={inputVal} onChange={(e) => setInputVal(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Discount Rate (%)</label>
                  <input type="number" value={secondaryVal} onChange={(e) => setSecondaryVal(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white" />
                </div>
              </div>
              <div className="rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-violet-100 dark:border-zinc-700/80">
                  <span className="text-zinc-500">Money Saved:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{savedAmount}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-500">Final Discounted Price:</span>
                  <span className="text-xl font-black text-violet-600 dark:text-violet-400">₹{finalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {tool.slug === 'bmi-health-calculator' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Weight (Kilograms)</label>
                  <input type="number" value={inputVal} onChange={(e) => setInputVal(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Height (Centimeters)</label>
                  <input type="number" value={secondaryVal} onChange={(e) => setSecondaryVal(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white" />
                </div>
              </div>
              <div className="rounded-2xl bg-violet-50/50 dark:bg-zinc-800/40 border border-violet-100 dark:border-zinc-800 p-6 flex flex-col justify-center items-center text-center">
                <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Your Body Mass Index</span>
                <span className="text-4xl font-black text-violet-600 dark:text-violet-400 mt-1">{bmi}</span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                  {parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) <= 24.9 ? 'Normal Healthy Weight' : 'Overweight Category'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. GENERATORS (Password & UUID) */}
      {(tool.slug === 'random-password-generator' || tool.slug === 'uuid-v4-generator') && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-sm space-y-6">
          {tool.slug === 'random-password-generator' && (
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <span>Password Length:</span>
                <span className="text-violet-600">{passLength} Characters</span>
              </div>
              <input type="range" min="8" max="32" value={passLength} onChange={(e) => setPassLength(Number(e.target.value))} className="w-full accent-violet-600" />
              <button type="button" onClick={generatePassword} className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-violet-700 shadow-md">Generate Password</button>
            </div>
          )}

          {tool.slug === 'uuid-v4-generator' && (
            <div className="space-y-4">
              <button type="button" onClick={generateUUID} className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-violet-700 shadow-md">Generate v4 UUID</button>
            </div>
          )}

          {generatedResult && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-900 dark:text-white break-all">{generatedResult}</span>
              <button onClick={() => copyToClipboard(generatedResult)} className="text-xs font-bold text-violet-600 hover:underline inline-flex items-center gap-1 shrink-0 ml-3">
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
          )}
        </div>
      )}

      {/* Default fallback container for text/other remaining tools */}
      {tool.category === 'Text' && tool.slug !== 'live-word-character-counter' && tool.slug !== 'case-converter' && tool.slug !== 'remove-duplicate-lines' && tool.slug !== 'markdown-previewer' && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} rows={6} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-xs text-zinc-900 dark:text-white focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={() => copyToClipboard(textInput)} className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white hover:bg-violet-700 flex items-center gap-1.5">
              <Copy className="h-3.5 w-3.5" /> Copy Processed Output
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
