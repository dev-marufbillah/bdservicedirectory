import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

export const LoginPromptModal: React.FC = () => {
  const { showLoginPrompt, setShowLoginPrompt } = useAuth();
  const navigate = useNavigate();

  if (!showLoginPrompt) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm font-bengali">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
        >
          <div className="bg-gradient-to-r from-[#006A4E] to-[#004D3A] p-6 text-center text-white relative">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#006A4E]" />
            </div>
            <h3 className="text-xl font-bold">নিবন্ধন প্রয়োজন!</h3>
          </div>

          <div className="p-6 text-center space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              আপনি বেশ কয়েকবার <strong>বাংলাদেশ সার্ভিস ডিরেক্টরি</strong> ব্যবহার করেছেন।
              আপনার সকল সেবার তথ্য সংরক্ষণ এবং নিরাপদ ব্রাউজিং নিশ্চিত করতে অনুগ্রহ করে একটি{' '}
              <strong>ফ্রি অ্যাকাউন্ট</strong> তৈরি করুন অথবা লগইন করুন।
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  navigate('/login');
                }}
                className="w-full bg-[#006A4E] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#004D3A] transition flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>লগইন / নিবন্ধন করুন</span>
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition text-sm"
              >
                পরে করব
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};