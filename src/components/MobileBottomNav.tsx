import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Search, Layers, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 md:hidden flex justify-around items-center py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] font-bengali">
      
      <Link 
        to="/" 
        className={`flex flex-col items-center gap-0.5 transition ${isActive('/') ? 'text-[#006A4E] font-bold' : 'text-slate-500'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">{t('home')}</span>
      </Link>
      
      <Link 
        to="/services" 
        className={`flex flex-col items-center gap-0.5 transition ${isActive('/services') ? 'text-[#006A4E] font-bold' : 'text-slate-500'}`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px]">{t('services')}</span>
      </Link>
      
      {/* Center Search Floating Button */}
      <Link to="/services" className="flex flex-col items-center gap-0.5 text-slate-500">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006A4E] to-[#00a87a] text-white flex items-center justify-center -mt-5 shadow-lg border-2 border-white active:scale-95 transition">
          <Search className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-semibold text-slate-600">খুঁজুন</span>
      </Link>

      <Link 
        to="/categories" 
        className={`flex flex-col items-center gap-0.5 transition ${isActive('/categories') ? 'text-[#006A4E] font-bold' : 'text-slate-500'}`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px]">{t('categories')}</span>
      </Link>

      <Link 
        to="/help" 
        className={`flex flex-col items-center gap-0.5 transition ${isActive('/help') ? 'text-[#006A4E] font-bold' : 'text-slate-500'}`}
      >
        <HelpCircle className="w-5 h-5" />
        <span className="text-[10px]">{t('help')}</span>
      </Link>

    </div>
  );
};