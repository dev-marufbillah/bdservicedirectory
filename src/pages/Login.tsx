import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { Phone, Lock, Eye, EyeOff, LogIn, UserPlus, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegister) {
      // Registration Logic
      const success = register(name, identifier, password);
      if (success) {
        alert('নিবন্ধন সফল হয়েছে! স্বাগতম।');
        navigate('/');
      } else {
        setErrorMsg('এই মোবাইল নম্বর বা ইমেইল দিয়ে আগে থেকেই একটি অ্যাকাউন্ট রয়েছে!');
      }
    } else {
      // Login Logic
      const success = login(identifier, password);
      if (success) {
        if (identifier === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMsg('ভুল মোবাইল নম্বর/ইমেইল অথবা পাসওয়ার্ড দিয়েছেন!');
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />

        <div className="max-w-md mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Banner */}
            <div className="bg-gradient-to-b from-[#004D3A] to-[#006A4E] text-white p-8 text-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center border border-white/20 mb-3 shadow-inner">
                <span className="text-3xl">🏛️</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">{isRegister ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'স্বাগতম!'}</h2>
              <p className="text-xs text-emerald-100 mt-1 max-w-xs mx-auto">
                আপনার ডিজিটাল সরকারি সেবা পোর্টালে {isRegister ? 'নিবন্ধন' : 'লগইন'} করুন
              </p>

              {/* Tabs */}
              <div className="flex bg-black/20 p-1 rounded-full mt-6 max-w-xs mx-auto text-xs font-bold relative z-10">
                <button onClick={() => {setIsRegister(false); setErrorMsg('');}} className={`flex-1 py-2 rounded-full transition ${!isRegister ? 'bg-white text-[#006A4E] shadow-sm' : 'text-white'}`}>লগইন</button>
                <button onClick={() => {setIsRegister(true); setErrorMsg('');}} className={`flex-1 py-2 rounded-full transition ${isRegister ? 'bg-white text-[#006A4E] shadow-sm' : 'text-white'}`}>রেজিস্ট্রেশন</button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              
              {errorMsg && (
                <div className="mb-4 bg-rose-50 text-rose-600 text-xs font-bold p-3 rounded-xl border border-rose-200 text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="যেমন: মারুফ ইসলাম" className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর অথবা ইমেইল *</label>
                  <div className="relative">
                    <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="017XXXXXXXX বা admin" className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]" />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড *</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#006A4E]" />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#006A4E] hover:bg-[#005841] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md">
                  {isRegister ? <><span>নিবন্ধন সম্পন্ন করুন</span><UserPlus className="w-4 h-4" /></> : <><span>লগইন করুন</span><LogIn className="w-4 h-4" /></>}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <button onClick={() => { setIdentifier('admin'); setPassword('admin'); }} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] hover:underline bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                  <span>অ্যাডমিন ডেমো লগইন পূরণ করুন</span>
                </button>
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