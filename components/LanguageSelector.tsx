'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hidden Google script initialization
    if (!document.getElementById('google-translate-hidden-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-hidden-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitHidden';
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInitHidden = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_hidden_engine'
        );
      };
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setIsOpen(false);

    // Trigger translation seamlessly via cookie
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    window.location.reload();
  };

  const current = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      {/* Hidden container for engine */}
      <div id="google_hidden_engine" className="hidden" />

      {/* Modern Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:border-violet-500/50 transition-all shadow-sm"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="hidden sm:inline-block">{current.name}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Styled SaaS Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-xl shadow-zinc-950/10 dark:shadow-zinc-950/50 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-violet-50 dark:hover:bg-zinc-900 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {selectedLang === lang.code && (
                <Check className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
