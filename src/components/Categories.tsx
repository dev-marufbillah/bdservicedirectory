import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Home, Car, Coins, GraduationCap,
  HeartPulse, Briefcase, Building2, Scale,
  Landmark, LayoutGrid, ChevronRight, Layers,
  Leaf, Zap, Plane, ShieldCheck, Heart, Plus, Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const HOME_VISIBLE = 14;

export const Categories = () => {
  const { t, lang } = useLanguage();
  const visibleCategories = CATEGORIES.slice(0, HOME_VISIBLE);
  const remainingCount = Math.max(0, CATEGORIES.length - HOME_VISIBLE);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderIcon = (iconName: string) => {
    const props = { size: 22, className: 'text-white' };
    switch (iconName) {
      case 'Users': return <Users {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <LayoutGrid {...props} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-14 bg-white relative overflow-hidden"
    >
      <style>{`
        @keyframes catFadeUp {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes headerSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes iconBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(1.15) rotate(-6deg); }
          70% { transform: scale(1.08) rotate(3deg); }
        }
        @keyframes arrowSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes morePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 106, 78, 0.25); }
          50% { box-shadow: 0 0 0 10px rgba(0, 106, 78, 0); }
        }
        @keyframes shimmerBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .cat-header-in {
          animation: headerSlide 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .cat-card-in {
          animation: catFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          opacity: 0;
        }
        .cat-card {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(0, 106, 78, 0.18);
        }
        .cat-icon-wrap {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cat-card:hover .cat-icon-wrap {
          animation: iconBounce 0.6s ease;
          transform: scale(1.12);
        }
        .cat-card:hover .cat-arrow {
          animation: arrowSlide 0.8s ease infinite;
          opacity: 1 !important;
          color: #006A4E;
        }
        .cat-card:hover .cat-glow {
          opacity: 0.15;
          transform: scale(1.5);
        }
        .more-card {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .more-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .more-icon-pulse {
          animation: morePulse 2.5s ease-in-out infinite;
        }
        .more-icon-float {
          animation: floatSoft 2.5s ease-in-out infinite;
        }
        .cat-count-badge {
          transition: all 0.3s ease;
        }
        .cat-card:hover .cat-count-badge {
          background: #006A4E;
          color: white;
          transform: scale(1.05);
        }
      `}</style>

      {/* Soft background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-80" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-sky-50 blur-3xl opacity-70" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-teal-50 blur-2xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 ${visible ? 'cat-header-in' : 'opacity-0'}`}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-2.5 rounded-2xl bg-gradient-to-br from-[#E8F6F0] to-emerald-100 text-[#006A4E] shadow-sm border border-emerald-100">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#17211D]">
                  {t('categoriesTitle')}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-[#006A4E] px-2 py-0.5 rounded-full border border-emerald-100">
                  <Sparkles className="w-3 h-3" />
                  {CATEGORIES.length}+
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#66736D]">
                {t('categoriesSubtitle')}
              </p>
            </div>
          </div>

          <Link
            to="/categories"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#006A4E] bg-emerald-50 hover:bg-[#006A4E] hover:text-white px-4 py-2.5 rounded-full border border-emerald-100 hover:border-[#006A4E] transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <span>{t('seeAllCategories')}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {visibleCategories.map((cat, idx) => {
            const isHovered = hoveredId === cat.id;
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`cat-card relative bg-white rounded-2xl p-4 md:p-5 border border-slate-200/90 cursor-pointer group flex flex-col h-full overflow-hidden ${
                  visible ? 'cat-card-in' : 'opacity-0'
                }`}
                style={{
                  animationDelay: visible ? `${idx * 0.05}s` : '0s',
                  borderColor: isHovered ? `${cat.color}55` : undefined,
                }}
              >
                {/* Soft color glow on hover */}
                <div
                  className="cat-glow absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: cat.color }}
                />

                {/* Top row: icon + arrow */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div
                    className="cat-icon-wrap w-12 h-12 md:w-[52px] md:h-[52px] rounded-2xl flex items-center justify-center shadow-md relative"
                    style={{
                      background: `linear-gradient(145deg, ${cat.color}, ${cat.color}cc)`,
                    }}
                  >
                    {/* ring */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 0 4px ${cat.color}33`,
                      }}
                    />
                    {renderIcon(cat.iconName)}
                  </div>

                  <ChevronRight className="cat-arrow w-4 h-4 md:w-5 md:h-5 text-slate-300 opacity-50 transition-all duration-300 mt-1" />
                </div>

                {/* Text */}
                <div className="flex-grow relative z-10">
                  <h3
                    className="font-bold text-[14px] md:text-[15px] text-[#17211D] transition-colors duration-300 mb-1.5 line-clamp-1"
                    style={{ color: isHovered ? cat.color : undefined }}
                  >
                    {lang === 'en' ? cat.nameEn : cat.nameBn}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom count badge */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 relative z-10 flex items-center justify-between">
                  <span className="cat-count-badge text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {cat.count}+ {lang === 'en' ? 'services' : 'সেবা'}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </Link>
            );
          })}

          {/* More card → all categories */}
          <Link
            to="/categories"
            className={`more-card relative bg-gradient-to-br from-[#E8F6F0] via-emerald-50 to-teal-50 rounded-2xl p-4 md:p-5 border-2 border-dashed border-[#006A4E]/35 hover:border-[#006A4E] cursor-pointer group flex flex-col items-center justify-center h-full min-h-[160px] overflow-hidden ${
              visible ? 'cat-card-in' : 'opacity-0'
            }`}
            style={{ animationDelay: visible ? `${HOME_VISIBLE * 0.05}s` : '0s' }}
          >
            {/* animated bg shimmer */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: 'linear-gradient(120deg, transparent 30%, rgba(0,106,78,0.08) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'shimmerBg 4s ease infinite',
              }}
            />

            <div className="more-icon-float more-icon-pulse relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="relative z-10 font-bold text-[15px] text-[#006A4E] group-hover:scale-105 transition-transform">
              {t('seeMore')}
            </h3>
            <p className="relative z-10 text-[11px] text-[#006A4E]/70 mt-1 font-medium">
              {remainingCount > 0
                ? `+${remainingCount} ${t('moreCategories')}`
                : t('allCategories')}
            </p>
            <div className="relative z-10 mt-3 flex items-center gap-1 text-[10px] font-bold text-[#006A4E]/50 group-hover:text-[#006A4E] transition-colors">
              <span>{t('seeAllCategories')}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};