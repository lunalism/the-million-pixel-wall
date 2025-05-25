// app/page.tsx
"use client";

import { HeroSection } from "@/components/homepage/HeroSection";
import { PixelGrid } from "@/components/homepage/PixelGrid";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Footer } from "@/components/common/Footer";
import { TopNav } from "@/components/common/TopNav";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
