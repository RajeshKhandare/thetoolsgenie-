import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-zinc-50/40 text-zinc-900">
      <div><Navbar /><main className="mx-auto max-w-4xl px-4 py-12 sm:px-6"><div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="border-b border-zinc-100 pb-6"><span className="text-xs font-bold uppercase tracking-widest text-violet-600">Privacy Standard</span><h1 className="mt-2 text-3xl font-extrabold text-zinc-950">Privacy Policy</h1><p className="mt-1 text-xs text-zinc-500">Effective Date: September 2026 · Zero-Server Architecture Guarantee</p></div>
        <section className="space-y-3 text-xs leading-relaxed text-zinc-600 sm:text-sm"><h2 className="flex items-center gap-2 text-base font-bold text-zinc-900"><Lock className="h-4 w-4 text-violet-600" />1. Core Architectural Privacy (Zero Data Upload)</h2><p>TheToolsGenie operates under a strict <strong>Zero-Server Execution Paradigm</strong>. Our tools execute calculations, image adjustments, document parsing, and script evaluations directly inside your local browser using WebAssembly (WASM) and HTML5 Canvas.</p><p>Your files, code snippets, calculations, and media blobs are never transmitted across networks, processed on external cloud instances, or stored on remote servers.</p></section>
        <section className="space-y-3 text-xs leading-relaxed text-zinc-600 sm:text-sm"><h2 className="flex items-center gap-2 text-base font-bold text-zinc-900"><EyeOff className="h-4 w-4 text-violet-600" />2. Data Retention & Memory Safety</h2><p>All local buffers and Web Worker states exist exclusively within your device RAM. When you refresh or terminate the browser tab, runtime variables undergo garbage collection. We maintain zero database records of your tool usage.</p></section>
        <section className="space-y-3 text-xs leading-relaxed text-zinc-600 sm:text-sm"><h2 className="flex items-center gap-2 text-base font-bold text-zinc-900"><ShieldCheck className="h-4 w-4 text-violet-600" />3. Third-Party Analytics & Cookies</h2><p>We may utilize privacy-preserving telemetry and standard advertising providers to support free access. No personal documents or computation parameters are accessible by ad networks.</p></section>
      </div></main></div><Footer />
    </div>
  );
}
