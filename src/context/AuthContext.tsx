import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  identifier: string;
  password?: string;
  role: 'citizen' | 'admin';
}

interface AuthContextType {
  user: User | null;
  users: User[];
  register: (name: string, identifier: string, password: string) => boolean;
  login: (identifier: string, password: string) => boolean;
  logout: () => void;
  showLoginPrompt: boolean;
  setShowLoginPrompt: (status: boolean) => void;
  // Admin Controls
  addUserByAdmin: (name: string, identifier: string, password: string, role: 'citizen' | 'admin') => boolean;
  changeUserRole: (id: string, newRole: 'citizen' | 'admin') => void;
  deleteUser: (id: string) => void;
  changeUserPassword: (id: string, newPass: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Updated Key to v3 to load default Citizen User for testing
const USERS_DB_KEY = 'eksheba_users_db_v3';
const CURRENT_USER_KEY = 'eksheba_current_user_v3';
const VISIT_COUNT_KEY = 'eksheba_visit_count_v3';

const defaultUsers: User[] = [
  { id: 'admin-main', name: 'প্রধান অ্যাডমিন (Super Admin)', identifier: 'admin', password: 'admin', role: 'admin' },
  { id: 'usr-demo-1', name: 'মারুফ আহমেদ (নাগরিক)', identifier: '01700000000', password: '123', role: 'citizen' }
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

  useEffect(() => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
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

  const register = (name: string, identifier: string, password: string) => {
    if (users.find(u => u.identifier === identifier)) return false;
    const newUser: User = { id: `usr-${Date.now()}`, name, identifier, password, role: 'citizen' };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setShowLoginPrompt(false);
    return true;
  };

  const login = (identifier: string, password: string) => {
    const foundUser = users.find(u => u.identifier === identifier && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setShowLoginPrompt(false);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  // Admin Direct Add User/Admin
  const addUserByAdmin = (name: string, identifier: string, password: string, role: 'citizen' | 'admin') => {
    if (users.find(u => u.identifier === identifier)) return false;
    const newUser: User = { id: `usr-${Date.now()}`, name, identifier, password, role };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  // Admin Change Role
  const changeUserRole = (id: string, newRole: 'citizen' | 'admin') => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    if (user?.id === id) setUser(prev => prev ? { ...prev, role: newRole } : null);
  };

  // Admin Delete User
  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Admin Change Password
  const changeUserPassword = (id: string, newPass: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, password: newPass } : u));
  };

  return (
    <AuthContext.Provider value={{ 
      user, users, register, login, logout, 
      showLoginPrompt, setShowLoginPrompt, 
      addUserByAdmin, changeUserRole, deleteUser, changeUserPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Error in AuthContext');
  return context;
};