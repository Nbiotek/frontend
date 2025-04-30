'use client';
import Header from '@/components/Header/DesktopHeader';
import Hero from './components/Hero';
import Services from './components/Services';
import EcommerceSection from './components/Ecommerce';
import WhatsNew from './components/WhatsNew';
import Discount from './components/Discount';
import BioHub from './components/N-Biohub';
import TestimonialSlider from './components/Testimonials';
import CTA from './components/CTA';
import PartnerSection from './components/Partners';
import Footer from '@/components/Footer';
import ToggleHeader from '@/components/Header/ToggleHeader';
const HomePageView = () => {
  return (
    <>
      <Hero />
      <Services />
      <EcommerceSection />
      <WhatsNew />
      <Discount />
      <BioHub />
      <TestimonialSlider />
      <CTA />
      <PartnerSection />
    </>
  );
};

export default HomePageView;
