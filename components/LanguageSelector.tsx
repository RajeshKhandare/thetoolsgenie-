'use client';

import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  useEffect(() => {
    // Add Google Translate Script dynamically
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) return;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

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

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-xs">
      <Globe className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
      <div id="google_translate_element" className="notranslate scale-90 origin-left" />
    </div>
  );
}
