'use client';
import Header from '@/components/Header/DesktopHeader';
import Hero from './components/Hero';
import Services from './components/Services';
import EcommerceSection from './components/Ecommerce';
import WhatsNew from './components/WhatsNew';
import Discount from './components/Discount';

const HomePageView = () => {
  return (
    <div className="flex w-full  flex-col">
      <Header />
      <main className=" ">
        <Hero />
        <Services />
        <EcommerceSection />
        <WhatsNew />
        <Discount />
        {/* Add other sections here */}
      </main>
    </div>
  );
};

export default HomePageView;
