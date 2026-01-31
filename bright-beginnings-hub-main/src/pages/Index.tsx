import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import PromoBar from '@/components/PromoBar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import LocationSection from '@/components/LocationSection';
import EducationalSection from '@/components/EducationalSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <PromoBar />
        <main className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <LocationSection />
          <TestimonialsSection />
          <EducationalSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
