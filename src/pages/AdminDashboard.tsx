import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/mockData';
import { PageTransition } from '../components/PageTransition';
import {
  ShieldCheck, Grid, CheckCircle2, AlertTriangle, Users,
  Plus, Trash2, ExternalLink, Search, BarChart3, ArrowLeft,
  X, Check, Key, UserCog, LogOut, UserPlus, Crown, Phone, Mail, BadgeCheck, Lock, Clock
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    user, users, logout, addUserByAdmin, changeUserRole, 
    toggleUserVerification, changeUserPassword, deleteUser 
  } = useAuth();
  
  const {
    services, reports, addService, deleteService,
    toggleVerifyService, resolveReport, deleteReport
  } = useServices();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // PRIVATE ACCESS GUARD
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white font-bengali px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 mb-6 shadow-[0_0_40px_rgba(244,63,94,0.3)] animate-pulse">
          <Lock className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-3xl font-black mb-2">প্রাইভেট এলাকা! (Access Denied)</h1>
        <p className="text-sm text-slate-400 max-w-md leading-relaxed">
          এই পেজটি শুধুমাত্র <strong className="text-white">BD SERVICE DIRECTORY</strong> এর সুপার অ্যাডমিনদের জন্য সুরক্ষিত।
        </p>
        <div className="flex gap-4 mt-8">
          <button onClick={() => navigate('/')} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-bold border border-slate-700 transition">
            হোমে ফিরে যান
          </button>
          <button onClick={() => navigate('/login')} className="bg-[#006A4E] hover:bg-[#005841] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/50 transition">
            অ্যাডমিন লগইন
          </button>
        </div>
      </div>
    );
  }

  // State Management
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reports' | 'users'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState<{ id: string; name: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');

  // New Service Form State
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('citizen');
  const [department, setDepartment] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');
  const [description, setDescription] = useState('');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserIdentifier, setNewUserIdentifier] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserRole, setNewUserRole] = useState<'citizen' | 'admin'>('admin');

  // Calculations
  const totalServices = services.length;
  const verifiedCount = services.filter(s => s.verified).length;
  const popularCount = services.filter(s => s.popular).length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const adminUsersList = users.filter(u => u.role === 'admin');
  const citizenUsersList = users.filter(u => u.role === 'citizen');
  const adminCount = adminUsersList.length;
  const citizenCount = citizenUsersList.length;

  const filteredServices = services.filter(s =>
    s.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !officialUrl) return;

    addService({
      nameBn,
      nameEn: nameEn || nameBn,
      slug: slug || nameBn.toLowerCase().replace(/\s+/g, '-'),
      category,
      department: department || 'বাংলাদেশ সরকার',
      description: description || 'সরকারি সেবার অফিশিয়াল ডিরেক্টরি পোর্টাল।',
      officialUrl,
      verified: true,
      popular: false,
      lastVerified: new Date().toISOString().split('T')[0],
      aliases: [nameBn, nameEn].filter(Boolean),
      iconName: 'ShieldCheck'
    });

    setNameBn(''); setNameEn(''); setSlug(''); setDepartment(''); setOfficialUrl(''); setDescription('');
    setIsAddModalOpen(false);
    alert('নতুন সেবাটি সফলভাবে যুক্ত করা হয়েছে!');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserIdentifier || !newUserPass) return;

    const success = addUserByAdmin(newUserName, newUserIdentifier, newUserPass, newUserRole);
    if (success) {
      alert(`নতুন ${newUserRole === 'admin' ? 'অ্যাডমিন' : 'ইউজার'} সফলভাবে যোগ করা হয়েছে!`);
      setNewUserName(''); setNewUserIdentifier(''); setNewUserPass('');
      setIsAddUserModalOpen(false);
    } else {
      alert('এই আইডেন্টিফায়ার দিয়ে ইতোমধ্যেই অ্যাকাউন্ট রয়েছে!');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModal || !newPassword.trim()) return;
    changeUserPassword(passwordModal.id, newPassword.trim());
    alert(`${passwordModal.name} এর পাসওয়ার্ড পরিবর্তন করা হয়েছে।`);
    setPasswordModal(null);
    setNewPassword('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0B1120] text-slate-100 font-bengali flex flex-col md:flex-row">

        {/* ===================== SIDEBAR ===================== */}
        <aside className="w-full md:w-72 bg-[#0F172A] p-6 border-b md:border-b-0 md:border-r border-slate-800/80 flex flex-col justify-between shadow-2xl relative z-20">
          <div className="space-y-8">
            {/* BRAND LOGO */}
            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006A4E] to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-black text-[14px] text-white tracking-wide">BD SERVICE<br/>DIRECTORY</h2>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 text-sm font-semibold">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-[#006A4E]/20 text-[#006A4E] border border-[#006A4E]/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
                <BarChart3 className="w-5 h-5" /><span>ড্যাশবোর্ড সামারি</span>
              </button>

              <button onClick={() => setActiveTab('services')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === 'services' ? 'bg-[#006A4E]/20 text-[#006A4E] border border-[#006A4E]/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
                <div className="flex items-center gap-3"><Grid className="w-5 h-5" /><span>সেবা ব্যবস্থাপনা</span></div>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-md">{totalServices}</span>
              </button>

              <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === 'reports' ? 'bg-[#006A4E]/20 text-[#006A4E] border border-[#006A4E]/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
                <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5" /><span>লিংক রিপোর্ট</span></div>
                {pendingReportsCount > 0 && <span className="bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)] text-[10px] px-2.5 py-1 rounded-md animate-pulse">{pendingReportsCount}</span>}
              </button>

              <button onClick={() => setActiveTab('users')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === 'users' ? 'bg-[#006A4E]/20 text-[#006A4E] border border-[#006A4E]/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
                <div className="flex items-center gap-3"><UserCog className="w-5 h-5" /><span>ইউজার কন্ট্রোল</span></div>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800/80 space-y-3">
            <Link to="/" className="w-full flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-3 rounded-xl text-xs transition border border-slate-700/50">
              <ArrowLeft className="w-4 h-4" /><span>ওয়েবসাইটে যান</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold py-3 rounded-xl text-xs transition border border-rose-500/20">
              <LogOut className="w-4 h-4" /><span>লগআউট</span>
            </button>
          </div>
        </aside>

        {/* ===================== MAIN CONTENT ===================== */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto relative bg-[#0B1120]">
          
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Bar */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-slate-800/80 relative z-10">
            <div>
              <p className="text-sm text-[#006A4E] font-semibold mb-1 flex items-center gap-2">
                স্বাগতম ফিরে আসার জন্য, {user.name} <Crown className="w-4 h-4 text-amber-400" />
              </p>
              <h1 className="text-3xl font-black text-white tracking-tight">ড্যাশবোর্ড ওভারভিউ</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-700/50">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-mono text-slate-300">{currentTime.toLocaleTimeString('bn-BD')}</span>
              </div>
              
              {activeTab === 'services' && (
                <button onClick={() => setIsAddModalOpen(true)} className="bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,106,78,0.3)] transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" /><span>নতুন সেবা যোগ করুন</span>
                </button>
              )}

              {activeTab === 'users' && (
                <button onClick={() => setIsAddUserModalOpen(true)} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /><span>নতুন অ্যাকাউন্ট</span>
                </button>
              )}
            </div>
          </div>

          {/* ===================== OVERVIEW TAB ===================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400 mb-4"><span className="text-xs font-bold uppercase tracking-wider">মোট সেবা</span><Grid className="w-5 h-5 text-emerald-400" /></div>
                  <p className="text-4xl font-black text-white">{totalServices}</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400"><span className="text-xs font-bold uppercase tracking-wider">ভেরিফায়েড</span><CheckCircle2 className="w-5 h-5 text-blue-400" /></div>
                  <p className="text-4xl font-black text-white">{verifiedCount}</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400"><span className="text-xs font-bold uppercase tracking-wider">জনপ্রিয়</span><BarChart3 className="w-5 h-5 text-purple-400" /></div>
                  <p className="text-4xl font-black text-white">{popularCount}</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400"><span className="text-xs font-bold uppercase tracking-wider">পেন্ডিং রিপোর্ট</span><AlertTriangle className="w-5 h-5 text-rose-400" /></div>
                  <p className="text-4xl font-black text-white">{pendingReportsCount}</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400"><span className="text-xs font-bold uppercase tracking-wider">অ্যাডমিন</span><Crown className="w-5 h-5 text-amber-400" /></div>
                  <p className="text-4xl font-black text-white">{adminCount}</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between text-slate-400"><span className="text-xs font-bold uppercase tracking-wider">নাগরিক ইউজার</span><Users className="w-5 h-5 text-cyan-400" /></div>
                  <p className="text-4xl font-black text-white">{citizenCount}</p>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl">
                <h3 className="font-bold text-lg text-white mb-6">সাম্প্রতিক ভেরিফায়েড সেবাসমূহ</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-400 uppercase font-bold text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="pb-4 pr-4">সেবার নাম</th>
                        <th className="pb-4 px-4">দপ্তর</th>
                        <th className="pb-4 px-4">স্ট্যাটাস</th>
                        <th className="pb-4 pl-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      {services.slice(0, 5).map(s => (
                        <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 pr-4 font-bold text-white">{s.nameBn}</td>
                          <td className="py-4 px-4 text-slate-400">{s.department}</td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              ✓ Official
                            </span>
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <a href={s.officialUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-xs inline-flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                              সাইট ভিজিট <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================== SERVICES TAB ===================== */}
          {activeTab === 'services' && (
            <div className="space-y-4 relative z-10">
              <div className="relative flex-1 max-w-md">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="সেবা বা ডিপার্টমেন্ট দিয়ে খুঁজুন..." className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-4">সেবার নাম</th>
                      <th className="p-4">ক্যাটাগরি</th>
                      <th className="p-4">URL</th>
                      <th className="p-4">ভেরিফিকেশন</th>
                      <th className="p-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {filteredServices.map(s => (
                      <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-bold text-white">
                          <div className="flex flex-col">
                            <span>{s.nameBn}</span>
                            <span className="text-[10px] text-slate-500 font-normal mt-1">{s.department}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-400 font-semibold">{s.category}</td>
                        <td className="p-4 text-slate-400 truncate max-w-[180px]">{s.officialUrl}</td>
                        <td className="p-4">
                          <button onClick={() => toggleVerifyService(s.id)} className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold border transition ${s.verified ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800 hover:bg-rose-900/30 hover:text-rose-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-emerald-900/30 hover:text-emerald-400'}`}>
                            {s.verified ? '✓ Verified' : '+ Verify'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => { if (confirm(`"${s.nameBn}" মুছে ফেলতে চান?`)) deleteService(s.id); }} className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition" title="মুছে ফেলুন">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================== REPORTS TAB ===================== */}
          {activeTab === 'reports' && (
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl relative z-10">
              <h3 className="font-bold text-base text-white">নাগরিকদের ব্রোকেন লিংক রিপোর্ট</h3>
              {reports.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">কোনো রিপোর্ট নেই।</p>
              ) : (
                <div className="space-y-3 text-xs">
                  {reports.map((r) => (
                    <div key={r.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{r.serviceName}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                            {r.status === 'resolved' ? 'Resolved' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-slate-400">সমস্যা: <span className="text-slate-200">{r.issueType}</span> — {r.details}</p>
                        <p className="text-slate-500 text-[10px] font-mono">তারিখ: {r.date} | URL: {r.officialUrl}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.status === 'pending' && (
                          <button onClick={() => resolveReport(r.id)} className="bg-[#006A4E] hover:bg-[#004D3A] text-white font-bold px-4 py-2 rounded-lg transition text-xs flex items-center gap-1.5 shadow-md">
                            <Check className="w-4 h-4" /> সমাধান
                          </button>
                        )}
                        <button onClick={() => deleteReport(r.id)} className="bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 p-2 rounded-lg transition border border-slate-700 hover:border-rose-900/50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===================== USERS TAB (COMPLETELY SEPARATED ADMIN & CITIZEN) ===================== */}
          {activeTab === 'users' && (
            <div className="space-y-8 relative z-10">
              
              {/* ADMIN SECTION */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 shadow-[0_10px_40px_rgba(245,158,11,0.05)]">
                <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl shadow-inner border border-amber-500/20">👑</div>
                    <div>
                      <h3 className="font-bold text-lg text-white tracking-wide">অ্যাডমিন প্যানেল সদস্যবৃন্দ</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">সিস্টেমের পূর্ণ নিয়ন্ত্রণ ক্ষমতাসম্পন্ন ইউজার</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-400 uppercase font-bold text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="pb-4 pr-4">অ্যাডমিন নাম</th>
                        <th className="pb-4 px-4">মোবাইল / ইমেইল</th>
                        <th className="pb-4 px-4">অ্যাক্সেস লেভেল</th>
                        <th className="pb-4 pl-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      {adminUsersList.map((u) => {
                        const isOwner = u.identifier === '01302393194' || u.identifier === 'marufsalauddinoffical@gmail.com';
                        return (
                          <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold shadow-md">👑</div>
                                <div>
                                  <span className="font-bold text-white block flex items-center gap-2">
                                    {u.name}
                                    {isOwner && <span className="bg-amber-500/20 text-amber-400 text-[9px] px-2 py-0.5 rounded border border-amber-500/40 font-bold uppercase tracking-wider">Owner</span>}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono">আইডি: {u.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-mono text-slate-300 text-xs">
                              <div className="flex items-center gap-2">
                                {u.identifierType === 'phone' ? <Phone className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-blue-500" />}
                                {u.identifier}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Super Admin</span>
                            </td>
                            <td className="py-4 pl-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => setPasswordModal({ id: u.id, name: u.name })} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700" title="পাসওয়ার্ড রিসেট"><Key className="w-4 h-4" /></button>
                                {!isOwner && (
                                  <button onClick={() => { if (confirm(`"${u.name}" কে সাধারণ নাগরিক বানাতে চান?`)) changeUserRole(u.id, 'citizen'); }} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition">সাধারণ ইউজার করুন</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CITIZEN SECTION */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6 shadow-[0_10px_40px_rgba(16,185,129,0.05)]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-500/10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-lg shadow-inner border border-emerald-500/20">👤</div>
                  <div>
                    <h3 className="font-bold text-lg text-white tracking-wide">নিবন্ধিত সাধারণ নাগরিকবৃন্দ</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">সাইটে সেবা অনুসন্ধানের জন্য নিবন্ধিত ইউজার</p>
                  </div>
                </div>

                {citizenUsersList.length === 0 ? (
                  <p className="text-sm text-slate-500 py-8 text-center bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">কোনো সাধারণ নাগরিক পাওয়া যায়নি।</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-slate-400 uppercase font-bold text-[10px] tracking-widest border-b border-slate-800">
                        <tr>
                          <th className="pb-4 pr-4">নাগরিকের নাম</th>
                          <th className="pb-4 px-4">মোবাইল / ইমেইল</th>
                          <th className="pb-4 px-4">ভেরিফিকেশন</th>
                          <th className="pb-4 pl-4 text-right">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50 text-slate-300">
                        {citizenUsersList.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-4 pr-4 font-bold text-white">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#006A4E] text-white flex items-center justify-center font-bold text-sm shadow-md">{u.name.charAt(0)}</div>
                                <div>
                                  <span className="block text-sm">{u.name}</span>
                                  <span className="text-[10px] text-slate-500 font-mono">আইডি: {u.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-mono text-slate-300 text-xs">
                              <div className="flex items-center gap-2">
                                {u.identifierType === 'phone' ? <Phone className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-blue-500" />}
                                {u.identifier}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <button onClick={() => toggleUserVerification(u.id)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${u.isVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                <BadgeCheck className="w-4 h-4" />
                                <span>{u.isVerified ? 'ভেরিফায়েড' : 'আনভেরিফায়েড'}</span>
                              </button>
                            </td>
                            <td className="py-4 pl-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => { if (confirm(`আপনি কি "${u.name}" কে অ্যাডমিন প্যানেলে প্রমোট করতে চান?`)) changeUserRole(u.id, 'admin'); }} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 px-4 py-2 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-lg">
                                  <Crown className="w-4 h-4" /><span>অ্যাডমিন করুন</span>
                                </button>
                                <button onClick={() => setPasswordModal({ id: u.id, name: u.name })} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700" title="পাসওয়ার্ড রিসেট"><Key className="w-4 h-4" /></button>
                                <button onClick={() => { if (confirm(`"${u.name}" অ্যাকাউন্ট ডিলিট করতে চান?`)) deleteUser(u.id); }} className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition border border-rose-500/20" title="মুছে ফেলুন"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* MODAL: ADD SERVICE */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 text-slate-100 w-full max-w-lg rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-base text-white">নতুন সরকারি সেবা যোগ করুন</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-3 text-xs">
                <div><label className="block font-semibold text-slate-300 mb-1">সেবার নাম (বাংলা) *</label><input type="text" required value={nameBn} onChange={e => setNameBn(e.target.value)} placeholder="যেমন: ই-পাসপোর্ট" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div><label className="block font-semibold text-slate-300 mb-1">সেবার নাম (English)</label><input type="text" value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="e.g. E-Passport" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block font-semibold text-slate-300 mb-1">ক্যাটাগরি *</label><select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]">{CATEGORIES.map(c => (<option key={c.id} value={c.id}>{c.nameBn}</option>))}</select></div>
                  <div><label className="block font-semibold text-slate-300 mb-1">মন্ত্রণালয় / দপ্তর</label><input type="text" value={department} onChange={e => setDepartment(e.target.value)} placeholder="যেমন: পাসপোর্ট অধিদপ্তর" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                </div>
                <div><label className="block font-semibold text-slate-300 mb-1">অফিশিয়াল URL *</label><input type="url" required value={officialUrl} onChange={e => setOfficialUrl(e.target.value)} placeholder="https://www.epassport.gov.bd/" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div><label className="block font-semibold text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ</label><textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="সেবার বিবরণ..." className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div className="pt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">বাতিল</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#006A4E] hover:bg-[#005841] text-white font-bold shadow-md">সেবা যোগ করুন</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD USER/ADMIN */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 text-slate-100 w-full max-w-md rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-400" /> নতুন অ্যাকাউন্ট তৈরি করুন
                </h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                <div><label className="block font-semibold text-slate-300 mb-1">পূর্ণ নাম *</label><input type="text" required value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="যেমন: আব্দুর রহমান" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div><label className="block font-semibold text-slate-300 mb-1">অরিজিনাল মোবাইল নম্বর বা ইমেইল *</label><input type="text" required value={newUserIdentifier} onChange={e => setNewUserIdentifier(e.target.value)} placeholder="01302393194 অথবা marufsalauddinoffical@gmail.com" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div><label className="block font-semibold text-slate-300 mb-1">পাসওয়ার্ড *</label><input type="password" required value={newUserPass} onChange={e => setNewUserPass(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" /></div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">অ্যাকাউন্ট টাইপ (রোল) *</label>
                  <select value={newUserRole} onChange={e => setNewUserRole(e.target.value as any)} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]">
                    <option value="admin">👑 অ্যাডমিন (Admin Access)</option>
                    <option value="citizen">👤 সাধারণ নাগরিক ইউজার</option>
                  </select>
                </div>
                <div className="pt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">বাতিল</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md">অ্যাকাউন্ট তৈরি করুন</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PASSWORD CHANGE */}
        {passwordModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 text-slate-100 w-full max-w-sm rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-400" /> পাসওয়ার্ড রিসেট
                </h3>
                <button onClick={() => { setPasswordModal(null); setNewPassword(''); }} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-xs text-slate-400"><strong className="text-white">{passwordModal.name}</strong> এর নতুন পাসওয়ার্ড দিন।</p>
              <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
                <input type="text" required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="নতুন পাসওয়ার্ড লিখুন" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => { setPasswordModal(null); setNewPassword(''); }} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">বাতিল</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#006A4E] hover:bg-[#005841] text-white font-bold shadow-md">সংরক্ষণ</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};