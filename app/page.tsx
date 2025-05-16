import HeroSection from '@/components/HeroSection';
import PixelGrid from '@/components/PixelGrid';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PixelGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}
