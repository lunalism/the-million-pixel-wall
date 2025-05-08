// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "The Million Pixel Wall – Your Pixel, Your Legacy",
  description: "Buy a pixel on the wall and leave your mark forever. A collaborative digital mural where every pixel tells a story.",
  // ...생략
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
