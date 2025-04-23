// components/PixelBackground.tsx

/**
 * PixelBackground
 * Hero 영역에 반투명 픽셀들을 랜덤하게 배치하여
 * 디지털 느낌의 배경을 자연스럽게 생성합니다.
 */

export default function PixelBackground() {
    const pixels = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.floor(Math.random() * 16) + 4, // 4 ~ 20px
      opacity: Math.random() * 0.1 + 0.05,
    }))
  
    return (
      <div className="absolute inset-0">
        {pixels.map((p, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-sm"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    )
  }
  