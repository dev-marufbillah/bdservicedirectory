import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ServiceProvider } from './context/ServiceContext';
import { LanguageProvider } from './context/LanguageContext';
import { SEOHandler } from './components/SEOHandler';

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <BrowserRouter>
          <SEOHandler />
          <AnimatedRoutes />
        </BrowserRouter>
      </ServiceProvider>
    </LanguageProvider>
  );
}

export default App;