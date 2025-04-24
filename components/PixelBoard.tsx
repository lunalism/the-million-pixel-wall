// components/PixelBoard.tsx

/**
 * PixelBoard
 * Supabase에서 불러온 픽셀 정보를 기반으로
 * 이미지 오버레이 및 툴팁을 표시하는 메인 보드입니다.
 */

'use client'

import { useEffect, useState } from "react"
import { fetchPixels, Pixel } from "@/lib/fetchPixels"
import PixelTooltip from "./PixelTooltip"
import PixelImageLayer from "./PixelImageLayer"

const LOGICAL_WIDTH = 1500
const LOGICAL_HEIGHT = 1000
const PIXEL_SIZE = 10 // px

export default function PixelBoard() {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [hoveredPixel, setHoveredPixel] = useState<Pixel | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Supabase에서 픽셀 데이터 가져오기
  useEffect(() => {
    async function loadPixels() {
      const data = await fetchPixels()
      console.log("📦 픽셀 데이터:", data)
      setPixels(data)
    }
    loadPixels()
  }, [])

  // 전체 논리 픽셀 범위를 10px 단위로 나눠서 그리드 생성
  const columns = LOGICAL_WIDTH / PIXEL_SIZE
  const rows = LOGICAL_HEIGHT / PIXEL_SIZE

  return (
    <div
      className="relative w-full overflow-auto"
      style={{
        width: LOGICAL_WIDTH,
        height: LOGICAL_HEIGHT,
        backgroundColor: "#D68A59", // Canyon Clay 배경
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
    >
      {/* 🖼️ 구매된 픽셀 위에 이미지 오버레이 */}
      <PixelImageLayer pixels={pixels} />

      {/* 🧱 전체 그리드 렌더링 (빈 픽셀 표시) */}
      {[...Array(rows)].flatMap((_, y) =>
        [...Array(columns)].map((_, x) => {
          const pixelX = x * PIXEL_SIZE
          const pixelY = y * PIXEL_SIZE

          // 해당 픽셀이 구매되었는지 확인
          const purchased = pixels.find(
            (p) =>
              x >= p.x &&
              x < p.x + p.width &&
              y >= p.y &&
              y < p.y + p.height
          )

          // 구매된 픽셀은 이미지로 표시되므로 여기선 렌더 안 함
          if (purchased) return null

          return (
            <div
              key={`empty-${x}-${y}`}
              className="absolute border border-white/10 hover:border-blue-400 transition-colors cursor-pointer"
              style={{
                left: pixelX,
                top: pixelY,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
              }}
              onClick={() => {
                // 💬 향후 구매 폼 열기 함수 연결 예정
                console.log(`🛒 Empty pixel clicked at [${x}, ${y}]`)
              }}
            />
          )
        })
      )}

      {/* 💬 툴팁 (구매된 픽셀 hover 시 표시) */}
      {hoveredPixel && (
        <PixelTooltip
          name={hoveredPixel.name}
          message={hoveredPixel.message}
          date={hoveredPixel.created_at.split("T")[0]}
          position={mousePos}
        />
      )}
    </div>
  )
}
