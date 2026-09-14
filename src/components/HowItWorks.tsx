import React from 'react';
import { Search, FileText, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: Search,
      iconBg: 'bg-[#006A4E]',
      title: 'সেবা খুঁজুন',
      description: 'সার্চ করুন অথবা বিভাগ থেকে আপনার প্রয়োজনীয় সেবা নির্বাচন করুন',
    },
    {
      number: '2',
      icon: FileText,
      iconBg: 'bg-[#2563EB]',
      title: 'বিস্তারিত দেখুন',
      description: 'সেবার বিবরণ, প্রয়োজনীয় কাগজপত্র ও নির্দেশনা দেখুন',
    },
    {
      number: '3',
      icon: ExternalLink,
      iconBg: 'bg-[#9333EA]',
      title: 'সরকারি ওয়েবসাইটে যান',
      description: '"সরাসরি যান" বাটনে ক্লিক করে সংশ্লিষ্ট সরকারি ওয়েবসাইটে প্রবেশ করুন',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#006A4E] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>সহজ ও দ্রুত নির্দেশনা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17211D]">
            কীভাবে কাজ করে?
          </h2>
          <p className="text-xs sm:text-sm text-[#66736D] mt-2">
            মাত্র ৩টি সহজ ধাপে আপনার কাঙ্ক্ষিত সেবায় পৌঁছে যান
          </p>
        </div>

        {/* 3 Steps Flow & Illustration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Steps (Left 8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="relative group">
                  
                  {/* Desktop Connecting Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="bg-[#F7FAF9] rounded-2xl p-6 border border-slate-200/70 hover:border-[#006A4E]/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full relative overflow-hidden">
                    
                    {/* Number Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#006A4E] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md">
                      {step.number}
                    </div>

                    {/* Icon Circle */}
                    <div className={`w-14 h-14 rounded-2xl ${step.iconBg} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-bold text-base text-[#17211D] mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#66736D] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Banner Card (Desktop standard design element) */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-[#006A4E] to-[#004D3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-4">
                <span className="bg-white/20 text-emerald-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  সহজ, নিরাপদ ও বিশ্বস্ত!
                </span>

                <h3 className="text-xl sm:text-2xl font-black leading-snug">
                  কাজ হবে <br />
                  <span className="text-emerald-300">আরও সহজ!</span>
                </h3>

                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  কোনো প্রকার মধ্যস্থতাকারী ছাড়াই সরাসরি অফিশিয়াল সরকারি পোর্টালে গিয়ে নিজের কাজ নিজেই সম্পন্ন করুন।
                </p>

                <div className="pt-2">
                  <a 
                    href="#categories" 
                    className="inline-flex items-center gap-2 bg-white text-[#006A4E] hover:bg-emerald-50 font-bold px-5 py-2.5 rounded-full text-xs shadow-md transition"
                  >
                    <span>সেবা খোঁজা শুরু করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};