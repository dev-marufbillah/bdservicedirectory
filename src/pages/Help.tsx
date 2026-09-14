import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, ExternalLink, Search, PhoneCall } from 'lucide-react';

export const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'একসেবা বাংলাদেশ কী?',
      a: 'একসেবা বাংলাদেশ হলো বাংলাদেশ সরকারের বিভিন্ন বিভাগ ও মন্ত্রণালয়ের সেবা অনুসন্ধানের একটি স্বাধীন গেটওয়ে বা নির্দেশিকা (Directory Portal)। এটি সকল সরকারি সেবাকে এক জায়গায় সংগঠিত করে নাগরিকদের সরাসরি সঠিক ও ভেরিফায়েড অফিশিয়াল সরকারি ওয়েবসাইটে পৌঁছে দেয়।'
    },
    {
      q: 'একসেবা বাংলাদেশ কি নিজে কোনো সরকারি সেবা প্রদান করে?',
      a: 'না। একসেবা বাংলাদেশ কোনো সরকারি সেবা প্রদান বা আবেদন প্রক্রিয়া পরিচালনা করে না। আমরা নাগরিকদের শুধুমাত্র সঠিক সরকারি ওয়েবসাইটে পৌঁছে দেওয়ার মাধ্যম হিসেবে কাজ করি।'
    },
    {
      q: 'আমার ব্যক্তিগত তথ্য কি এই ওয়েবসাইটে সংরক্ষণ করা হয়?',
      a: 'একদম না! আমরা নাগরিকদের NID, পাসপোর্ট, জন্ম নিবন্ধন, কর বা কোনো সংবেদনশীল সরকারি তথ্য সংগ্রহ বা সংরক্ষণ করি না। আপনার সকল আবেদন সরাসরি সংশ্লিষ্ট সরকারি কর্তৃপক্ষের পোর্টালে সম্পন্ন হয়।'
    },
    {
      q: 'অফিসিয়াল সরকারি ওয়েবসাইট কীভাবে চিনব?',
      a: 'একসেবা বাংলাদেশে প্রতিটি সেবার নামের পাশে "✓ Official Government Website" বা "Verified Link" ব্যাজ দেখতে পাবেন। এছাড়া সরকারি ওয়েবসাইটগুলোর ডোমেইনের শেষে সবসময় .gov.bd থাকে।'
    },
    {
      q: 'কোনো অফিশিয়াল লিংক কাজ না করলে কী করব?',
      a: 'কোনো লিংক পরিবর্তিত হয়ে থাকলে বা কাজ না করলে আপনি সেবাটির বিস্তারিত পেজে গিয়ে বা ফুটারের "ব্রোকেন লিংক রিপোর্ট করুন" অপশন থেকে আমাদের দ্রুত জানাতে পারেন।'
    },
    {
      q: 'এই সেবা কি ব্যবহারকারীর জন্য সম্পূর্ণ বিনামূল্যে?',
      a: 'হ্যাঁ! একসেবা বাংলাদেশ একটি ১০০% ফ্রি নাগরিক সেবা নির্দেশিকা।'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        {/* Header Banner */}
        <div className="bg-[#004D3A] text-white py-12 px-4 border-b-4 border-[#F42A41]">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="bg-emerald-500/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              সহায়তা কেন্দ্র ও সাধারণ জিজ্ঞাসা
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">আপনাকে কীভাবে সাহায্য করতে পারি?</h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
              একসেবা বাংলাদেশ ব্যবহারের নির্দেশিকা এবং বহুল জিজ্ঞাসিত প্রশ্নগুলোর উত্তর নিচে দেওয়া হলো।
            </p>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-xl font-bold text-[#17211D] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#006A4E]" />
            <span>সাধারণ জিজ্ঞাসিত প্রশ্নাবলী (FAQ)</span>
          </h2>

          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#17211D] flex items-center justify-between gap-4 hover:text-[#006A4E] transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#006A4E] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}

          {/* Need more help */}
          <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center space-y-3">
            <PhoneCall className="w-8 h-8 text-[#006A4E] mx-auto" />
            <h3 className="font-bold text-base text-[#17211D]">আরও কোনো প্রশ্ন আছে?</h3>
            <p className="text-xs text-[#66736D]">
              আপনার প্রশ্ন বা মতামতের জন্য আমাদের কন্টাক্ট ফর্মে মেসেজ দিন।
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link to="/contact" className="bg-[#006A4E] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-[#005841]">
                যোগাযোগ করুন
              </Link>
              <Link to="/report-broken-link" className="bg-slate-100 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-full hover:bg-slate-200">
                লিংক রিপোর্ট করুন
              </Link>
            </div>
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};