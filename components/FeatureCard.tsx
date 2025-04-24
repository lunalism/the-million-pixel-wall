/**
 * FeatureCard
 * 소개 섹션의 개별 카드 컴포넌트입니다.
 * 이모지, 제목, 설명 텍스트를 전달받아 일관된 레이아웃으로 렌더링합니다.
 */
export default function FeatureCard({
    emoji,
    title,
    description,
  }: {
    emoji: string
    title: string
    description: string
  }) {
    return (
      // 카드 전체 영역: 다크 톤 + 라운딩 + 그림자
      <div className="bg-neutral-900 rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center">
        {/* 이모지 아이콘 */}
        <div className="text-3xl mb-4">{emoji}</div>
  
        {/* 제목 */}
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
  
        {/* 설명 텍스트 */}
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
    )
  }
  