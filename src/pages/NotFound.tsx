import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F7FAF9] font-bengali flex flex-col pb-16 md:pb-0">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-7xl font-black text-[#006A4E]/20 mb-4">৪০৪</div>
        <h1 className="text-2xl font-extrabold text-[#17211D] mb-2">
          ওহ! এই পেজটি পাওয়া যায়নি।
        </h1>
        <p className="text-sm text-[#66736D] mb-8 max-w-md">
          আপনি যে পেজটি খুঁজছেন তা নেই, সরানো হয়েছে, অথবা লিংকটি ভুল হতে পারে।
        </p>
        <Link
          to="/"
          className="bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold px-8 py-3 rounded-full text-sm shadow-md transition mb-6"
        >
          হোমে ফিরে যান
        </Link>
        <div className="w-full max-w-md bg-white p-2 rounded-full shadow border border-slate-200 flex items-center">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            type="text"
            placeholder="আপনি কোন সরকারি সেবা খুঁজছেন?"
            className="flex-1 px-3 py-2 text-sm focus:outline-none bg-transparent"
          />
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};