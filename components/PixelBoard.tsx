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

  return (
    <div
      className="relative w-full h-[800px]"
      style={{ backgroundColor: "#D8A39D" }} // 팬톤 2025 색상
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
    >
      {/* 🖼 이미지 오버레이 (픽셀 위에 덮임) */}
      <PixelImageLayer pixels={pixels} />

      {/* 📦 픽셀 영역 블록 (투명 배경 or 테두리만) */}
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute border border-white hover:border-blue-500 transition-all duration-150"
          style={{
            left: pixel.x * PIXEL_SIZE,
            top: pixel.y * PIXEL_SIZE,
            width: pixel.width * PIXEL_SIZE,
            height: pixel.height * PIXEL_SIZE,
            backgroundColor: "transparent",
          }}
          onMouseEnter={() => setHoveredPixel(pixel)}
          onMouseLeave={() => setHoveredPixel(null)}
        />
      ))}

      {/* 🧩 툴팁 */}
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
