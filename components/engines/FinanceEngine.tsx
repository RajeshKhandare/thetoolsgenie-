'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function FinanceEngine({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [val1, setVal1] = useState<number>(5000); // e.g. Monthly investment or Loan amount
  const [val2, setVal2] = useState<number>(12); // e.g. Rate of return or Interest rate
  const [val3, setVal3] = useState<number>(10); // e.g. Tenure in years

  // Real SIP Compound Formulation: M * ({[1 + i]^n - 1} / i) * (1 + i)
  const i = val2 / 12 / 100;
  const n = val3 * 12;
  const investedAmount = val1 * n;
  const totalValue = Math.round(val1 * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const estimatedReturns = totalValue - investedAmount;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders Input Panel */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Monthly Investment / Base Amount</span>
              <span className="text-violet-600">${val1.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={val1}
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Expected Annual Return Rate (%)</span>
              <span className="text-violet-600">{val2}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={val2}
              onChange={(e) => setVal2(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Time Period (Years)</span>
              <span className="text-violet-600">{val3} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              value={val3}
              onChange={(e) => setVal3(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-6 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Projections</span>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-xs font-medium text-zinc-500">
                <span>Invested Principal</span>
                <span className="font-bold text-zinc-900 dark:text-white">${investedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-zinc-500">
                <span>Estimated Returns</span>
                <span className="font-bold text-emerald-600">+${estimatedReturns.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">Total Future Value</span>
                <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                  ${totalValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-zinc-400">
            Calculated locally using standard compound frequency interest equations.
          </div>
        </div>
      </div>
    </div>
  );
}
