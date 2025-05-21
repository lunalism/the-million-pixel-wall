import { HeroSection } from "@/components/homepage/HeroSection";
import { PixelCanvas } from "@/components/homepage/PixelCanvas";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Footer } from "@/components/common/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <main className="flex-1 px-4 md:px-12 lg:px-20">
        <PixelCanvas />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
