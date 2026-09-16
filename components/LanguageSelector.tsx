'use client';

import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,de,fr,it,pt,ja,ko,zh-CN,ru,ar,hi',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 shadow-sm">
      <Globe className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
      <div 
        id="google_translate_element" 
        className="notranslate [&_.goog-te-gadget-simple]:!bg-transparent [&_.goog-te-gadget-simple]:!border-none [&_.goog-te-gadget-simple]:!p-0 [&_.goog-te-gadget-simple_span]:!text-xs [&_.goog-te-gadget-simple_span]:!font-medium [&_.goog-te-gadget-simple_span]:!text-zinc-700 dark:[&_.goog-te-gadget-simple_span]:!text-zinc-300"
      />
    </div>
  );
}
