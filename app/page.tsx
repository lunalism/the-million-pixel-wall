// app/page.tsx
"use client";

import { HeroSection } from "@/components/homepage/HeroSection";
import { PixelGrid } from "@/components/homepage/PixelGrid";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Footer } from "@/components/common/Footer";
import { TopNav } from "@/components/common/TopNav";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const metadata = {
  title: "The Million Pixel Wall – Buy Pixels, Make History",
  description: "Own a piece of internet history by buying pixels on the Million Pixel Wall. Customize your spot with images and messages.",
  keywords: ["million pixel wall", "pixel purchase", "internet history", "buy pixels", "digital billboard"],
  openGraph: {
    title: "The Million Pixel Wall – Buy Pixels, Make History",
    description: "Customize your own pixel on the wall and be part of a digital legacy.",
    url: "https://the-million-pixel-wall.com/",
    siteName: "The Million Pixel Wall",
    images: [
      {
        url: "https://the-million-pixel-wall.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "The Million Pixel Wall",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Million Pixel Wall – Buy Pixels, Make History",
    description: "Be part of something big. Buy your pixels today.",
    images: ["https://the-million-pixel-wall.com/og-home.jpg"],
  },
};


export default function HomePage() {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <div className="flex flex-col min-h-screen">
        <TopNav />
        <HeroSection />
        <main className="flex-1 px-4 md:px-12 lg:px-20">
          <PixelGrid />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}
