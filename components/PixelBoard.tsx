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
    // 전체 화면 - 배경색 & 가운데 정렬
    <div className="w-full min-h-screen bg-neutral-800 flex justify-center items-start py-10">
      {/* 픽셀 보드 컨테이너 */}
      <div
        className="relative"
        style={{
          width: LOGICAL_WIDTH,
          height: LOGICAL_HEIGHT,
          backgroundColor: "#D68A59", // Canyon Clay
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }}
      >
        {/* 🖼 이미지 오버레이 */}
        <PixelImageLayer pixels={pixels} />

        {/* 🧱 전체 빈 픽셀 그리드 */}
        {[...Array(rows)].flatMap((_, y) =>
          [...Array(columns)].map((_, x) => {
            const pixelX = x * PIXEL_SIZE
            const pixelY = y * PIXEL_SIZE

            const purchased = pixels.find(
              (p) =>
                x >= p.x &&
                x < p.x + p.width &&
                y >= p.y &&
                y < p.y + p.height
            )

            if (purchased) return null

            return (
              <div
                key={`empty-${x}-${y}`}
                className="absolute border border-white/10 hover:border-blue-400 cursor-pointer transition-colors"
                style={{
                  left: pixelX,
                  top: pixelY,
                  width: PIXEL_SIZE,
                  height: PIXEL_SIZE,
                }}
                onClick={() => {
                  // 💬 구매 폼 호출
                  console.log(`🛒 구매 폼 열기 at (${x}, ${y})`)
                }}
              />
            )
          })
        )}

        {/* 💬 툴팁 */}
        {hoveredPixel && (
          <PixelTooltip
            name={hoveredPixel.name}
            message={hoveredPixel.message}
            date={hoveredPixel.created_at.split("T")[0]}
            position={mousePos}
          />
        )}
      </div>
    </div>
  )
}
