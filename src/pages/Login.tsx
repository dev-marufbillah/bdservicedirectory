import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, isBDPhone, isValidEmail } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { Phone, Lock, Eye, EyeOff, LogIn, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const { login, register, pendingOTP, verifyOTP, cancelOTP, user } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (isRegister) {
      if (!name.trim()) {
        setErrorMsg('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
        return;
      }
      const res = register(name, identifier, password);
      if (!res.success) setErrorMsg(res.message);
      else setInfoMsg(res.message);
    } else {
      const res = login(identifier, password);
      if (res.success) {
        // লগইনের পর role অনুযায়ী রিডাইরেক্ট — user state একটু পরে আপডেট হয়
        const id = identifier.trim().toLowerCase();
        const isOwner =
          id === '01302393194' || id === 'marufsalauddinoffical@gmail.com';
        navigate(isOwner ? '/admin' : '/');
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (verifyOTP(otpCode)) {
      alert('অ্যাকাউন্ট ভেরিফিকেশন সফল! স্বাগতম।');
      navigate('/');
    } else {
      setErrorMsg('ভুল ওটিপি কোড! আবার চেষ্টা করুন।');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        <div className="max-w-md mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-b from-[#004D3A] to-[#006A4E] text-white p-8 text-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/20 mb-3 relative z-10">
                <span className="text-3xl">🏛️</span>
              </div>
              <h2 className="text-2xl font-black relative z-10">
                {isRegister ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'স্বাগতম!'}
              </h2>
              <p className="text-xs text-emerald-100 mt-1 relative z-10">
                মোবাইল নম্বর বা ইমেইল দিয়ে {isRegister ? 'নিবন্ধন' : 'লগইন'} করুন
              </p>

              {!pendingOTP && (
                <div className="flex bg-black/20 p-1 rounded-full mt-6 max-w-xs mx-auto text-xs font-bold relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className={`flex-1 py-2 rounded-full transition ${!isRegister ? 'bg-white text-[#006A4E] shadow-sm' : 'text-white'}`}
                  >
                    লগইন
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className={`flex-1 py-2 rounded-full transition ${isRegister ? 'bg-white text-[#006A4E] shadow-sm' : 'text-white'}`}
                  >
                    রেজিস্ট্রেশন
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {errorMsg && (
                <div className="mb-4 bg-rose-50 text-rose-600 text-xs font-bold p-3.5 rounded-2xl border border-rose-200 text-center">
                  {errorMsg}
                </div>
              )}
              {infoMsg && !pendingOTP && (
                <div className="mb-4 bg-emerald-50 text-[#006A4E] text-xs font-bold p-3.5 rounded-2xl border border-emerald-200 text-center">
                  {infoMsg}
                </div>
              )}

              {pendingOTP ? (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-[#006A4E] mx-auto" />
                    <h3 className="font-bold text-sm text-[#17211D]">ওটিপি ভেরিফিকেশন</h3>
                    <p className="text-xs text-slate-600">
                      <strong>{pendingOTP.identifier}</strong> এ কোড পাঠানো হয়েছে।
                    </p>
                    <div className="bg-white p-2 rounded-xl text-center font-mono text-lg font-black text-[#006A4E] tracking-widest border border-emerald-300 mt-2">
                      ডেমো ওটিপি: {pendingOTP.code}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                      ৪ ডিজিটের কোড *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="XXXX"
                      className="w-full text-center tracking-[1em] text-lg font-black py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={cancelOTP}
                      className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-3 rounded-xl text-xs shadow-md"
                    >
                      যাচাই করুন →
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {isRegister && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">পূর্ণ নাম *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="যেমন: করিম আহমেদ"
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      মোবাইল নম্বর বা ইমেইল *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="013XXXXXXXX অথবা you@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                    {isRegister && identifier && (
                      <span className="text-[10px] font-bold mt-1 block">
                        {isBDPhone(identifier) ? (
                          <span className="text-emerald-600">✓ সঠিক মোবাইল নম্বর</span>
                        ) : isValidEmail(identifier) ? (
                          <span className="text-emerald-600">✓ সঠিক ইমেইল</span>
                        ) : (
                          <span className="text-amber-600">⚠️ সঠিক মোবাইল (013...) বা ইমেইল দিন</span>
                        )}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md"
                  >
                    {isRegister ? (
                      <>
                        <span>ওটিপি পাঠান</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>লগইন করুন</span>
                        <LogIn className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};