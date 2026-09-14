import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ExternalLink, CheckCircle2, ChevronRight, Star, Plus,
  CreditCard, Globe, FileCheck, MapPin, Car, Coins, Building2, ShieldCheck,
  Sparkles, Zap
} from 'lucide-react';

const INITIAL_VISIBLE = 14;

export const PopularServices = () => {
  const { services } = useServices();
  const { t, lang } = useLanguage();
  const popularServices = services.filter((service) => service.popular);
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const visibleServices = showAll
    ? popularServices
    : popularServices.slice(0, INITIAL_VISIBLE);

  const remainingCount = Math.max(0, popularServices.length - INITIAL_VISIBLE);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#006A4E]' };
    switch (iconName) {
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'Building2': return <Building2 {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-14 bg-[#F7FAF9] relative overflow-hidden"
    >
      <style>{`
        @keyframes popFadeUp {
          from { opacity: 0; transform: translateY(32px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popHeaderIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes iconPop {
          0% { transform: scale(1) rotate(0); }
          40% { transform: scale(1.18) rotate(-8deg); }
          70% { transform: scale(1.08) rotate(4deg); }
          100% { transform: scale(1.1) rotate(0); }
        }
        @keyframes starSpin {
          0% { transform: rotate(0) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 106, 78, 0.2); }
          50% { box-shadow: 0 0 0 6px rgba(0, 106, 78, 0); }
        }
        @keyframes btnShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes moreFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes moreRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 106, 78, 0.3); }
          50% { box-shadow: 0 0 0 12px rgba(0, 106, 78, 0); }
        }
        @keyframes shimmerSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .pop-header-in {
          animation: popHeaderIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .pop-card-in {
          animation: popFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          opacity: 0;
        }
        .pop-card {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pop-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 48px -16px rgba(0, 106, 78, 0.2);
        }
        .pop-card:hover .pop-icon {
          animation: iconPop 0.55s ease forwards;
        }
        .pop-card:hover .pop-glow {
          opacity: 0.12;
          transform: scale(1.6);
        }
        .pop-card:hover .pop-btn-main {
          transform: scale(1.04);
          box-shadow: 0 8px 20px -6px rgba(0, 106, 78, 0.45);
        }
        .pop-card:hover .pop-btn-detail {
          background: #e2e8f0;
        }
        .pop-star {
          transition: transform 0.5s ease;
        }
        .pop-star:hover {
          animation: starSpin 0.7s ease;
        }
        .official-badge {
          animation: badgePulse 2.5s ease-in-out infinite;
        }
        .btn-shine {
          background: linear-gradient(90deg, #006A4E, #00a87a, #006A4E, #00a87a, #006A4E);
          background-size: 200% auto;
          animation: btnShine 3.5s linear infinite;
        }
        .more-float {
          animation: moreFloat 2.8s ease-in-out infinite;
        }
        .more-ring {
          animation: moreRing 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Soft background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-10 w-80 h-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-teal-50 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full bg-sky-50 blur-2xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 ${
            visible ? 'pop-header-in' : 'opacity-0'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="pop-star mt-0.5 p-2.5 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 text-[#006A4E] shadow-sm border border-emerald-100 cursor-default">
              <Star className="w-7 h-7 fill-[#006A4E] text-[#006A4E]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#17211D]">
                  {t('popularTitle')}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-[#006A4E] px-2 py-0.5 rounded-full border border-emerald-100">
                  <Sparkles className="w-3 h-3" />
                  {popularServices.length} {lang === 'en' ? 'hot' : 'জনপ্রিয়'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#66736D]">
                {t('popularSubtitle')}
              </p>
            </div>
          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#006A4E] bg-white hover:bg-[#006A4E] hover:text-white px-4 py-2.5 rounded-full border border-emerald-100 hover:border-[#006A4E] shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <span>{t('seeAllServices')}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid — 3 columns desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visibleServices.map((service, idx) => {
            const isHovered = hoveredId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`pop-card relative bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between group overflow-hidden ${
                  visible ? 'pop-card-in' : 'opacity-0'
                }`}
                style={{
                  animationDelay: visible ? `${idx * 0.06}s` : '0s',
                  borderColor: isHovered ? 'rgba(0, 106, 78, 0.35)' : undefined,
                }}
              >
                {/* Soft green glow */}
                <div className="pop-glow absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#006A4E] blur-3xl opacity-0 pointer-events-none transition-all duration-500" />

                <div className="relative z-10">
                  {/* Top: icon + badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="pop-icon w-13 h-13 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8F6F0] to-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                      {renderIcon(service.iconName)}
                    </div>

                    {service.verified && (
                      <span className="official-badge inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[#006A4E] text-[10px] font-bold border border-emerald-200/80">
                        <CheckCircle2 className="w-3 h-3 text-[#006A4E]" />
                        {t('official')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link to={`/services/${service.slug}`}>
                    <h3
                      className="font-bold text-base md:text-lg text-[#17211D] transition-colors duration-300 mb-1 line-clamp-1 group-hover:text-[#006A4E]"
                    >
                      {lang === 'en' ? service.nameEn : service.nameBn}
                    </h3>
                  </Link>

                  <p className="text-xs font-semibold text-[#006A4E] mb-2.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#006A4E] opacity-60" />
                    {service.department}
                  </p>

                  <p className="text-xs text-[#66736D] leading-relaxed line-clamp-3 mb-1">
                    {service.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="relative z-10 pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="pop-btn-detail w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl transition-all duration-300 text-center text-xs active:scale-95"
                  >
                    {t('details')}
                  </Link>
                  <a
                    href={service.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pop-btn-main btn-shine w-1/2 text-white font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 text-xs shadow-md active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t('goDirect')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* More card */}
          {!showAll && remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className={`pop-card relative bg-gradient-to-br from-[#E8F6F0] via-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-dashed border-[#006A4E]/40 hover:border-[#006A4E] cursor-pointer group flex flex-col items-center justify-center min-h-[260px] overflow-hidden ${
                visible ? 'pop-card-in' : 'opacity-0'
              }`}
              style={{ animationDelay: visible ? `${INITIAL_VISIBLE * 0.06}s` : '0s' }}
            >
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background: 'linear-gradient(120deg, transparent 30%, rgba(0,106,78,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmerSweep 4s ease infinite',
                }}
              />
              <div className="more-float more-ring relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center mb-4 shadow-xl shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="relative z-10 font-bold text-base text-[#006A4E] mb-1">
                {t('seeMore')}
              </h3>
              <p className="relative z-10 text-xs text-[#006A4E]/70 font-medium">
                +{remainingCount} {t('moreServices')}
              </p>
            </button>
          )}

          {!showAll && remainingCount <= 0 && popularServices.length > 0 && (
            <Link
              to="/services"
              className={`pop-card relative bg-gradient-to-br from-[#E8F6F0] via-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-dashed border-[#006A4E]/40 hover:border-[#006A4E] cursor-pointer group flex flex-col items-center justify-center min-h-[260px] overflow-hidden ${
                visible ? 'pop-card-in' : 'opacity-0'
              }`}
              style={{ animationDelay: visible ? `${visibleServices.length * 0.06}s` : '0s' }}
            >
              <div className="more-float more-ring relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="relative z-10 font-bold text-base text-[#006A4E]">{t('seeMore')}</h3>
              <p className="relative z-10 text-xs text-[#006A4E]/70 mt-1">{t('seeAllServices')}</p>
            </Link>
          )}
        </div>

        {/* Collapse */}
        {showAll && remainingCount > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-6 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {t('seeLess')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};