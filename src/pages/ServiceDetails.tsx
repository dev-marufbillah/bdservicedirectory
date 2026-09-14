import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { CATEGORIES } from '../data/mockData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, ChevronRight, 
  ShieldCheck, AlertTriangle, Calendar, Building2, 
  FileText, Info, HelpCircle, CreditCard, Globe, FileCheck, MapPin, Car, Coins, Search,
  Clock, DollarSign, ListOrdered, PhoneCall, Copy, Check, X, Send
} from 'lucide-react';

export const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, addReport } = useServices();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'steps'>('overview');
  const [copied, setCopied] = useState(false);
  
  // Report Modal State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportIssue, setReportIssue] = useState('লিংক কাজ করছে না');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const service = services.find((s) => s.slug === slug);
  const category = CATEGORIES.find((c) => c.id === service?.category);

  const handleVisitOfficialSite = (url: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
    }, 600);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    addReport(service.nameBn, service.officialUrl, reportIssue, reportDetails || 'সার্ভিস পেজ থেকে ব্রোকেন লিংক রিপোর্ট');
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportOpen(false);
      setReportDetails('');
    }, 2000);
  };

  const renderServiceIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-[#006A4E]" };
    switch (iconName) {
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'Search': return <Search {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  if (!service) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#F7FAF9] font-bengali flex flex-col">
          <Navbar />
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-[#17211D] mb-2">সেবা পাওয়া যায়নি</h1>
            <p className="text-sm text-[#66736D] mb-6">আপনি যে সেবাটি খুঁজছেন তা আমাদের সিস্টেমে খুঁজে পাওয়া যায়নি।</p>
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

        {/* Header & Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            <div className="flex items-center flex-wrap gap-2 text-xs text-[#66736D] mb-4">
              <Link to="/" className="hover:text-[#006A4E] transition">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              {category && (
                <>
                  <Link to={`/categories/${category.slug}`} className="hover:text-[#006A4E] transition">
                    {category.nameBn}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
              <span className="text-[#006A4E] font-semibold">{service.nameBn}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Link
                  to={category ? `/categories/${category.slug}` : "/"}
                  className="mt-1 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="w-14 h-14 rounded-2xl bg-[#E8F6F0] flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                  {renderServiceIcon(service.iconName)}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D]">
                      {service.nameBn}
                    </h1>
                    {service.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-[#006A4E] text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Official Government Website
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-[#006A4E] mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{service.department}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  <span>{copied ? 'কপি হয়েছে' : 'শেয়ার'}</span>
                </button>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>যাচাই: <strong>{service.lastVerified}</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Main Details Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          <div className="bg-gradient-to-br from-[#006A4E] to-[#004D3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-white/20 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full inline-block">
                🛡️ অফিশিয়াল সরকারি ওয়েবসাইট
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                সরাসরি সরকারি পোর্টালে গিয়ে আবেদন সম্পন্ন করুন
              </h2>
              <p className="text-xs text-emerald-100/90 max-w-lg leading-relaxed">
                আপনাকে সরাসরি কর্তৃপক্ষের সুরক্ষিত ডোমেইনে রিডাইরেক্ট করা হবে। কোনো মধ্যস্থতাকারী ছাড়াই আবেদন করুন।
              </p>
            </div>

            <button
              onClick={() => handleVisitOfficialSite(service.officialUrl)}
              disabled={isRedirecting}
              className="w-full md:w-auto bg-white hover:bg-emerald-50 text-[#006A4E] font-extrabold px-8 py-4 rounded-2xl text-sm shadow-lg transition flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 disabled:opacity-80"
            >
              {isRedirecting ? (
                <span>পোর্টালে নেওয়া হচ্ছে...</span>
              ) : (
                <>
                  <span>সরকারি ওয়েবসাইটে যান</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">সরকারি ফি</span>
                <p className="text-xs font-bold text-slate-800">{service.feeInfo || 'ওয়েবসাইটে দেখুন'}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">সময়সীমা</span>
                <p className="text-xs font-bold text-slate-800">{service.processingTime || 'সাধারণত ৭-১৫ দিন'}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-[#006A4E]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">সরকারি হটলাইন</span>
                <p className="text-xs font-bold text-slate-800">{service.helpline || '১৬১২২'}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${activeTab === 'overview' ? 'bg-[#006A4E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Info className="w-4 h-4" />
              <span>বিবরণ</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${activeTab === 'documents' ? 'bg-[#006A4E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4" />
              <span>প্রয়োজনীয় কাগজপত্র ({service.requiredDocuments?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${activeTab === 'steps' ? 'bg-[#006A4E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>আবেদনের ধাপসমূহ ({service.steps?.length || 0})</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-8 space-y-6">
              {activeTab === 'overview' && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#17211D] border-b border-slate-100 pb-3">
                    এই সেবা সম্পর্কে বিবরণ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {service.description}
                  </p>

                  {service.importantNotes && service.importantNotes.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 space-y-2 mt-4">
                      <h4 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>গুরুত্বপূর্ণ নোটিশ</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-amber-900/90 list-disc pl-4">
                        {service.importantNotes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#17211D] border-b border-slate-100 pb-3">
                    আবেদনের জন্য প্রয়োজনীয় কাগজপত্র
                  </h3>

                  {service.requiredDocuments && service.requiredDocuments.length > 0 ? (
                    <ul className="space-y-3">
                      {service.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#006A4E] mt-0.5 flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">বিশেষ কোনো অতিরিক্ত কাগজপত্র উল্লেখ নেই। বিস্তারিত ওয়েবসাইটে দেখুন।</p>
                  )}
                </div>
              )}

              {activeTab === 'steps' && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#17211D] border-b border-slate-100 pb-3">
                    অনলাইনে আবেদনের সহজ ধাপসমূহ
                  </h3>

                  {service.steps && service.steps.length > 0 ? (
                    <div className="space-y-3">
                      {service.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="w-6 h-6 rounded-full bg-[#006A4E] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs font-medium text-slate-800 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">ধাপসমূহ দেখতে সরকারি অফিশিয়াল ওয়েবসাইটে প্রবেশ করুন।</p>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#006A4E] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>নিরাপত্তা নিশ্চিতকরণ</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  একসেবা বাংলাদেশ কোনো সংবেদনশীল সরকারি ডাটা জমা রাখে না। আপনার আবেদন সংশ্লিষ্ট মন্ত্রণালয়ের নিজস্ব ডোমেইনে সম্পূর্ণ হবে।
                </p>
              </div>

              {/* Interactive Report Button */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>লিংক কাজ করছে না?</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  যদি এই অফিশিয়াল লিংকটিতে সমস্যা থাকে, রিপোর্ট পাঠালে অ্যাডমিন টিম তা ভেরিফাই করবে।
                </p>
                <button 
                  onClick={() => setIsReportOpen(true)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs text-center transition"
                >
                  Report Broken Link
                </button>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
                <HelpCircle className="w-6 h-6 text-[#006A4E] mx-auto" />
                <h4 className="font-bold text-xs text-slate-800">সহায়তার প্রয়োজন?</h4>
                <p className="text-[11px] text-slate-500">সরকারি হটলাইন {service.helpline || '১৬১২২'} এ কল করুন</p>
              </div>
            </div>

          </div>

        </div>

        {/* BROKEN LINK REPORT MODAL */}
        {isReportOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl w-full max-w-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-[#17211D]">ব্রোকেন লিংক রিপোর্ট</h3>
                <button onClick={() => setIsReportOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reportSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-[#006A4E] mx-auto" />
                  <h4 className="font-bold text-base text-[#17211D]">রিপোর্ট জমা হয়েছে!</h4>
                  <p className="text-xs text-slate-500">অ্যাডমিন প্যানেলে রিপোর্টটি পাঠানো হয়েছে।</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সেবার নাম</label>
                    <input type="text" readOnly value={service.nameBn} className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-bold" />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সমস্যার ধরণ</label>
                    <select value={reportIssue} onChange={e => setReportIssue(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#006A4E]">
                      <option value="লিংক কাজ করছে না">লিংক কাজ করছে না (Site Down)</option>
                      <option value="ডোমেইন পরিবর্তন হয়েছে">ডোমেইন পরিবর্তন হয়েছে</option>
                      <option value="ভুল ওয়েবসাইট নির্দেশিত">ভুল ওয়েবসাইট নির্দেশিত</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
                    <textarea rows={3} value={reportDetails} onChange={e => setReportDetails(e.target.value)} placeholder="সমস্যার সংক্ষিপ্ত বিবরণ লিখুন..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#006A4E]" />
                  </div>

                  <button type="submit" className="w-full bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5">
                    <span>রিপোর্ট সাবমিট করুন</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};