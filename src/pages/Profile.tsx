import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';
import { User, ShieldCheck, LogOut, Phone, Shield } from 'lucide-react';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            
            <div className="bg-gradient-to-r from-[#006A4E] to-[#004D3A] p-8 text-center text-white relative">
              <div className="w-20 h-20 bg-white text-[#006A4E] text-3xl font-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-emerald-300">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-emerald-200 text-sm mt-1">{user.role === 'admin' ? 'অ্যাডমিনিস্ট্রেটর' : 'নাগরিক প্রোফাইল'}</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div><p className="text-[11px] text-slate-500 font-bold">নাম</p><p className="font-bold text-slate-800">{user.name}</p></div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div><p className="text-[11px] text-slate-500 font-bold">মোবাইল / ইমেইল</p><p className="font-bold text-slate-800">{user.identifier}</p></div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <div><p className="text-[11px] text-slate-500 font-bold">অ্যাকাউন্ট টাইপ</p><p className="font-bold text-slate-800 uppercase">{user.role}</p></div>
                </div>
              </div>

              {user.role === 'admin' && (
                <button onClick={() => navigate('/admin')} className="w-full bg-emerald-50 text-[#006A4E] border border-emerald-200 font-bold py-3 rounded-xl flex justify-center items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> অ্যাডমিন প্যানেলে যান
                </button>
              )}

              <button onClick={handleLogout} className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> অ্যাকাউন্ট থেকে লগআউট করুন
              </button>
            </div>

          </div>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};