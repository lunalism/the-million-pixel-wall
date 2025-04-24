import FeatureCard from "./FeatureCard"

/**
 * FeatureSection
 * 홈 화면 하단의 안내 섹션입니다.
 * 4개의 카드로 구성되어 프로젝트의 철학과 기능을 소개합니다.
 */
export default function FeatureSection() {
  return (
    // 전체 섹션 영역: 배경색과 여백 설정
    <section className="w-full bg-neutral-800 text-white pt-8 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 4단 카드 레이아웃: 반응형 대응 (1→2→4단) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 카드 1: Global Wall */}
          <FeatureCard
            emoji="🌍"
            title="Global Wall"
            description="A digital mural made with people around the world"
          />
          {/* 카드 2: Your Pixel */}
          <FeatureCard
            emoji="🎨"
            title="Your Pixel"
            description="Each pixel carries your unique story"
          />
          {/* 카드 3: Easy Purchase */}
          <FeatureCard
            emoji="🛒"
            title="Easy Purchase"
            description="Click the spot → Upload image → Done!"
          />
          {/* 카드 4: Forever Stored */}
          <FeatureCard
            emoji="🧱"
            title="Forever Stored"
            description="Your pixel is permanently preserved on the wall"
          />
        </div>
      </div>
    </section>
  )
}