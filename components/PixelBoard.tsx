// components/PixelBoard.tsx

/**
 * PixelBoard
 * 픽셀 인터랙션의 핵심 그리드입니다.
 * 현재는 40 x 20 픽셀의 더미 인터랙션 UI만 구성되어 있으며,
 * 추후 Supabase에서 데이터를 불러와서 각각의 픽셀 상태를 동적으로 표시할 예정입니다.
 * 
 * 각 픽셀은 기본 색상으로 표시되며,
 * Hover 시 테두리 강조 / 클릭 시 콘솔에 위치 출력 등의 기능이 있습니다.
 */

'use client'

import { useState } from "react"

const ROWS = 20
const COLS = 40
const PIXEL_SIZE = 10 // px

export default function PixelBoard() {
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null)

  return (
    <div className="flex flex-col items-center py-10">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${PIXEL_SIZE}px)`,
          gap: "2px",
        }}
      >
        {[...Array(ROWS)].flatMap((_, row) =>
          [...Array(COLS)].map((_, col) => {
            const isHovered = hovered?.x === col && hovered?.y === row

            return (
              <div
                key={`${row}-${col}`}
                className={`w-[10px] h-[10px] cursor-pointer transition-all duration-100 ${
                  isHovered ? "bg-blue-500" : "bg-neutral-400"
                }`}
                onMouseEnter={() => setHovered({ x: col, y: row })}
                onMouseLeave={() => setHovered(null)}
                onClick={() => console.log(`🧱 Clicked pixel at [${col}, ${row}]`)}
              />
            )
          })
        )}
      </div>

      {hovered && (
        <div className="mt-4 text-sm text-neutral-500">
          Hovered: <span className="text-white">[{hovered.x}, {hovered.y}]</span>
        </div>
      )}
    </div>
  )
}
