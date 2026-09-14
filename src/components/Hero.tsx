import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, ShieldCheck, RefreshCw, Smartphone,
  Compass, Lock, Globe2, Sparkles, TrendingUp, Zap
} from 'lucide-react';
import { ServiceFinderModal } from './ServiceFinderModal';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../data/translations';

const FEATURE_KEYS: {
  icon: typeof ShieldCheck;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
  gradient: string;
}[] = [
  {
    icon: ShieldCheck,
    titleKey: 'f1Title',
    descKey: 'f1Desc',
    color: '#006A4E',
    gradient: 'linear-gradient(145deg, #006A4E 0%, #00a87a 50%, #004D3A 100%)',
  },
  {
    icon: RefreshCw,
    titleKey: 'f2Title',
    descKey: 'f2Desc',
    color: '#2563EB',
    gradient: 'linear-gradient(145deg, #1d4ed8 0%, #3b82f6 50%, #1e3a8a 100%)',
  },
  {
    icon: Smartphone,
    titleKey: 'f3Title',
    descKey: 'f3Desc',
    color: '#9333EA',
    gradient: 'linear-gradient(145deg, #7e22ce 0%, #a855f7 50%, #581c87 100%)',
  },
  {
    icon: Lock,
    titleKey: 'f4Title',
    descKey: 'f4Desc',
    color: '#DC2626',
    gradient: 'linear-gradient(145deg, #b91c1c 0%, #ef4444 50%, #7f1d1d 100%)',
  },
  {
    icon: Globe2,
    titleKey: 'f5Title',
    descKey: 'f5Desc',
    color: '#0891B2',
    gradient: 'linear-gradient(145deg, #0e7490 0%, #22d3ee 50%, #164e63 100%)',
  },
];

// Rotating Search Placeholders
const SEARCH_PLACEHOLDERS = [
  'যেমন: NID কার্ড আবেদন...',
  'যেমন: পাসপোর্ট স্ট্যাটাস চেক...',
  'যেমন: জন্ম নিবন্ধন...',
  'যেমন: জমির খতিয়ান...',
  'যেমন: ড্রাইভিং লাইসেন্স...',
  'যেমন: আয়কর রিটার্ন...',
];

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  // Auto-rotate feature slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % FEATURE_KEYS.length);
        setIsAnimating(true);
      }, 80);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Rotating search placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === activeSlide) return;
    setIsAnimating(false);
    setTimeout(() => {
      setActiveSlide(idx);
      setIsAnimating(true);
    }, 80);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickTag = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  const quickTags = [
    { name: 'NID', icon: '🆔' },
    { name: 'পাসপোর্ট', icon: '📘' },
    { name: 'জন্ম নিবন্ধন', icon: '📜' },
    { name: 'খতিয়ান', icon: '🗺️' },
    { name: 'ড্রাইভিং লাইসেন্স', icon: '🚗' },
    { name: 'ট্যাক্স', icon: '💰' },
  ];

  const current = FEATURE_KEYS[activeSlide];
  const IconComp = current.icon;

  return (
    <>
      <section className="relative min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden py-12 lg:py-16">

        {/* ============ DYNAMIC BACKGROUND ============ */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/70 to-sky-100" />

          {/* Animated color blobs */}
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
              animation: 'blobFloat 14s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-45"
            style={{
              background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
              animation: 'blobFloat 16s ease-in-out infinite reverse',
            }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
              animation: 'blobFloat 18s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)',
              animation: 'blobFloat 20s ease-in-out infinite',
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  backgroundColor: ['#006A4E', '#F42A41', '#0ea5e9', '#10b981'][i % 4],
                  opacity: 0.15,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `particleFloat ${8 + Math.random() * 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Grid dots */}
          <div className="absolute inset-0 opacity-[0.3] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* BD Flag/Monument vector */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5 pointer-events-none opacity-90">
            <svg className="absolute right-4 top-10 w-full h-full max-w-md" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="280" cy="200" rx="160" ry="180" fill="#006A4E" opacity="0.08" />
              <rect x="300" y="40" width="5" height="280" rx="2" fill="#64748b" opacity="0.35" />
              <path d="M305 50 C360 40 390 70 420 55 L420 140 C390 155 360 125 305 135 Z" fill="#006A4E" opacity="0.45" style={{ animation: 'flagWave 4s ease-in-out infinite' }} />
              <circle cx="355" cy="92" r="28" fill="#F42A41" opacity="0.55" style={{ animation: 'flagWave 4s ease-in-out infinite' }} />
              <path d="M0 420 Q120 360 220 400 T420 380 L420 500 L0 500 Z" fill="#006A4E" opacity="0.06" />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
        </div>

        <style>{`
          @keyframes blobFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.08); }
            66% { transform: translate(-25px, 20px) scale(0.95); }
          }
          @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 0.15; }
            50% { transform: translate(30px, -40px); opacity: 0.35; }
          }
          @keyframes flagWave {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(3px); }
          }
          @keyframes softSlideIn {
            0% { opacity: 0; transform: translateY(24px) scale(0.94); filter: blur(6px); }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          }
          @keyframes softIconIn {
            0% { opacity: 0; transform: scale(0.6) translateY(12px); }
            70% { opacity: 1; transform: scale(1.06) translateY(-2px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes softTextIn {
            0% { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes floaty {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes ringPulse {
            0%, 100% { transform: scale(1); opacity: 0.35; }
            50% { transform: scale(1.15); opacity: 0.15; }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes titleReveal {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes placeholderFade {
            0% { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes searchGlow {
            0%, 100% {
              box-shadow: 0 10px 40px -10px rgba(0, 106, 78, 0.15),
                          0 0 0 1px rgba(0, 106, 78, 0.08);
            }
            50% {
              box-shadow: 0 15px 50px -10px rgba(0, 106, 78, 0.3),
                          0 0 0 2px rgba(0, 106, 78, 0.2);
            }
          }
          @keyframes shimmerButton {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes tagPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes badgeShine {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(200%); }
          }

          .hero-title-wrap { overflow: visible; padding-bottom: 0.15em; padding-top: 0.05em; }
          .hero-title-gradient {
            display: inline-block; width: 100%; overflow: visible;
            line-height: 1.4; padding-bottom: 0.15em;
            background: linear-gradient(110deg, #004D3A 0%, #006A4E 20%, #0d9488 40%, #F42A41 55%, #006A4E 75%, #004D3A 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text; background-clip: text;
            color: transparent; -webkit-text-fill-color: transparent;
            animation: gradientShift 7s ease-in-out infinite, titleReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .hero-title-line2 {
            display: inline-block; width: 100%; overflow: visible;
            line-height: 1.4; padding-bottom: 0.2em; margin-top: 0.05em;
            background: linear-gradient(110deg, #006A4E 0%, #10b981 30%, #F42A41 50%, #0ea5e9 70%, #006A4E 100%);
            background-size: 220% auto;
            -webkit-background-clip: text; background-clip: text;
            color: transparent; -webkit-text-fill-color: transparent;
            animation: gradientShift 8s ease-in-out infinite reverse, titleReveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
          }

          .soft-slide { animation: softSlideIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .soft-icon { animation: softIconIn 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .soft-text { animation: softTextIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both; }
          .soft-text-delay { animation: softTextIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both; }
          .floaty-icon { animation: floaty 3.5s ease-in-out infinite; }
          .ring-pulse { animation: ringPulse 3s ease-in-out infinite; }
          .placeholder-fade { animation: placeholderFade 0.5s ease-out; }
          .search-glow { animation: searchGlow 3s ease-in-out infinite; }
          .search-glow-focused {
            box-shadow: 0 20px 60px -10px rgba(0, 106, 78, 0.4),
                        0 0 0 3px rgba(0, 106, 78, 0.25);
          }
          .shimmer-btn {
            background: linear-gradient(90deg, #006A4E 0%, #00a87a 25%, #006A4E 50%, #00a87a 75%, #006A4E 100%);
            background-size: 200% auto;
            animation: shimmerButton 4s linear infinite;
          }
          .tag-hover:hover { animation: tagPulse 0.5s ease; }
          .badge-shine-container { position: relative; overflow: hidden; }
          .badge-shine::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            animation: badgeShine 3s ease-in-out infinite;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* ============ LEFT ============ */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="badge-shine-container relative inline-flex items-center gap-2 bg-[#E8F6F0] border border-[#006A4E]/30 text-[#006A4E] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  <span className="badge-shine absolute inset-0" />
                  <Sparkles className="w-3.5 h-3.5 text-[#006A4E] relative z-10" />
                  <span className="relative z-10">{t('welcome')}</span>
                </div>

                <button
                  onClick={() => setIsFinderOpen(true)}
                  className="tag-hover inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-900 border border-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-sm hover:shadow-md"
                >
                  <Compass className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>{t('finderBtn')}</span>
                </button>

                <div className="hidden sm:inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>৪১+ সরকারি সেবা</span>
                </div>
              </div>

              {/* Gradient Animated Title */}
              <h1 className="hero-title-wrap text-3xl sm:text-4xl lg:text-[50px] font-black tracking-tight">
                <span className="hero-title-gradient">
                  {t('heroTitle1')}
                </span>
                <span className="hero-title-line2">
                  {t('heroTitle2')}
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-700 font-medium leading-relaxed max-w-xl">
                {t('heroDesc')}
              </p>

              {/* ============ ENHANCED SEARCH BAR ============ */}
              <form onSubmit={handleSearch} className="pt-2">
                <div
                  className={`bg-white rounded-2xl border-2 flex items-center max-w-2xl relative overflow-hidden transition-all duration-300 ${
                    isSearchFocused
                      ? 'border-[#006A4E] search-glow-focused scale-[1.01]'
                      : 'border-slate-200/90 search-glow'
                  }`}
                >
                  {/* Left icon with pulse */}
                  <div className="pl-4 pr-2 flex items-center gap-2">
                    <div className="relative">
                      <Search className={`w-5 h-5 transition-colors ${isSearchFocused ? 'text-[#006A4E]' : 'text-slate-400'}`} />
                      {isSearchFocused && (
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-[#006A4E]/20 animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Input with rotating placeholder */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder=""
                      className="w-full px-2 py-3.5 text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none font-medium relative z-10"
                    />
                    {!searchQuery && (
                      <div className="absolute inset-0 flex items-center px-2 pointer-events-none">
                        <span
                          key={placeholderIdx}
                          className="placeholder-fade text-xs sm:text-sm text-slate-400 font-medium truncate"
                        >
                          {SEARCH_PLACEHOLDERS[placeholderIdx]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enter hint */}
                  {searchQuery && (
                    <div className="hidden sm:flex items-center gap-1 pr-2">
                      <kbd className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                        Enter
                      </kbd>
                    </div>
                  )}

                  {/* Search button */}
                  <button
                    type="submit"
                    className="shimmer-btn text-white font-bold px-6 py-3 m-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs sm:text-sm flex-shrink-0 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{t('searchBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular tags with icons */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold">
                <span className="text-[#006A4E] font-bold mr-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t('popularSearch')}
                </span>
                {quickTags.map((tag, idx) => (
                  <button
                    key={tag.name}
                    onClick={() => handleQuickTag(tag.name)}
                    type="button"
                    className="tag-hover bg-white/90 hover:bg-[#006A4E] hover:text-white text-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-[#006A4E] shadow-sm hover:shadow-md transition-all duration-200 text-xs font-semibold flex items-center gap-1.5"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ============ RIGHT ROTATING CARD ============ */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-sm ml-auto relative overflow-hidden border border-white">
                <div
                  className="absolute -top-20 -right-16 w-56 h-56 rounded-full blur-3xl transition-all duration-[1200ms] ease-out pointer-events-none"
                  style={{ backgroundColor: current.color, opacity: 0.18 }}
                />
                <div
                  className="absolute -bottom-24 -left-16 w-48 h-48 rounded-full blur-3xl transition-all duration-[1200ms] ease-out pointer-events-none"
                  style={{ backgroundColor: current.color, opacity: 0.12 }}
                />

                <div className="relative z-10 p-8 min-h-[320px] flex flex-col justify-center">
                  {isAnimating && (
                    <div key={activeSlide} className="soft-slide">
                      <div className="relative w-24 h-24 mb-7">
                        <div
                          className="ring-pulse absolute inset-0 rounded-[28px]"
                          style={{ backgroundColor: current.color, opacity: 0.2 }}
                        />
                        <div
                          className="ring-pulse absolute -inset-2 rounded-[32px]"
                          style={{ backgroundColor: current.color, opacity: 0.1, animationDelay: '0.5s' }}
                        />
                        <div
                          className="soft-icon floaty-icon absolute inset-0 rounded-[28px] flex items-center justify-center shadow-xl"
                          style={{ background: current.gradient }}
                        >
                          <IconComp className="w-11 h-11 text-white drop-shadow-md" />
                        </div>
                      </div>

                      <h3 className="soft-text text-2xl font-black text-[#17211D] leading-snug mb-3">
                        {t(current.titleKey)}
                      </h3>
                      <p className="soft-text-delay text-sm text-[#66736D] leading-relaxed mb-6">
                        {t(current.descKey)}
                      </p>
                      <div className="soft-text-delay">
                        <span
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-colors duration-700"
                          style={{
                            backgroundColor: `${current.color}18`,
                            color: current.color,
                          }}
                        >
                          ✓ {t('verifiedLinks')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 px-6 pb-5 pt-3 flex items-center justify-between border-t border-slate-100/80">
                  <span className="text-xs font-bold text-[#006A4E] italic font-serif tracking-wide">
                    Digital Bangladesh ♡
                  </span>
                  <div className="flex items-center gap-2">
                    {FEATURE_KEYS.map((slide, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        className="rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: idx === activeSlide ? '18px' : '7px',
                          height: '7px',
                          backgroundColor: idx === activeSlide ? slide.color : '#d1d5db',
                          opacity: idx === activeSlide ? 1 : 0.7,
                        }}
                        aria-label={`slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ServiceFinderModal isOpen={isFinderOpen} onClose={() => setIsFinderOpen(false)} />
    </>
  );
};