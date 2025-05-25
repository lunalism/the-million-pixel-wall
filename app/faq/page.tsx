// app/faq/page.tsx

import { TopNav } from "@/components/common/TopNav";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FAQContent } from "@/components/faq/FAQContent";
import { Footer } from "@/components/common/Footer";

export const metadata = {
    title: "FAQ | The Million Pixel Wall",
    description: "Get answers to common questions about purchasing pixels, uploading images, and more.",
    keywords: ["faq", "pixel questions", "help", "support", "million pixel wall"],
    openGraph: {
        title: "FAQ | The Million Pixel Wall",
        description: "Everything you need to know about buying and managing your pixels.",
        url: "https://the-million-pixel-wall.com/faq",
        siteName: "The Million Pixel Wall",
        images: [
            {
                url: "https://the-million-pixel-wall.com/og-faq.jpg",
                width: 600,
                height: 600,
                alt: "FAQ – The Million Pixel Wall",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQ | The Million Pixel Wall",
        description: "Clear answers to your pixel-related questions.",
        images: ["https://the-million-pixel-wall.com/og-faq.jpg"],
    },
  };
  

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
