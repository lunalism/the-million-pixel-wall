'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="w-full h-[65vh] pt-24 flex items-start justify-center bg-white text-black px-6">
      <div className="max-w-3xl text-center">
        {/* 타이틀 애니메이션 */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          THE MILLION PIXEL WALL
        </motion.h1>

        {/* 서브텍스트 애니메이션 */}
        <motion.p
          className="mt-4 text-base md:text-xl text-black/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Leave your brand in digital history.
        </motion.p>

        {/* CTA 버튼 애니메이션 */}
        <motion.button
          className="mt-8 px-6 py-3 bg-black text-white rounded-2xl hover:bg-black/80 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          BUY PIXELS
        </motion.button>
      </div>
    </section>
  );
}
