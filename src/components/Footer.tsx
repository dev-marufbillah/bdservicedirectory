import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import {
  Bell, Phone, Mail, MapPin, ChevronRight, ShieldCheck,
  Search, Compass, CheckCircle2, ExternalLink, HelpCircle,
  Sparkles, ArrowUp, Heart
} from 'lucide-react';

export const Footer = () => {
  const { t, lang } = useLanguage();
  const [showTop, setShowTop] = useState(false);
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [updateIdx, setUpdateIdx] = useState(0);

  const updates = [
    { titleBn: 'নতুন পাসপোর্ট সেবা এখন অনলাইনে', titleEn: 'New passport service now online', dateBn: '১২ সেপ্টেম্বর ২০২৫', dateEn: '12 Sep 2025', tag: 'Passport', color: '#2563EB' },
    { titleBn: 'জমির খতিয়ান ডিজিটাল কপি ডাউনলোড চালু', titleEn: 'Land record digital download enabled', dateBn: '১০ সেপ্টেম্বর ২০২৫', dateEn: '10 Sep 2025', tag: 'Land', color: '#16A34A' },
    { titleBn: 'NID সেবা আপডেট ও ই-সেবা পোর্টাল পুনঃচালু', titleEn: 'NID service update & e-service restored', dateBn: '০৪ সেপ্টেম্বর ২০২৫', dateEn: '04 Sep 2025', tag: 'NID', color: '#DC2626' },
    { titleBn: 'ড্রাইভিং লাইসেন্স নবায়নে নতুন নিয়মাবলী', titleEn: 'New rules for driving license renewal', dateBn: '০১ সেপ্টেম্বর ২০২৫', dateEn: '01 Sep 2025', tag: 'BRTA', color: '#9333EA' },
  ];

  const quickServices = [
    { nameBn: 'জাতীয় পরিচয়পত্র (NID)', nameEn: 'National ID (NID)', path: '/services/nid', emoji: '🆔' },
    { nameBn: 'ই-পাসপোর্ট', nameEn: 'E-Passport', path: '/services/passport', emoji: '📘' },
    { nameBn: 'জন্ম নিবন্ধন', nameEn: 'Birth Registration', path: '/services/birth-registration', emoji: '📜' },
    { nameBn: 'ই-খতিয়ান', nameEn: 'E-Khatian', path: '/services/e-khatian', emoji: '🗺️' },
    { nameBn: 'ড্রাইভিং লাইসেন্স', nameEn: 'Driving License', path: '/services/brta-bsp', emoji: '🚗' },
    { nameBn: 'আয়কর রিটার্ন', nameEn: 'Tax Return', path: '/services/e-return', emoji: '💰' },
  ];

  const trustItems = [
    { icon: ShieldCheck, titleKey: 'verifiedLinks' as const, descKey: 'onlyGov' as const, color: '#10b981' },
    { icon: Search, titleKey: 'smartSearch' as const, descKey: 'bnEnSearch' as const, color: '#38bdf8' },
    { icon: CheckCircle2, titleKey: 'free' as const, descKey: 'freeCitizen' as const, color: '#fbbf24' },
  ];

  // Scroll to top button visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal footer when in view
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate updates highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateIdx((p) => (p + 1) % updates.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [updates.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes footerFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes footerFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmerLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes updateSlide {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.15); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.3); }
        }
        @keyframes topBtnIn {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .footer-reveal {
          animation: footerFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .footer-card-hover {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
        }
        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
          background-size: 200% auto;
          animation: shimmerLine 3s linear infinite;
        }
        .update-active {
          animation: updateSlide 0.5s ease-out;
        }
        .trust-icon-float {
          animation: footerFloat 3s ease-in-out infinite;
        }
        .live-dot {
          animation: pulseDot 1.5s ease-in-out infinite;
        }
        .glow-card {
          animation: glowPulse 4s ease-in-out infinite;
        }
        .top-btn-in {
          animation: topBtnIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .quick-chip {
          transition: all 0.25s ease;
        }
        .quick-chip:hover {
          transform: translateY(-2px) scale(1.04);
          background: rgba(16, 185, 129, 0.35) !important;
        }
        .link-slide {
          transition: all 0.2s ease;
        }
        .link-slide:hover {
          padding-left: 6px;
          color: #fff;
        }
      `}</style>

      <footer
        ref={footerRef}
        className={`relative bg-[#004D3A] text-white pt-12 pb-8 border-t-4 border-[#F42A41] overflow-hidden ${
          visible ? 'footer-reveal' : 'opacity-0'
        }`}
      >
        {/* Decorative ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-green-600/10 blur-3xl" />
          {/* subtle grid */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ===== TOP: Trust Card + Live Updates ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">

            {/* Left Trust Card */}
            <div className="lg:col-span-7 glow-card bg-gradient-to-br from-[#006A4E] via-[#005841] to-[#004D3A] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 relative overflow-hidden footer-card-hover">
              {/* shimmer top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-border" />
              
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300/20 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {t('whyTitle')}
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-3">
                {t('whyHeadline')}
              </h3>

              <p className="text-xs text-emerald-100/90 leading-relaxed max-w-md mb-6">
                {t('whyDesc')}
              </p>

              {/* Trust 3 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {trustItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/10 hover:bg-white/15 rounded-2xl p-3.5 border border-white/10 transition-all duration-300 hover:scale-[1.03] cursor-default"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div
                        className="trust-icon-float w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${item.color}25`, animationDelay: `${idx * 0.4}s` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <p className="text-xs font-bold text-white">{t(item.titleKey)}</p>
                      <p className="text-[10px] text-emerald-100/80 mt-0.5">{t(item.descKey)}</p>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/services"
                  className="bg-white hover:bg-emerald-50 text-[#006A4E] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('seeAllServices')}</span>
                </Link>
                <Link
                  to="/help"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('helpCenter')}</span>
                </Link>
                <Link
                  to="/categories"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t('seeAllCategories')}</span>
                </Link>
              </div>
            </div>

            {/* Right: Live Updates carousel-style */}
            <div className="lg:col-span-5 bg-emerald-950/50 rounded-3xl p-6 border border-emerald-800/50 flex flex-col footer-card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-emerald-800/60 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-emerald-400" />
                    <span className="live-dot absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full" />
                  </div>
                  <h3 className="font-bold text-base text-white">{t('recentUpdates')}</h3>
                  <span className="text-[9px] font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full border border-rose-500/30 uppercase tracking-wider">
                    Live
                  </span>
                </div>
                <Link to="/services" className="text-xs font-bold text-emerald-300 hover:text-white transition flex items-center gap-0.5">
                  <span>{t('seeAll')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5 flex-1 relative z-10">
                {updates.map((item, idx) => {
                  const isActive = idx === updateIdx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setUpdateIdx(idx)}
                      className={`flex items-start justify-between gap-3 text-xs rounded-xl p-3 cursor-pointer transition-all duration-500 border ${
                        isActive
                          ? 'bg-emerald-800/40 border-emerald-600/40 update-active scale-[1.02]'
                          : 'bg-transparent border-transparent hover:bg-emerald-900/30 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <p className={`font-medium line-clamp-1 transition-colors ${isActive ? 'text-white' : 'text-emerald-100'}`}>
                            {lang === 'en' ? item.titleEn : item.titleBn}
                          </p>
                        </div>
                        <span className="text-[10px] text-emerald-400/80 pl-3.5 block">
                          {lang === 'en' ? item.dateEn : item.dateBn}
                        </span>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded font-semibold flex-shrink-0 border transition-all"
                        style={{
                          backgroundColor: isActive ? `${item.color}30` : 'rgba(6,78,59,0.5)',
                          color: isActive ? item.color : '#a7f3d0',
                          borderColor: isActive ? `${item.color}50` : 'rgba(6,95,70,0.5)',
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dots for updates */}
              <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-emerald-800/40 relative z-10">
                {updates.map((u, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUpdateIdx(idx)}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: idx === updateIdx ? '16px' : '6px',
                      height: '6px',
                      backgroundColor: idx === updateIdx ? u.color : 'rgba(167,243,208,0.35)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== Quick service chips ===== */}
          <div className="py-5 border-y border-emerald-800/50 mb-8">
            <p className="text-xs font-bold text-emerald-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t('quickPopular')}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickServices.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="quick-chip bg-emerald-900/50 text-emerald-100 text-[11px] font-semibold px-3.5 py-2 rounded-full border border-emerald-700/50 flex items-center gap-1.5"
                >
                  <span>{s.emoji}</span>
                  <span>{lang === 'en' ? s.nameEn : s.nameBn}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== Main Links Grid ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/50">

            <div className="lg:col-span-4 space-y-4">
              <Logo light />
              <p className="text-xs text-emerald-100/90 leading-relaxed max-w-sm">
                {t('brandDesc')}
              </p>
              <div className="p-3.5 bg-emerald-900/40 rounded-2xl border border-emerald-700/40 text-[11px] text-emerald-200/90 leading-relaxed hover:bg-emerald-900/55 transition-colors">
                <strong className="text-emerald-300">
                  {lang === 'en' ? 'Legal notice:' : 'আইনি তথ্য:'}
                </strong>{' '}
                {lang === 'en'
                  ? 'We do not store citizens’ NID, passport, tax or any sensitive data.'
                  : 'আমরা নাগরিকদের কোনো NID, পাসপোর্ট, কর বা সংবেদনশীল ডাটা সংরক্ষণ করি না।'}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-bold text-sm text-emerald-300">{t('quickLinks')}</h4>
              <ul className="space-y-1 text-xs text-emerald-100/90">
                {[
                  { to: '/', label: t('home') },
                  { to: '/services', label: t('services') },
                  { to: '/categories', label: t('categories') },
                  { to: '/help', label: t('help') },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-slide hover:text-white flex items-center gap-1 py-1">
                      <ChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-sm text-emerald-300">{t('aboutUs')}</h4>
              <ul className="space-y-1 text-xs text-emerald-100/90">
                <li><Link to="/about" className="link-slide block py-1 hover:text-white">{t('ourIntro')}</Link></li>
                <li><Link to="/about" className="link-slide block py-1 hover:text-white">{t('privacy')}</Link></li>
                <li><Link to="/about" className="link-slide block py-1 hover:text-white">{t('terms')}</Link></li>
                <li>
                  <Link to="/report-broken-link" className="link-slide block py-1 font-bold text-emerald-300 hover:text-white">
                    {t('reportBroken')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-sm text-emerald-300">{t('contact')}</h4>
              <ul className="space-y-2.5 text-xs text-emerald-100/90">
                <li className="flex items-center gap-2.5 group">
                  <span className="w-8 h-8 rounded-lg bg-emerald-800/50 flex items-center justify-center group-hover:bg-emerald-700/60 transition">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  {t('hotline')}
                </li>
                <li className="flex items-center gap-2.5 group">
                  <span className="w-8 h-8 rounded-lg bg-emerald-800/50 flex items-center justify-center group-hover:bg-emerald-700/60 transition">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  {t('email')}
                </li>
                <li className="flex items-center gap-2.5 group">
                  <span className="w-8 h-8 rounded-lg bg-emerald-800/50 flex items-center justify-center group-hover:bg-emerald-700/60 transition">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  {t('address')}
                </li>
                <li className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl border border-white/20 transition-all text-[11px] hover:scale-105 active:scale-95"
                  >
                    {t('contactForm')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/80 gap-3">
            <p className="flex items-center gap-1.5">
              {t('copyright')}
            </p>
            <span className="font-serif italic text-emerald-300 font-bold tracking-wider flex items-center gap-1.5">
              Digital Bangladesh <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="top-btn-in fixed bottom-20 md:bottom-8 right-5 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white shadow-xl shadow-emerald-900/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-emerald-400/30"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};