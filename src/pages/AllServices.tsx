import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { CATEGORIES } from '../data/mockData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { 
  Search, Filter, ArrowUpDown, ChevronRight, ExternalLink, CheckCircle2,
  CreditCard, Globe, FileCheck, MapPin, Car, Coins, Building2, ShieldCheck, Grid
} from 'lucide-react';
import type { Service } from '../types';

export const AllServices = () => {
  const { services } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'recent'>('popular');

  // Filter & Sort Logic using live Context services
  const filteredServices = useMemo(() => {
    let list: Service[] = [...services];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.category === selectedCategory);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.nameBn.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.aliases.some((alias) => alias.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'popular') {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.nameBn.localeCompare(b.nameBn, 'bn'));
    } else if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.lastVerified).getTime() - new Date(a.lastVerified).getTime());
    }

    return list;
  }, [services, selectedCategory, searchQuery, sortBy]);

  const renderServiceIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#006A4E]" };
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
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 text-xs text-[#66736D] mb-3">
              <Link to="/" className="hover:text-[#006A4E] transition">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#006A4E] font-semibold">সকল সরকারি সেবা</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D] flex items-center gap-2">
                  <Grid className="w-7 h-7 text-[#006A4E]" />
                  <span>সকল সরকারি সেবা</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#66736D] mt-1">
                  বাংলাদেশ সরকারের বিভিন্ন দপ্তর ও মন্ত্রণালয়ের অফিশিয়াল পোর্টালে সরাসরি যান।
                </p>
              </div>

              {/* Search input in page */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="সেবার নাম বা দপ্তর দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#006A4E] focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none text-xs font-semibold">
              <span className="text-[#006A4E] font-bold flex items-center gap-1 mr-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" /> ফিল্টার:
              </span>
              
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full transition flex-shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#006A4E] text-white font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                সব সেবা ({services.length})
              </button>

              {CATEGORIES.map((cat) => {
                const count = services.filter((s) => s.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full transition flex-shrink-0 flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-[#006A4E] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.nameBn}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 flex-shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">ক্রম:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#006A4E]"
              >
                <option value="popular">জনপ্রিয় সেবা আগে</option>
                <option value="name">নাম অনুযায়ী (অ-ক্ষর)</option>
                <option value="recent">সর্বশেষ ভেরিফায়েড</option>
              </select>
            </div>

          </div>

          {/* Services Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-[#17211D]">কোনো সেবা পাওয়া যায়নি</h3>
              <p className="text-xs text-[#66736D] mt-1 mb-4">
                আপনার দেওয়া ফিল্টার বা অনুসন্ধানের সাথে মানানসই কোনো সেবা পাওয়া যায়নি।
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-[#006A4E] text-white text-xs font-bold px-5 py-2 rounded-full"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#006A4E]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-[#E8F6F0] flex items-center justify-center group-hover:scale-105 transition duration-200">
                        {renderServiceIcon(service.iconName)}
                      </div>
                      {service.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006A4E] text-[10px] font-bold border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3" /> Official
                        </span>
                      )}
                    </div>

                    <Link to={`/services/${service.slug}`}>
                      <h3 className="font-bold text-base text-[#17211D] group-hover:text-[#006A4E] transition mb-1">
                        {service.nameBn}
                      </h3>
                    </Link>

                    <p className="text-xs font-semibold text-[#006A4E] mb-2">
                      {service.department}
                    </p>

                    <p className="text-xs text-[#66736D] line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      to={`/services/${service.slug}`}
                      className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl transition text-center text-xs"
                    >
                      বিস্তারিত
                    </Link>
                    <a
                      href={service.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 text-xs shadow-sm"
                    >
                      <span>সরাসরি যান</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};