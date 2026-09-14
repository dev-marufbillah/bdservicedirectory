import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { PopularServices } from '../components/PopularServices';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';

export const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F7FAF9] text-[#17211D] font-bengali pb-16 md:pb-0">
        <Navbar />
        <Hero />
        <Categories />
        <PopularServices />
        <HowItWorks />
        <Footer />
        <MobileBottomNav />
      </div>
    </PageTransition>
  );
};