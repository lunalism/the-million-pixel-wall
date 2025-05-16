'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    // Hero 전체 섹션: 배경 흰색, 화면 너비 전체 사용, 상하 여백 포함
    <section className="w-full min-h-[30vh] py-12 flex items-center justify-center bg-white text-black px-6">
      
      {/* 콘텐츠 래퍼: 최대 너비 제한, 텍스트 중앙 정렬 */}
      <div className="max-w-3xl text-center">

        {/* 메인 타이틀: 애니메이션으로 아래에서 위로 페이드인 */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          THE MILLION PIXEL WALL
        </motion.h1>

        {/* 서브 텍스트: 약간의 딜레이로 순차 등장 */}
        <motion.p
          className="mt-4 text-base md:text-xl text-black/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Leave your brand in digital history.
        </motion.p>

        {/* CTA 버튼: 가장 마지막에 등장 + hover 효과 */}
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
