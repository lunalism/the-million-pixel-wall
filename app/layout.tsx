import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Million Pixel Wall – Your Pixel, Your Legacy",
  description: "Buy a pixel on the wall and leave your mark forever. A collaborative digital mural where every pixel tells a story.",
  openGraph: {
    title: "The Million Pixel Wall",
    description: "A collaborative digital mural. Own a piece of the wall.",
    url: "https://themillionpixelwall.com", // 실제 도메인으로 교체
    siteName: "The Million Pixel Wall",
    images: [
      {
        url: "/og-image.png", // public 폴더 내 og 이미지 추가 필요
        width: 1200,
        height: 630,
        alt: "The Million Pixel Wall Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Million Pixel Wall",
    description: "Leave your pixel. Make history.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
