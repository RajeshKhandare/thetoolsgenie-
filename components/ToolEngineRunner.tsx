'use client';
import React, { useState } from 'react';
import { Play, CheckCircle2, Copy, Download, RefreshCw } from 'lucide-react';
import { ToolMeta } from '@/data/toolsRegistry';
export default function ToolEngineRunner({ tool }: { tool: ToolMeta }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [inputText, setInputText] = useState('{"wish":"instant_execution","client_side":true,"speed_ms":0}');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const totalMonths = timePeriod * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  const investedAmount = monthlyInvestment * totalMonths;
  const totalValue = Math.round(
    monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );
  const estReturns = totalValue - investedAmount;
  const handlePrettifyJSON = () => {
    setIsProcessing(true);
    setCompleted(false);
    setTimeout(() => {
      try {
        const parsed = JSON.parse(inputText);
        setOutputText(JSON.stringify(parsed, null, 2));
        setCompleted(true);
      } catch (err: any) {
        setOutputText(`Syntax Error: ${err.message}`);
      }
      setIsProcessing(false);
    }, 150);
  };
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-5">
        <div>
          <span className="rounded-md bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
            {tool.badge}
          </span>
          <h2 className="mt-2 text-xl font-extrabold text-zinc-900 sm:text-2xl">
            {tool.name} Engine
          </h2>
        </div>
        {completed && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Wish Granted! Instant output ready.
          </div>
        )}
      </div>
      <div className="mt-6">
        {tool.slug === 'sip-calculator' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Monthly Investment</span>
                  <span className="text-violet-600">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="200000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="text-violet-600">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Time Horizon (Years)</span>
                  <span className="text-violet-600">{timePeriod} Yr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-violet-50/50 border border-violet-100 p-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-violet-100/80 pb-2 text-xs">
                  <span className="text-zinc-500">Invested Amount:</span>
                  <span className="font-bold text-zinc-900">₹{investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-violet-100/80 pb-2 text-xs">
                  <span className="text-zinc-500">Estimated Growth Gains:</span>
                  <span className="font-bold text-emerald-600">+₹{estReturns.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-semibold text-zinc-700">Total Future Wealth:</span>
                  <span className="text-xl font-extrabold text-violet-700">₹{totalValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setCompleted(true)}
                  className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors"
                >
                  Confirm Amortization Plan
                </button>
              </div>
            </div>
          </div>
        )}
        {tool.slug !== 'sip-calculator' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">
                Input Payload / Source
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-zinc-200 p-3 font-mono text-xs focus:border-violet-600 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrettifyJSON}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                {isProcessing ? 'Executing in Browser...' : 'Run Transformation'}
              </button>
            </div>
            {outputText && (
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Transformed Output (Client-Side)
                </label>
                <pre className="rounded-xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-violet-300 overflow-x-auto">
                  {outputText}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
