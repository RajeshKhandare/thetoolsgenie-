import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return <div className="flex min-h-screen flex-col justify-between bg-zinc-50/40 text-zinc-900"><div><Navbar /><main className="mx-auto max-w-3xl px-4 py-12 sm:px-6"><div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10"><div className="border-b border-zinc-100 pb-6"><span className="text-xs font-bold uppercase tracking-widest text-violet-600">Support & Inquiries</span><h1 className="mt-2 text-3xl font-extrabold text-zinc-950">Contact Us</h1><p className="mt-1 text-xs text-zinc-500">Have a tool request, bug report, or partnership inquiry? Reach out directly.</p></div><div className="space-y-3 rounded-xl border border-violet-100 bg-violet-50/60 p-5"><div className="flex items-center gap-2 text-xs font-bold text-violet-800"><Mail className="h-4 w-4 text-violet-600" />Direct Support Channel</div><p className="text-xs leading-relaxed text-zinc-600">For tool enhancements or technical questions regarding client sandbox execution, email our engineering team directly at:</p><a href="mailto:support@thetoolsgenie.com" className="inline-block font-mono text-xs font-bold text-violet-700 hover:underline">support@thetoolsgenie.com</a></div><div className="text-xs leading-relaxed text-zinc-500">Inquiries regarding client performance, WASM worker optimizations, or tool additions are reviewed within 24–48 hours.</div></div></main></div><Footer /></div>;
}
