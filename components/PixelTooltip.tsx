// components/PixelTooltip.tsx

/**
 * PixelTooltip
 * 픽셀 위에 마우스를 올렸을 때 나타나는 구매 정보 말풍선입니다.
 * 구매자의 이름, 메시지, 구매일자 정보를 보여주며,
 * 포지션은 절대 위치로 지정되어 픽셀 위치에 맞춰 유동적으로 표시됩니다.
 * 
 * ✅ 이 컴포넌트는 향후 커스터마이징 가능한 영역으로
 * 각 사용자에게 자신만의 디지털 명함처럼 보일 수 있도록 디자인할 수 있습니다.
 */

type PixelTooltipProps = {
    name: string
    message: string
    date: string // yyyy-mm-dd 형식 추천
    position: { x: number; y: number } // Tooltip 위치 (px 단위)
  }
  
  export default function PixelTooltip({
    name,
    message,
    date,
    position,
  }: PixelTooltipProps) {
    return (
      <div
        className="absolute z-50 w-64 bg-white text-black text-sm shadow-lg rounded-lg p-4 border border-neutral-200"
        style={{
          top: position.y + 12, // 살짝 아래로
          left: position.x + 12, // 살짝 오른쪽으로
        }}
      >
        <div className="font-semibold text-base mb-1">{name}</div>
        <div className="text-neutral-700 mb-2">{message}</div>
        <div className="text-neutral-400 text-xs">Purchased on {date}</div>
      </div>
    )
  }
  