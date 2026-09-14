import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { 
  Search, ChevronRight, ExternalLink, CheckCircle2, 
  CreditCard, Globe, FileCheck, MapPin, Car, Coins, Building2, ShieldCheck
} from 'lucide-react';
import type { Service } from '../types';

export const SearchResults = () => {
  const { services: ALL_SERVICES } = useServices();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Service[]>([]);

  // Smart Search Logic using Context Data
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = ALL_SERVICES.filter((service) => {
      return (
        service.nameBn.toLowerCase().includes(q) ||
        service.nameEn.toLowerCase().includes(q) ||
        service.department.toLowerCase().includes(q) ||
        service.aliases.some(alias => alias.toLowerCase().includes(q))
      );
    });
    setResults(filtered);
  }, [query, ALL_SERVICES]);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-2 text-xs text-[#66736D] mb-4">
              <Link to="/" className="hover:text-[#006A4E] transition">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#006A4E] font-semibold">অনুসন্ধান ফলাফল</span>
            </div>

            <h1 className="text-2xl font-bold text-[#17211D]">
              <span className="text-[#006A4E]">"{query}"</span> এর জন্য অনুসন্ধান ফলাফল
            </h1>
            <p className="text-sm text-[#66736D] mt-1">
              মোট {results.length} টি সেবা পাওয়া গেছে
            </p>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[40vh]">
          {results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-xl mx-auto shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-[#17211D] mb-2">কোনো ফলাফল পাওয়া যায়নি</h2>
              <p className="text-sm text-[#66736D] mb-6">
                দয়া করে অন্য কোনো শব্দ (কীওয়ার্ড) দিয়ে আবার চেষ্টা করুন। যেমন: NID, পাসপোর্ট, খতিয়ান।
              </p>
              <Link to="/" className="bg-[#006A4E] text-white font-bold px-6 py-2.5 rounded-full text-sm">
                হোমে ফিরে যান
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F6F0] flex items-center justify-center flex-shrink-0">
                      {renderServiceIcon(service.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link to={`/services/${service.slug}`} className="font-bold text-base text-[#17211D] group-hover:text-[#006A4E] transition truncate">
                          {service.nameBn}
                        </Link>
                        {service.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#006A4E] text-[10px] font-bold border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" /> Official
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 mb-2 truncate">
                        {service.department}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Link to={`/services/${service.slug}`} className="text-xs font-bold text-[#006A4E] bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
                          বিস্তারিত
                        </Link>
                        <a href={service.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold text-xs px-4 py-2 rounded-xl transition">
                          সরাসরি যান <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
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