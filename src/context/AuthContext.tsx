import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  identifier: string;
  identifierType: 'phone' | 'email';
  password?: string;
  role: 'citizen' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  register: (name: string, identifier: string, password: string) => { success: boolean; message: string; requiresOTP?: boolean };
  login: (identifier: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  showLoginPrompt: boolean;
  setShowLoginPrompt: (status: boolean) => void;
  pendingOTP: { identifier: string; code: string; name: string; pass: string } | null;
  sendOTP: (identifier: string, name: string, pass: string) => { success: boolean; code: string; message: string };
  verifyOTP: (code: string) => boolean;
  cancelOTP: () => void;
  addUserByAdmin: (name: string, identifier: string, password: string, role: 'citizen' | 'admin') => boolean;
  changeUserRole: (id: string, newRole: 'citizen' | 'admin') => void;
  toggleUserVerification: (id: string) => void;
  deleteUser: (id: string) => void;
  changeUserPassword: (id: string, newPass: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB_KEY = 'eksheba_users_db_v6_maruf';
const CURRENT_USER_KEY = 'eksheba_current_user_v6_maruf';
const VISIT_COUNT_KEY = 'eksheba_visit_count_v6_maruf';

// ========== আপনার সুপার অ্যাডমিন (শুধু আপনি) ==========
export const OWNER_SUPER_ADMIN_PHONE = '01302393194';
export const OWNER_SUPER_ADMIN_EMAIL = 'marufsalauddinoffical@gmail.com';
export const OWNER_SUPER_ADMIN_NAME = 'Maruf Salauddin';
export const OWNER_SUPER_ADMIN_PASSWORD = 'admin'; // চাইলে পরে পরিবর্তন করুন

export const isBDPhone = (str: string) =>
  /^(013|014|015|016|017|018|019)\d{8}$/.test(str.trim());
export const isValidEmail = (str: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());

const isOwnerIdentifier = (id: string) => {
  const c = id.trim().toLowerCase();
  return (
    c === OWNER_SUPER_ADMIN_PHONE.toLowerCase() ||
    c === OWNER_SUPER_ADMIN_EMAIL.toLowerCase()
  );
};

const defaultUsers: User[] = [
  {
    id: 'super-admin-phone',
    name: OWNER_SUPER_ADMIN_NAME,
    identifier: OWNER_SUPER_ADMIN_PHONE,
    identifierType: 'phone',
    password: OWNER_SUPER_ADMIN_PASSWORD,
    role: 'admin',
    isVerified: true,
    createdAt: '২০২৫-০১-০১',
  },
  {
    id: 'super-admin-email',
    name: OWNER_SUPER_ADMIN_NAME,
    identifier: OWNER_SUPER_ADMIN_EMAIL,
    identifierType: 'email',
    password: OWNER_SUPER_ADMIN_PASSWORD,
    role: 'admin',
    isVerified: true,
    createdAt: '২০২৫-০১-০১',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(USERS_DB_KEY);
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingOTP, setPendingOTP] = useState<{
    identifier: string;
    code: string;
    name: string;
    pass: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  useEffect(() => {
    if (user) return;
    const visits = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    localStorage.setItem(VISIT_COUNT_KEY, (visits + 1).toString());
    if (visits > 2) {
      const timer = setTimeout(() => setShowLoginPrompt(true), 6000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const sendOTP = (identifier: string, name: string, pass: string) => {
    const cleanId = identifier.trim();
    const phone = isBDPhone(cleanId);
    const email = isValidEmail(cleanId);

    if (!phone && !email) {
      return {
        success: false,
        code: '',
        message: 'সঠিক ১১ ডিজিটের বাংলাদেশি নম্বর (013...) অথবা ইমেইল দিন।',
      };
    }

    if (users.some((u) => u.identifier.toLowerCase() === cleanId.toLowerCase())) {
      return {
        success: false,
        code: '',
        message: 'এই নম্বর/ইমেইল দিয়ে অ্যাকাউন্ট আছে! লগইন করুন।',
      };
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setPendingOTP({ identifier: cleanId, code, name, pass });

    return {
      success: true,
      code,
      message: phone
        ? `মোবাইল ${cleanId} এ ওটিপি পাঠানো হয়েছে।`
        : `ইমেইল ${cleanId} এ ওটিপি পাঠানো হয়েছে।`,
    };
  };

  const verifyOTP = (inputCode: string) => {
    if (!pendingOTP) return false;
    if (pendingOTP.code !== inputCode.trim()) return false;

    const phone = isBDPhone(pendingOTP.identifier);
    // পাবলিক রেজিস্ট্রেশন = সবসময় citizen (owner হলে admin)
    const role: 'citizen' | 'admin' = isOwnerIdentifier(pendingOTP.identifier)
      ? 'admin'
      : 'citizen';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: pendingOTP.name,
      identifier: pendingOTP.identifier,
      identifierType: phone ? 'phone' : 'email',
      password: pendingOTP.pass,
      role,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setPendingOTP(null);
    setShowLoginPrompt(false);
    return true;
  };

  const cancelOTP = () => setPendingOTP(null);

  const register = (name: string, identifier: string, password: string) => {
    const res = sendOTP(identifier, name, password);
    if (!res.success) return { success: false, message: res.message };
    return { success: true, message: res.message, requiresOTP: true };
  };

  const login = (identifier: string, password: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const found = users.find(
      (u) => u.identifier.toLowerCase() === cleanId && u.password === password
    );
    if (found) {
      setUser(found);
      setShowLoginPrompt(false);
      return { success: true, message: 'সফলভাবে লগইন হয়েছে!' };
    }
    return { success: false, message: 'ভুল মোবাইল/ইমেইল বা পাসওয়ার্ড!' };
  };

  const logout = () => setUser(null);

  const addUserByAdmin = (
    name: string,
    identifier: string,
    password: string,
    role: 'citizen' | 'admin'
  ) => {
    const cleanId = identifier.trim();
    if (users.some((u) => u.identifier.toLowerCase() === cleanId.toLowerCase()))
      return false;
    const phone = isBDPhone(cleanId);
    if (!phone && !isValidEmail(cleanId)) return false;

    setUsers((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        name,
        identifier: cleanId,
        identifierType: phone ? 'phone' : 'email',
        password,
        role,
        isVerified: true,
        createdAt: new Date().toISOString().split('T')[0],
      },
    ]);
    return true;
  };

  const changeUserRole = (id: string, newRole: 'citizen' | 'admin') => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    if (user?.id === id) setUser((p) => (p ? { ...p, role: newRole } : null));
  };

  const toggleUserVerification = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const changeUserPassword = (id: string, newPass: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, password: newPass } : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        register,
        login,
        logout,
        showLoginPrompt,
        setShowLoginPrompt,
        pendingOTP,
        sendOTP,
        verifyOTP,
        cancelOTP,
        addUserByAdmin,
        changeUserRole,
        toggleUserVerification,
        deleteUser,
        changeUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};