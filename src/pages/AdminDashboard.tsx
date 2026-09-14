import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/mockData';
import { PageTransition } from '../components/PageTransition';
import {
  Grid, CheckCircle2, AlertTriangle, Users,
  Plus, Trash2, ExternalLink, Search, BarChart3, ArrowLeft,
  X, Check, Key, UserCog, LogOut, UserPlus, Crown
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, users, logout, addUserByAdmin, changeUserRole, changeUserPassword, deleteUser } = useAuth();
  const {
    services, reports, addService, deleteService,
    toggleVerifyService, resolveReport, deleteReport
  } = useServices();

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-bengali px-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold">অ্যাক্সেস ডিনাইড!</h1>
        <p className="text-slate-400 mt-2 text-center text-sm">
          এই পেজটি শুধুমাত্র অ্যাডমিনদের জন্য। আপনার অনুমতি নেই।
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-slate-700 hover:bg-slate-600 px-5 py-2.5 rounded-full text-sm font-bold"
          >
            হোমে ফিরে যান
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#006A4E] hover:bg-[#005841] px-5 py-2.5 rounded-full text-sm font-bold"
          >
            অ্যাডমিন লগইন
          </button>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reports' | 'users'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState<{ id: string; name: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('citizen');
  const [department, setDepartment] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');
  const [description, setDescription] = useState('');

  const [newUserName, setNewUserName] = useState('');
  const [newUserIdentifier, setNewUserIdentifier] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserRole, setNewUserRole] = useState<'citizen' | 'admin'>('admin');

  const totalServices = services.length;
  const verifiedCount = services.filter(s => s.verified).length;
  const popularCount = services.filter(s => s.popular).length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const citizenCount = users.filter(u => u.role === 'citizen').length;

  const filteredServices = services.filter(s =>
    s.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    setNameBn('');
    setNameEn('');
    setSlug('');
    setDepartment('');
    setOfficialUrl('');
    setDescription('');
    setIsAddModalOpen(false);
    alert('নতুন সেবাটি সফলভাবে যুক্ত করা হয়েছে!');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserIdentifier || !newUserPass) return;

    const success = addUserByAdmin(newUserName, newUserIdentifier, newUserPass, newUserRole);
    if (success) {
      alert(`নতুন ${newUserRole === 'admin' ? 'অ্যাডমিন' : 'ইউজার'} সফলভাবে যোগ করা হয়েছে!`);
      setNewUserName('');
      setNewUserIdentifier('');
      setNewUserPass('');
      setIsAddUserModalOpen(false);
    } else {
      alert('এই মোবাইল নম্বর/ইমেইল দিয়ে ইতোমধ্যেই অ্যাকাউন্ট রয়েছে!');
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
      <div className="min-h-screen bg-slate-900 text-slate-100 font-bengali flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950 p-6 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#006A4E] flex items-center justify-center font-bold text-white shadow-md">
                🛡️
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white">একসেবা অ্যাডমিন</h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-semibold border border-emerald-800">
                  {user.name}
                </span>
              </div>
            </div>

            <nav className="space-y-1.5 text-xs font-semibold pt-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-[#006A4E] text-white font-bold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>ড্যাশবোর্ড সামারি</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${activeTab === 'services' ? 'bg-[#006A4E] text-white font-bold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <div className="flex items-center gap-2.5">
                  <Grid className="w-4 h-4" />
                  <span>সেবা ব্যবস্থাপনা</span>
                </div>
                <span className="bg-slate-800 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full">{totalServices}</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${activeTab === 'reports' ? 'bg-[#006A4E] text-white font-bold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>লিংক রিপোর্ট</span>
                </div>
                {pendingReportsCount > 0 && (
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/30">{pendingReportsCount}</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${activeTab === 'users' ? 'bg-[#006A4E] text-white font-bold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <div className="flex items-center gap-2.5">
                  <UserCog className="w-4 h-4" />
                  <span>ইউজার ও অ্যাডমিন</span>
                </div>
                <span className="bg-slate-800 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full">{users.length}</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-2">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition border border-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>মূল ওয়েবসাইটে ফিরে যান</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-rose-950/50 hover:bg-rose-900 text-rose-300 font-bold py-2.5 rounded-xl text-xs transition border border-rose-900/50"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-2xl font-extrabold text-white">অ্যাডমিন কন্ট্রোল প্যানেল</h1>
              <p className="text-xs text-slate-400 mt-1">
                স্বাগতম, <span className="text-emerald-400 font-bold">{user.name}</span> — সেবা, রিপোর্ট ও ইউজার ম্যানেজমেন্ট
              </p>
            </div>

            {activeTab === 'services' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#006A4E] hover:bg-[#005841] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 self-start sm:self-auto active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন সেবা যোগ করুন</span>
              </button>
            )}

            {activeTab === 'users' && (
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 self-start sm:self-auto active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ নতুন অ্যাডমিন / ইউজার যোগ করুন</span>
              </button>
            )}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">মোট সেবা</span>
                    <Grid className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{totalServices}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">ভেরিফায়েড</span>
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{verifiedCount}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">জনপ্রিয়</span>
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{popularCount}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">পেন্ডিং রিপোর্ট</span>
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{pendingReportsCount}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">অ্যাডমিন সদস্য</span>
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{adminCount}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold">নাগরিক ইউজার</span>
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-3xl font-black text-white">{citizenCount}</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                <h3 className="font-bold text-base text-white">সর্বশেষ সেবাসমূহ</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                      <tr>
                        <th className="p-3">সেবার নাম</th>
                        <th className="p-3">দপ্তর</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {services.slice(0, 5).map(s => (
                        <tr key={s.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-white">{s.nameBn}</td>
                          <td className="p-3 text-slate-400">{s.department}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${s.verified ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'}`}>
                              {s.verified ? '✓ Official' : 'Unverified'}
                            </span>
                          </td>
                          <td className="p-3">
                            <a href={s.officialUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-bold">
                              <span>সাইট</span> <ExternalLink className="w-3 h-3" />
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

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="সেবা বা ডিপার্টমেন্ট দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3.5">সেবার নাম</th>
                      <th className="p-3.5">ক্যাটাগরি</th>
                      <th className="p-3.5">URL</th>
                      <th className="p-3.5">ভেরিফিকেশন</th>
                      <th className="p-3.5">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300">
                    {filteredServices.map(s => (
                      <tr key={s.id} className="hover:bg-slate-900/50">
                        <td className="p-3.5 font-bold text-white">
                          <div>
                            <span>{s.nameBn}</span>
                            <span className="block text-[10px] text-slate-500 font-normal">{s.department}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-400 font-semibold">{s.category}</td>
                        <td className="p-3.5 text-slate-400 truncate max-w-[180px]">{s.officialUrl}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => toggleVerifyService(s.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${s.verified ? 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-rose-950 hover:text-rose-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-emerald-950 hover:text-emerald-400'}`}
                          >
                            {s.verified ? '✓ Verified' : '+ Verify'}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => {
                              if (confirm(`"${s.nameBn}" মুছে ফেলতে চান?`)) deleteService(s.id);
                            }}
                            className="p-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-400 transition"
                            title="মুছে ফেলুন"
                          >
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

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h3 className="font-bold text-base text-white">নাগরিকদের ব্রোকেন লিংক রিপোর্ট</h3>

              {reports.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">কোনো রিপোর্ট নেই।</p>
              ) : (
                <div className="space-y-3 text-xs">
                  {reports.map((r) => (
                    <div key={r.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{r.serviceName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.status === 'resolved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                            {r.status === 'resolved' ? 'Resolved' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-slate-400">সমস্যা: <span className="text-slate-200">{r.issueType}</span> — {r.details}</p>
                        <p className="text-slate-500 text-[10px]">তারিখ: {r.date} | URL: {r.officialUrl}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.status === 'pending' && (
                          <button
                            onClick={() => resolveReport(r.id)}
                            className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-bold px-3 py-1.5 rounded-lg transition text-xs flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> সমাধান
                          </button>
                        )}
                        <button
                          onClick={() => deleteReport(r.id)}
                          className="bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 p-1.5 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* USERS & ADMIN TAB */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <UserCog className="w-5 h-5 text-emerald-400" />
                      ইউজার ও অ্যাডমিন কন্ট্রোল প্যানেল
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      যেকোনো ইউজারকে অ্যাডমিন বানান, পাসওয়ার্ড রিসেট করুন বা নতুন অ্যাডমিন যোগ করুন।
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-1.5 flex-shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ নতুন অ্যাডমিন / ইউজার যোগ করুন</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                      <tr>
                        <th className="p-3.5">নাম ও প্রোফাইল</th>
                        <th className="p-3.5">ইমেইল / মোবাইল</th>
                        <th className="p-3.5">বর্তমান রোল</th>
                        <th className="p-3.5">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/50">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md ${u.role === 'admin' ? 'bg-amber-600' : 'bg-[#006A4E]'}`}>
                                {u.role === 'admin' ? '👑' : u.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{u.name}</span>
                                {u.id === user.id && (
                                  <span className="text-[10px] text-emerald-400 font-bold">(আপনি)</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-300 font-mono">{u.identifier}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${u.role === 'admin' ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                              {u.role === 'admin' ? '👑 Admin' : '👤 Citizen'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              {u.id !== user.id && (
                                <button
                                  onClick={() => {
                                    const newRole = u.role === 'admin' ? 'citizen' : 'admin';
                                    if (confirm(`আপনি কি "${u.name}" কে ${newRole === 'admin' ? 'অ্যাডমিন' : 'নাগরিক ইউজার'} বানাতে চান?`)) {
                                      changeUserRole(u.id, newRole);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1 shadow-sm ${
                                    u.role === 'citizen'
                                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                  }`}
                                >
                                  {u.role === 'citizen' ? (
                                    <>
                                      <Crown className="w-3.5 h-3.5" />
                                      <span>👑 অ্যাডমিন করুন</span>
                                    </>
                                  ) : (
                                    <span>👤 সাধারণ ইউজার করুন</span>
                                  )}
                                </button>
                              )}

                              <button
                                onClick={() => setPasswordModal({ id: u.id, name: u.name })}
                                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                                title="পাসওয়ার্ড রিসেট"
                              >
                                <Key className="w-4 h-4" />
                              </button>

                              {u.id !== user.id && (
                                <button
                                  onClick={() => {
                                    if (confirm(`"${u.name}" অ্যাকাউন্টটি মুছে ফেলতে চান?`)) {
                                      deleteUser(u.id);
                                    }
                                  }}
                                  className="p-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-400 transition"
                                  title="মুছে ফেলুন"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">সেবার নাম (বাংলা) *</label>
                  <input type="text" required value={nameBn} onChange={e => setNameBn(e.target.value)} placeholder="যেমন: ই-পাসপোর্ট" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">সেবার নাম (English)</label>
                  <input type="text" value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="e.g. E-Passport" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">ক্যাটাগরি *</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]">
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.nameBn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">মন্ত্রণালয় / দপ্তর</label>
                    <input type="text" value={department} onChange={e => setDepartment(e.target.value)} placeholder="যেমন: পাসপোর্ট অধিদপ্তর" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">অফিশিয়াল URL *</label>
                  <input type="url" required value={officialUrl} onChange={e => setOfficialUrl(e.target.value)} placeholder="https://www.epassport.gov.bd/" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ</label>
                  <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="সেবার বিবরণ..." className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>
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
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  নতুন অ্যাডমিন / ইউজার তৈরি করুন
                </h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">পূর্ণ নাম *</label>
                  <input type="text" required value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="যেমন: আব্দুর রহমান" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">মোবাইল নম্বর বা ইমেইল (আইডি) *</label>
                  <input type="text" required value={newUserIdentifier} onChange={e => setNewUserIdentifier(e.target.value)} placeholder="017XXXXXXXX বা admin2" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">পাসওয়ার্ড *</label>
                  <input type="password" required value={newUserPass} onChange={e => setNewUserPass(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]" />
                </div>

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
                  <Key className="w-4 h-4 text-emerald-400" />
                  পাসওয়ার্ড রিসেট
                </h3>
                <button onClick={() => { setPasswordModal(null); setNewPassword(''); }} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400">
                <strong className="text-white">{passwordModal.name}</strong> এর নতুন পাসওয়ার্ড দিন।
              </p>
              <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#006A4E]"
                />
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