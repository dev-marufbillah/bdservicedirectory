import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { Search, ChevronDown, Globe, User, Menu, X, ShieldCheck, Check, Sparkles, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsLangOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
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
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 106, 78, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(0, 106, 78, 0); }
        }
        .nav-enter { animation: navSlideDown 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .lang-dropdown { animation: fadeInScale 0.25s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .mobile-menu { animation: mobileSlide 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .btn-shimmer {
          background: linear-gradient(90deg, #006A4E, #00a87a, #006A4E);
          background-size: 200% auto;
          animation: shimmer 3.5s linear infinite;
        }
        .profile-pulse {
          animation: softPulse 2.5s ease-in-out infinite;
        }
        .nav-link {
          position: relative;
        }
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
        .nav-link-active::after {
          width: 70%;
        }
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

            {/* Logo (compact) */}
            <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] active:scale-95">
              <Logo />
            </Link>

            {/* Center Nav — spacing tightened */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-bold text-[#17211D]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-3 py-2 rounded-xl transition-all duration-200 hover:bg-emerald-50/80 hover:text-[#006A4E] flex items-center gap-1 whitespace-nowrap ${
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

            {/* Right Actions — compact */}
            <div className="hidden lg:flex items-center gap-2">

              {/* Search — icon + fixed width */}
              <form onSubmit={handleNavSearch} className="relative">
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-40 xl:w-52 pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#006A4E] focus:bg-white focus:w-56 xl:focus:w-64 text-slate-800 placeholder-slate-400 transition-all duration-300 hover:border-emerald-200"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#006A4E]" />
              </form>

              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center gap-1 text-xs font-bold px-2.5 py-2 rounded-full border transition-all duration-300 ${
                    isLangOpen
                      ? 'border-[#006A4E] text-[#006A4E] bg-emerald-50 shadow-sm'
                      : 'border-slate-200 hover:border-[#006A4E] hover:text-[#006A4E] bg-slate-50 hover:bg-white'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#006A4E]" />
                  <span className="hidden xl:inline">{lang === 'bn' ? t('bangla') : t('english')}</span>
                  <span className="xl:hidden">{lang === 'bn' ? 'BN' : 'EN'}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                    <div className="lang-dropdown absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/80 py-1.5 z-50 text-xs font-bold overflow-hidden">
                      <button
                        onClick={() => { setLang('bn'); setIsLangOpen(false); }}
                        className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between transition-all ${
                          lang === 'bn' ? 'text-[#006A4E] bg-gradient-to-r from-emerald-50 to-teal-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2"><span className="text-base">🇧🇩</span>{t('bangla')}</span>
                        {lang === 'bn' && (
                          <span className="w-5 h-5 rounded-full bg-[#006A4E] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => { setLang('en'); setIsLangOpen(false); }}
                        className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between transition-all ${
                          lang === 'en' ? 'text-[#006A4E] bg-gradient-to-r from-emerald-50 to-teal-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2"><span className="text-base">🇬🇧</span>{t('english')}</span>
                        {lang === 'en' && (
                          <span className="w-5 h-5 rounded-full bg-[#006A4E] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Auth — profile as icon-only dropdown when logged in */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`profile-pulse flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-[#006A4E] border border-emerald-200 hover:border-emerald-300 hover:shadow-md text-xs font-bold pl-1 pr-2.5 py-1 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isProfileOpen ? 'ring-2 ring-emerald-300' : ''
                    }`}
                    title={user.name}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <div className="lang-dropdown absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-emerald-900/10 border border-emerald-100/80 py-2 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center font-bold text-sm shadow-md">
                              {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm text-slate-800 truncate">{user.name}</p>
                              <p className="text-[10px] text-slate-500 truncate">{user.identifier}</p>
                            </div>
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#006A4E] transition flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          {t('myProfile')}
                        </Link>

                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#006A4E] transition flex items-center gap-2"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            {t('adminDashboard')}
                          </Link>
                        )}

                        <div className="border-t border-slate-100 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-shimmer flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/25 hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('loginRegister')}</span>
                </Link>
              )}
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              {user && (
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center font-bold text-xs shadow-sm"
                >
                  {user.name.charAt(0)}
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  mobileMenuOpen ? 'bg-emerald-50 text-[#006A4E] rotate-90' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                {t('language')}
              </span>
              <div className="flex gap-1 p-1 bg-slate-100 rounded-full">
                <button
                  onClick={() => setLang('bn')}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 font-bold ${
                    lang === 'bn' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  🇧🇩 {t('bangla')}
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 font-bold ${
                    lang === 'en' ? 'bg-[#006A4E] text-white shadow-md' : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  🇬🇧 {t('english')}
                </button>
              </div>
            </div>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-3 px-3 rounded-xl text-sm font-bold text-[#006A4E] bg-emerald-50 border border-emerald-100"
              >
                <ShieldCheck className="w-4 h-4" />
                {t('adminDashboard')}
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 text-sm font-bold py-3 rounded-2xl mt-3 hover:bg-rose-100 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-shimmer flex items-center justify-center gap-2 text-white text-sm font-bold py-3 rounded-2xl mt-3 shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                {t('loginRegister')}
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};