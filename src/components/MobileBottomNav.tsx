import { Link } from 'react-router-dom';
import { Home, LayoutGrid, Search, User } from 'lucide-react';

export const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden flex justify-around items-center py-2 px-3 shadow-lg">
      <Link to="/" className="flex flex-col items-center gap-0.5 text-[#006A4E]">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">হোম</span>
      </Link>
      
      <Link to="/services" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#006A4E]">
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-medium">সেবাসমূহ</span>
      </Link>
      
      <Link to="/search?q=NID" className="flex flex-col items-center gap-0.5 text-slate-500">
        <div className="w-8 h-8 rounded-full bg-[#006A4E] text-white flex items-center justify-center -mt-4 shadow-md">
          <Search className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-medium mt-0.5">সার্চ</span>
      </Link>
      
      <Link to="/login" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#006A4E]">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">অ্যাকাউন্ট</span>
      </Link>
    </div>
  );
};