import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/mockData';
import { 
  Compass, X, ArrowRight, CheckCircle2, ExternalLink, 
  CreditCard, Globe, FileCheck, MapPin, Car, Coins, ShieldCheck,
  GraduationCap, Building2, FileText
} from 'lucide-react';
import type { Service } from '../types';

interface ServiceFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceFinderModal: React.FC<ServiceFinderModalProps> = ({ isOpen, onClose }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // 100% Pure Bengali Goals List (No Hindi Typos)
  const goals = [
    { id: 'nid', title: 'NID কার্ড তৈরি বা তথ্য সংশোধন করা', slug: 'nid', icon: CreditCard, color: 'bg-blue-50 text-blue-600' },
    { id: 'passport', title: 'ই-পাসপোর্ট আবেদন বা স্ট্যাটাস দেখা', slug: 'passport', icon: Globe, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'birth', title: 'জন্ম বা মৃত্যু নিবন্ধন সনদ আবেদন', slug: 'birth-registration', icon: FileCheck, color: 'bg-[#E8F6F0] text-[#006A4E]' },
    { id: 'land', title: 'জমির খতিয়ান, পর্চা বা নামজারি করা', slug: 'e-khatian', icon: MapPin, color: 'bg-green-50 text-green-600' },
    { id: 'driving', title: 'ড্রাইভিং লাইসেন্স বা বিআরটিএ (BRTA) সেবা', slug: 'brta-bsp', icon: Car, color: 'bg-purple-50 text-purple-600' },
    { id: 'tax', title: 'আয়কর জমা, রিটার্ন দাখিল বা e-TIN খোলা', slug: 'e-return', icon: Coins, color: 'bg-amber-50 text-amber-600' },
    { id: 'police', title: 'অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট', slug: 'police-clearance', icon: ShieldCheck, color: 'bg-rose-50 text-rose-600' },
    { id: 'education', title: 'এসএসসি/এইচএসসি পরীক্ষার রেজাল্ট জানা', slug: 'education-result', icon: GraduationCap, color: 'bg-sky-50 text-sky-600' },
    { id: 'prottoyon', title: 'চারিত্রিক, ওয়ারিশ বা নাগরিক সনদ নেওয়া', slug: 'prottoyon', icon: FileText, color: 'bg-cyan-50 text-cyan-600' },
    { id: 'trade', title: 'ই-ট্রেড লাইসেন্স বা ব্যবসা নবায়ন করা', slug: 'trade-license', icon: Building2, color: 'bg-teal-50 text-teal-600' },
  ];

  const recommendedService: Service | undefined = SERVICES.find(s => s.slug === selectedGoal);

  const handleReset = () => {
    setSelectedGoal(null);
  };

  const handleClose = () => {
    setSelectedGoal(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 font-bengali relative"
        >
          {/* Top Header Bar */}
          <div className="bg-gradient-to-r from-[#006A4E] to-[#004D3A] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Compass className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-base">স্মার্ট সেবা নির্দেশক</h3>
                <p className="text-[11px] text-emerald-100/90">সহজে সঠিক সরকারি ওয়েবসাইট খুঁজে নিন</p>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {!selectedGoal ? (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#17211D] text-center">
                  আপনি কী কাজ করতে চাচ্ছেন? নির্বাচন করুন:
                </h4>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {goals.map((g) => {
                    const IconComp = g.icon;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGoal(g.slug)}
                        className="w-full bg-slate-50 hover:bg-[#E8F6F0] border border-slate-200 hover:border-[#006A4E]/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl ${g.color} flex items-center justify-center flex-shrink-0 font-bold`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#006A4E] transition">
                            {g.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#006A4E] group-hover:translate-x-1 transition" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Recommendation Display Card */
              <div className="space-y-5 py-2">
                <div className="text-center space-y-1">
                  <span className="bg-emerald-100 text-[#006A4E] text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                    🎯 আপনার জন্য সঠিক সরকারি ওয়েবসাইট
                  </span>
                </div>

                {recommendedService && (
                  <div className="bg-[#F7FAF9] rounded-2xl p-5 border border-emerald-200/80 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-[#006A4E] block mb-1">
                          {recommendedService.department}
                        </span>
                        <h4 className="text-lg font-bold text-[#17211D]">
                          {recommendedService.nameBn}
                        </h4>
                      </div>

                      {recommendedService.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006A4E] text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#66736D] leading-relaxed">
                      {recommendedService.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        to={`/services/${recommendedService.slug}`}
                        onClick={handleClose}
                        className="w-1/2 bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-3 rounded-xl border border-slate-200 text-center text-xs transition"
                      >
                        বিস্তারিত পড়ুন
                      </Link>

                      <a
                        href={recommendedService.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/2 bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold py-2.5 px-3 rounded-xl text-center text-xs shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <span>সরাসরি পোর্টালে যান</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-[#006A4E] hover:underline"
                  >
                    ← অন্য কোনো সেবা খুঁজতে চাই
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};