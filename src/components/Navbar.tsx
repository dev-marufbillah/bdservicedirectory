import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { Search, ChevronDown, Globe, Menu, X, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsLangOpen(false);
  }, [location.pathname]);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setSearchFocused(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/services', label: t('services') },
    { path: '/categories', label: t('categories'), hasDropdown: true },
    { path: '/help', label: t('help') },
    { path: '/about', label: t('about') },
  ];

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: navSlideDown 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .lang-dropdown { animation: fadeInScale 0.25s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .mobile-menu { animation: mobileSlide 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -2px;
          height: 2.5px;
          width: 0;
          background: linear-gradient(90deg, #006A4E, #10b981);
          border-radius: 999px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateX(-50%);
        }
        .nav-link:hover::after,
        .nav-link-active::after { width: 70%; }
      `}</style>

      <header
        className={`nav-enter sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-900/5 border-b border-emerald-100/60 py-2'
            : 'bg-white border-b border-slate-100 shadow-sm py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] active:scale-95">
              <Logo />
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 text-[15px] font-bold text-[#17211D]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-3.5 py-2 rounded-xl transition-all duration-200 hover:bg-emerald-50/80 hover:text-[#006A4E] flex items-center gap-1 whitespace-nowrap ${
                    isActive(link.path) ? 'nav-link-active text-[#006A4E] bg-emerald-50/60' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive(link.path) ? 'text-[#006A4E]' : 'text-slate-400'}`} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions: Search & Language */}
            <div className="hidden lg:flex items-center gap-3">

              {/* Dynamic Search */}
              <form onSubmit={handleNavSearch} className="relative">
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder={t('searchPlaceholder')}
                  className={`pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none text-slate-800 placeholder-slate-400 transition-all duration-300 ${
                    searchFocused ? 'w-60 bg-white border-[#006A4E] shadow-md' : 'w-48 hover:border-emerald-200 hover:bg-white'
                  }`}
                />
                <Search className={`w-4 h-4 absolute left-3 top-2.5 transition-colors ${searchFocused ? 'text-[#006A4E]' : 'text-slate-400'}`} />
              </form>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all duration-300 ${
                    isLangOpen
                      ? 'border-[#006A4E] text-[#006A4E] bg-emerald-50 shadow-sm'
                      : 'border-slate-200 hover:border-[#006A4E] hover:text-[#006A4E] bg-slate-50 hover:bg-white'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#006A4E]" />
                  <span>{lang === 'bn' ? 'বাংলা' : 'English'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                    <div className="lang-dropdown absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs font-bold">
                      <button
                        onClick={() => { setLang('bn'); setIsLangOpen(false); }}
                        className={`w-full px-3.5 py-2 text-left flex items-center justify-between transition ${lang === 'bn' ? 'text-[#006A4E] bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <span>🇧🇩 বাংলা</span>
                        {lang === 'bn' && <Check className="w-3.5 h-3.5 text-[#006A4E]" />}
                      </button>
                      <button
                        onClick={() => { setLang('en'); setIsLangOpen(false); }}
                        className={`w-full px-3.5 py-2 text-left flex items-center justify-between transition ${lang === 'en' ? 'text-[#006A4E] bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <span>🇬🇧 English</span>
                        {lang === 'en' && <Check className="w-3.5 h-3.5 text-[#006A4E]" />}
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-50 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#006A4E]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu lg:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-100 px-4 py-4 space-y-1 mt-1 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#006A4E] bg-emerald-50 border-l-4 border-[#006A4E]'
                    : 'text-slate-800 hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center justify-between py-3 px-3 border-t border-slate-100 mt-2 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                ভাষা (Language)
              </span>
              <div className="flex gap-1 p-1 bg-slate-100 rounded-full">
                <button
                  onClick={() => setLang('bn')}
                  className={`px-3.5 py-1.5 rounded-full transition font-bold ${
                    lang === 'bn' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-600'
                  }`}
                >
                  🇧🇩 বাংলা
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3.5 py-1.5 rounded-full transition font-bold ${
                    lang === 'en' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-600'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};