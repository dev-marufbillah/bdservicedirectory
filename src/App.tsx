import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { LanguageProvider } from './context/LanguageContext';
import { ServiceProvider } from './context/ServiceContext';
import { AuthProvider } from './context/AuthContext';
import { SEOHandler } from './components/SEOHandler';
import { LoginPromptModal } from './components/LoginPromptModal';

import { Home } from './pages/Home';
import { AllCategories } from './pages/AllCategories';
import { CategoryDetails } from './pages/CategoryDetails';
import { ServiceDetails } from './pages/ServiceDetails';
import { SearchResults } from './pages/SearchResults';
import { AllServices } from './pages/AllServices';
import { Help } from './pages/Help';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ReportBrokenLink } from './pages/ReportBrokenLink';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/categories/:slug" element={<CategoryDetails />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report-broken-link" element={<ReportBrokenLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ServiceProvider>
          <BrowserRouter>
            <SEOHandler />
            <AnimatedRoutes />
            <LoginPromptModal />
          </BrowserRouter>
        </ServiceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;