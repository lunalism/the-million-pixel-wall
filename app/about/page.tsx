// app/about/page.tsx
import HeroSection from '@/components/HeroSection'

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      {/* ✅ 전체 배경색 처리 */}
      <div className="bg-neutral-800 min-h-screen text-white">
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-6">About The Million Pixel Wall</h1>
            <p className="mb-4 text-white/80 leading-relaxed">
            The Million Pixel Wall is a modern homage to the legendary Million Dollar Homepage (2005),
            designed to celebrate creativity, nostalgia, and the power of visual identity.
            </p>
            <p className="mb-4 text-white/80 leading-relaxed">
            Every block you purchase on this wall becomes part of digital history—linked, owned,
            and proudly displayed for the world to see. Customize it with your image, message, and claim your space on the grid.
            </p>
            <p className="mb-4 text-white/80 leading-relaxed">
            This project supports multilingual visitors, pixel ownership transparency, and a minimal-yet-modern experience.
            </p>
            <p className="text-white/60 text-sm italic">
            Built with ❤️ by Chris and GPT — 20 years after the original.
            </p>
        </main>
      </div>
    </>
  )
}
