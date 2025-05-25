import { TopNav } from "@/components/common/TopNav";
import { Footer } from "@/components/common/Footer";
import { AboutContent } from "@/components/about/AboutContent";
import { HeroSection } from "@/components/homepage/HeroSection";

export const metadata = {
  title: "About | The Million Pixel Wall",
  description: "Learn the story behind the Million Pixel Wall and how we brought it back for 2025.",
  keywords: ["million pixel wall", "about", "pixel advertising", "revival project"],
  openGraph: {
    title: "About | The Million Pixel Wall",
    description: "Discover why the Million Pixel Wall is back for its 20th anniversary.",
    url: "https://the-million-pixel-wall.com/about",
    siteName: "The Million Pixel Wall",
    images: [
      {
        url: "https://the-million-pixel-wall.com/og-about.jpg",
        width: 600,
        height: 600,
        alt: "About the Million Pixel Wall",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | The Million Pixel Wall",
    description: "Discover the 2025 revival of the Million Pixel Wall.",
    images: ["https://the-million-pixel-wall.com/og-about.jpg"],
  },
};


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
