// components/HeroSection.tsx

/**
 * HeroSection
 * 홈페이지 상단에 표시되는 핵심 메시지 영역입니다.
 * - 프로젝트 명 (THE MILLION PIXEL WALL)
 * - 서브 타이틀
 * - 'Notify Me' 버튼 (이메일 알림 또는 대기 기능 연결 예정)
 * 
 * 다른 사람들이 자신의 프로젝트로 리메이크할 경우,
 * 이 영역은 가장 첫 인상을 주는 부분이므로 강한 브랜드 톤을 담는 것이 중요합니다.
 */

'use client'

import PixelBackground from "@/components/PixelBackground";

export default function HeroSection() {
    return (
      <section className="relative w-full bg-neutral-900 text-white py-20 px-6 text-center overflow-hidden">
        {/* 랜덤 픽셀 배경 레이어 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <PixelBackground />
        </div>
        
        {/* 메인 타이틀 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          THE MILLION PIXEL WALL
        </h1>
  
        {/* 서브 타이틀 */}
        <p className="mt-4 text-lg sm:text-xl text-neutral-400">
          Claim your pixel, leave your mark.
        </p>
  
        {/* CTA 버튼 */}
        <button
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md text-white font-medium text-sm sm:text-base shadow"
          onClick={() => alert("📧 알림 신청 기능은 추후 연결됩니다.")}
        >
          Notify Me
        </button>
      </section>
    );
  }
  