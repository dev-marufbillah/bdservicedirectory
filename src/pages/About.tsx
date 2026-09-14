import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { ShieldCheck, Target, Lock, ExternalLink, Building2, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        {/* Header */}
        <div className="bg-gradient-to-r from-[#006A4E] to-[#004D3A] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="bg-white/10 text-emerald-200 text-xs font-bold px-3.5 py-1 rounded-full border border-white/20">
              আমাদের লক্ষ্য ও সততা
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">একসেবা বাংলাদেশ সম্পর্কে</h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              একসেবা বাংলাদেশ একটি স্বাধীন সেবা গেটওয়ে যা বাংলাদেশী নাগরিকদের সহজেই সঠিক ও ভেরিফায়েড সরকারি ওয়েবসাইট খুঁজে পেতে সাহায্য করে।
            </p>
          </div>
        </div>

        {/* Core Statement Box */}
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#006A4E] flex items-center gap-2">
              <Target className="w-6 h-6" />
              <span>আমাদের মূল উদ্দেশ্যে</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ইন্টারনেটে হাজার হাজার ভুয়া ওয়েবসাইট ও দালালদের বিভ্রান্তির কারণে অনেক সময় সাধারণ নাগরিকরা সঠিক সরকারি সাইট খুঁজে পান না। <strong>একসেবা বাংলাদেশ</strong> প্ল্যাটফর্মের একমাত্র কাজ হলো নাগরিকদের ঝামেলামুক্তভাবে ১ ক্লিক-এ বিশ্বস্ত সরকারি কর্তৃপক্ষের Official Website-এ পৌঁছে দেওয়া।
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006A4E] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#17211D]">১০০% ভেরিফায়েড লিংক</h3>
              <p className="text-xs text-slate-600">শুধুমাত্র সরকারি ডোমেইন (.gov.bd) যাচাই করে যুক্ত করা হয়।</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#17211D]">সম্পূর্ণ নিরাপদ</h3>
              <p className="text-xs text-slate-600">আমরা নাগরিকদের NID বা কোনো সংবেদনশীল তথ্য জমা নিই না।</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#17211D]">সরাসরি রিডাইরেক্ট</h3>
              <p className="text-xs text-slate-600">১ ক্লিকে সরাসরি সরকারি আবেদন পোর্টালে প্রবেশ করুন।</p>
            </div>
          </div>

          {/* Legal Notice Box */}
          <div className="bg-emerald-50/80 border-2 border-[#006A4E]/30 rounded-3xl p-6 sm:p-8 space-y-3">
            <h3 className="font-bold text-base text-[#006A4E] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>আইনি ও স্পষ্ট ঘোষণা (Legal Disclaimer)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              একসেবা বাংলাদেশ একটি স্বাধীন সেবা নির্দেশিকা ও Gateway। আমরা কোনো সরকারি সেবা প্রদান বা সরকারি আবেদন প্রক্রিয়া পরিচালনা করি না। ব্যবহারকারীকে সংশ্লিষ্ট সরকারি প্রতিষ্ঠানের Official Website-এ পৌঁছে দেওয়া হয়।
            </p>
          </div>

        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};