'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';

const FLAG_ICONS: Record<string, React.ReactNode> = {
  en: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#bd3d44" d="M0 0h640v480H0z"/>
      <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"/>
      <path fill="#192f5d" d="M0 0h256v258.5H0z"/>
      <circle fill="#fff" cx="128" cy="129" r="18"/>
    </svg>
  ),
  pt: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#009c3b" d="M0 0h640v480H0z"/>
      <path fill="#fedf00" d="m320 54.9 253.7 185.1L320 425.1 66.3 240z"/>
      <circle fill="#002776" cx="320" cy="240" r="88"/>
    </svg>
  ),
  es: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#aa151b" d="M0 0h640v480H0z"/>
      <path fill="#f1bf00" d="M0 120h640v240H0z"/>
    </svg>
  ),
  de: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#000" d="M0 0h640v160H0z"/>
      <path fill="#d00" d="M0 160h640v160H0z"/>
      <path fill="#ffce00" d="M0 320h640v160H0z"/>
    </svg>
  ),
  fr: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#002654" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
    </svg>
  ),
  it: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#009246" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
    </svg>
  ),
  ja: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <circle fill="#bc002d" cx="320" cy="240" r="144"/>
    </svg>
  ),
  ko: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <circle fill="#cd2e3a" cx="320" cy="240" r="100"/>
    </svg>
  ),
  zh: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#de2910" d="M0 0h640v480H0z"/>
      <circle fill="#ffde00" cx="120" cy="120" r="30"/>
    </svg>
  ),
  ru: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v160H0z"/>
      <path fill="#0039a6" d="M0 160h640v160H0z"/>
      <path fill="#d52b1e" d="M0 320h640v160H0z"/>
    </svg>
  ),
  ar: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#006c35" d="M0 0h640v480H0z"/>
      <path fill="#fff" d="M120 230h400v20H120z"/>
    </svg>
  ),
  hi: (
    <svg className="h-3.5 w-5 rounded-sm object-cover shadow-sm shrink-0" viewBox="0 0 640 480">
      <path fill="#ff9933" d="M0 0h640v160H0z"/>
      <path fill="#fff" d="M0 160h640v160H0z"/>
      <path fill="#138808" d="M0 320h640v160H0z"/>
      <circle cx="320" cy="240" r="35" fill="#000080"/>
    </svg>
  ),
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check existing cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      const code = match[1] === 'zh-CN' ? 'zh' : match[1];
      setSelectedLang(code);
    }

    // 2. Continuous DOM observer to stop Google from injecting inline "top: 40px"
    const observer = new MutationObserver(() => {
      if (document.body.style.top !== '0px' && document.body.style.top !== '') {
        document.body.style.setProperty('top', '0px', 'important');
      }
      if (document.documentElement.style.top !== '0px' && document.documentElement.style.top !== '') {
        document.documentElement.style.setProperty('top', '0px', 'important');
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    // 3. Inject Google script silently
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

    return () => {
      observer.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setIsOpen(false);

    const targetCode = langCode === 'zh' ? 'zh-CN' : langCode;
    document.cookie = `googtrans=/en/${targetCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${targetCode}; path=/;`;
    window.location.reload();
  };

  const current = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      <div id="google_hidden_engine" className="hidden" />

      {/* Styled Button with Crisp Vector Flag */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-violet-500/50 transition-all shadow-sm"
      >
        <span className="flex items-center">{FLAG_ICONS[current.code] || <Globe className="h-4 w-4" />}</span>
        <span className="leading-none">{current.name}</span>
        <ChevronDown className={`h-3 w-3 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-violet-600' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-xl shadow-zinc-950/10 dark:shadow-zinc-950/50 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-violet-50 dark:hover:bg-zinc-900 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {FLAG_ICONS[lang.code]}
                <span className="leading-none">{lang.name}</span>
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
