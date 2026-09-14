import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { CATEGORIES } from '../data/mockData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import {
  ArrowLeft, ExternalLink, CheckCircle2, ChevronRight,
  Users, Home, Car, Coins, GraduationCap, HeartPulse,
  Briefcase, Heart, Building2, Scale, Landmark, LayoutGrid,
  CreditCard, Globe, FileCheck, MapPin, ShieldCheck, Search
} from 'lucide-react';

export const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services: ALL_SERVICES } = useServices();

  const category = CATEGORIES.find((c) => c.slug === slug);
  const services = ALL_SERVICES.filter((s) => s.category === category?.id);

  const renderCatIcon = (iconName: string, color: string) => {
    const props = { className: 'w-7 h-7', style: { color } };
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
      default: return <LayoutGrid {...props} />;
    }
  };

  const renderServiceIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#006A4E]' };
    switch (iconName) {
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Search': return <Search {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  if (!category) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#F7FAF9] font-bengali flex flex-col">
          <Navbar />
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-[#17211D] mb-2">বিভাগ পাওয়া যায়নি</h1>
            <p className="text-sm text-[#66736D] mb-6">আপনি যে বিভাগটি খুঁজছেন তা নেই।</p>
            <Link to="/" className="bg-[#006A4E] text-white font-bold px-6 py-2.5 rounded-full text-sm">
              হোমে ফিরে যান
            </Link>
          </div>
          <Footer />
          <MobileBottomNav />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#66736D] mb-4">
              <Link to="/" className="hover:text-[#006A4E] transition">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <a href="/#categories" className="hover:text-[#006A4E] transition">বিভাগসমূহ</a>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#006A4E] font-semibold">{category.nameBn}</span>
            </div>

            <div className="flex items-start gap-4">
              <Link
                to="/"
                className="mt-1 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                aria-label="পেছনে যান"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: category.bgColor }}
              >
                {renderCatIcon(category.iconName, category.color)}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#17211D]">
                  {category.nameBn}
                </h1>
                <p className="text-sm text-[#66736D] mt-1 max-w-xl">
                  {category.description}
                </p>
                <p className="text-xs font-bold text-[#006A4E] mt-2">
                  {services.length} টি সেবা পাওয়া গেছে
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {services.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <p className="text-sm text-[#66736D]">এই বিভাগে এখনো কোনো সেবা যুক্ত করা হয়নি।</p>
              <p className="text-xs text-slate-400 mt-2">শীঘ্রই আরও সেবা যোগ করা হবে।</p>
              <Link to="/" className="inline-block mt-4 text-sm font-bold text-[#006A4E] hover:underline">
                হোমে ফিরে যান →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-md hover:border-[#006A4E]/30 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F6F0] flex items-center justify-center flex-shrink-0">
                      {renderServiceIcon(service.iconName)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="font-bold text-base text-[#17211D] group-hover:text-[#006A4E] transition">
                          {service.nameBn}
                        </h2>
                        {service.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#006A4E] text-[10px] font-bold border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" />
                            Official
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 mb-1">
                        {service.department}
                      </p>
                      <p className="text-xs text-[#66736D] line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-xs font-bold text-[#006A4E] hover:underline px-3 py-2"
                      >
                        বিস্তারিত
                      </Link>
                      <a
                        href={service.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
                      >
                        <span>সরাসরি যান</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
            <strong>নোট:</strong> একসেবা বাংলাদেশ শুধুমাত্র সঠিক সরকারি ওয়েবসাইটে পৌঁছে দেয়।
            আবেদন/তথ্য সংশ্লিষ্ট সরকারি ওয়েবসাইটে পরিচালিত হয়। আমরা কোনো সংবেদনশীল ডাটা সংরক্ষণ করি না।
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};