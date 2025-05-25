import { TopNav } from "@/components/common/TopNav";
import { Footer } from "@/components/common/Footer";
import { AboutContent } from "@/components/about/AboutContent";
import { HeroSection } from "@/components/homepage/HeroSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-1">
        <HeroSection />
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
