import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import {
  Users, Home, Car, Coins, GraduationCap,
  HeartPulse, Briefcase, Building2, Scale,
  Landmark, LayoutGrid, ChevronRight, Layers,
  Leaf, Zap, Plane, ShieldCheck, Heart
} from 'lucide-react';

export const AllCategories = () => {
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
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 text-xs text-[#66736D] mb-3">
              <Link to="/" className="hover:text-[#006A4E] transition">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#006A4E] font-semibold">সকল বিভাগ</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-xl bg-[#E8F6F0] text-[#006A4E]">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D]">
                  সেবার সকল বিভাগ
                </h1>
                <p className="text-xs sm:text-sm text-[#66736D] mt-1">
                  মোট {CATEGORIES.length} টি বিভাগ — আপনার প্রয়োজনীয় সেবা বিভাগ নির্বাচন করুন
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#006A4E]/30 transition-all duration-300 cursor-pointer group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` }}
                  >
                    {renderIcon(cat.iconName)}
                  </div>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#006A4E] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[14px] md:text-[15px] text-[#17211D] group-hover:text-[#006A4E] transition-colors mb-1.5">
                    {cat.nameBn}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};