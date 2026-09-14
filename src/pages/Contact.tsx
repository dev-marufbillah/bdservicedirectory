import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        {/* Header */}
        <div className="bg-white border-b border-slate-200 py-8 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211D]">যোগাযোগ করুন</h1>
            <p className="text-xs sm:text-sm text-[#66736D]">
              আপনার যেকোনো প্রশ্ন, পরামর্শ বা মতামতের জন্য বার্তা পাঠান।
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Info Box (Left 5 Cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-[#004D3A] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
                <h3 className="font-bold text-lg text-emerald-300">যোগাযোগ মাধ্যম</h3>
                
                <div className="space-y-4 text-xs text-emerald-100">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">হটলাইন</p>
                      <p className="mt-0.5">১৬১২২ (সকাল ৯টা - সন্ধ্যা ৬টা)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-emerald-800">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">ইমেইল</p>
                      <p className="mt-0.5">info@eksheba.gov.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-emerald-800">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">ঠিকানা</p>
                      <p className="mt-0.5">ঢাকা, বাংলাদেশ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Box (Right 7 Cols) */}
            <div className="md:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <CheckCircle2 className="w-14 h-14 text-[#006A4E] mx-auto" />
                    <h3 className="text-xl font-bold text-[#17211D]">ধন্যবাদ!</h3>
                    <p className="text-xs text-slate-600">
                      আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 bg-[#006A4E] text-white text-xs font-bold px-6 py-2.5 rounded-full"
                    >
                      আরেকটি বার্তা পাঠান
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল এড্রেস *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় *</label>
                      <select required className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]">
                        <option value="general">সাধারণ জিজ্ঞাসা</option>
                        <option value="suggest">নতুন সেবা যুক্ত করার পরামর্শ</option>
                        <option value="wrong-info">ভুল তথ্য সংশোধন</option>
                        <option value="other">অন্যান্য</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">বার্তা *</label>
                      <textarea 
                        rows={4} 
                        required 
                        placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md"
                    >
                      <span>বার্তা পাঠান</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};