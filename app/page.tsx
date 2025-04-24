// app/page.tsx

import HeroSection from "@/components/HeroSection";
import PixelBoard from "@/components/PixelBoard"
import FeatureSection from "@/components/FeatureSection"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PixelBoard />
      <FeatureSection /> {/* ✅ 여기 연결! */}
    </main>
  );
}
