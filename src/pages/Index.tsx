
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BarbersSection } from "@/components/home/BarbersSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PromotionsSection } from "@/components/home/PromotionsSection";
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <>
      <HeroSection />
      <PromotionsSection />
      <ServicesSection />
      <BarbersSection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
