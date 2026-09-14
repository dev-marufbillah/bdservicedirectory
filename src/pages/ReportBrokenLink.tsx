import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';

export const ReportBrokenLink = () => {
  const { addReport, services } = useServices();
  const [submitted, setSubmitted] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [issueType, setIssueType] = useState('লিংকটি লোড হচ্ছে না (Broken Link)');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName) return;

    const matchedService = services.find(s => s.nameBn.includes(serviceName) || s.nameEn.toLowerCase().includes(serviceName.toLowerCase()));
    const officialUrl = matchedService ? matchedService.officialUrl : 'N/A';

    addReport(serviceName, officialUrl, issueType, details || 'নাগরিক কর্তৃক লিংক রিপোর্টিং');
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[#17211D]">ব্রোকেন লিংক রিপোর্ট করুন</h1>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                কোনো সরকারি অফিসিয়াল লিংক কাজ না করলে বা পরিবর্তন হয়ে থাকলে আমাদের জানান। অ্যাডমিন প্যানেল থেকে দ্রুত ভেরিফাই করে তা সংশোধন করা হবে।
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3 border-t border-slate-100 pt-6">
                <CheckCircle2 className="w-12 h-12 text-[#006A4E] mx-auto" />
                <h3 className="font-bold text-lg text-[#17211D]">রিপোর্ট জমা হয়েছে!</h3>
                <p className="text-xs text-slate-600">
                  আপনার রিপোর্টটি অ্যাডমিন প্যানেলে পাঠানো হয়েছে। আমাদের টিম লিংকটি ভেরিফাই করবে।
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setServiceName('');
                    setDetails('');
                  }}
                  className="mt-3 bg-[#006A4E] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md"
                >
                  আরেকটি রিপোর্ট করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সেবার নাম *</label>
                  <input 
                    type="text" 
                    required 
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="যেমন: NID বা ই-পাসপোর্ট"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সমস্যার ধরণ *</label>
                  <select 
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    required 
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                  >
                    <option value="লিংকটি লোড হচ্ছে না (Broken Link)">লিংকটি লোড হচ্ছে না (Broken Link)</option>
                    <option value="সরকারি ডোমেইন পরিবর্তন হয়েছে">সরকারি ডোমেইন পরিবর্তন হয়েছে</option>
                    <option value="ভুল ওয়েবসাইট লিংক">ভুল ওয়েবসাইট লিংক</option>
                    <option value="অন্যান্য সমস্যা">অন্যান্য সমস্যা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অতিরিক্ত বিবরণ (ঐচ্ছিক)</label>
                  <textarea 
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="সমস্যাটি সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md"
                >
                  <span>অ্যাডমিনকে রিপোর্ট পাঠান</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};