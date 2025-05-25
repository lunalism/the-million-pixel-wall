// app/faq/page.tsx

import { TopNav } from "@/components/common/TopNav";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FAQContent } from "@/components/faq/FAQContent";
import { Footer } from "@/components/common/Footer";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <HeroSection />
      <main className="flex-1 px-4 md:px-12 lg:px-20 py-8">
        <FAQContent />
      </main>
      <Footer />
    </div>
  );
}
