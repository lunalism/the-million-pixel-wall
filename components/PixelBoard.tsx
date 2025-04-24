// components/PixelBoard.tsx

/**
 * PixelBoard
 * Supabase에서 불러온 픽셀 정보를 기반으로
 * 이미지 오버레이 및 툴팁을 표시하는 메인 보드입니다.
 */

'use client'

import { useEffect, useState } from "react"
import { fetchPixels, loadPixels, Pixel } from "@/lib/fetchPixels"
import PixelImageLayer from "./PixelImageLayer"
import PixelTooltip from "./PixelTooltip"
import BuyPixelFormModal from "./BuyPixelFormModal"

// 캔버스의 논리적 너비 및 높이 (픽셀 단위)
const LOGICAL_WIDTH = 1500
const LOGICAL_HEIGHT = 1000
const PIXEL_SIZE = 10 // 화면상 한 픽셀의 크기 (10px)

export default function PixelBoard() {
  // Supabase에서 가져온 구매된 픽셀 데이터
  const [pixels, setPixels] = useState<Pixel[]>([])

  // 마우스 오버 중인 픽셀 (툴팁 표시용)
  const [hoveredPixel, setHoveredPixel] = useState<Pixel | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 모달 열기용 상태 (선택한 픽셀 위치 및 열림 여부)
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Supabase에서 픽셀 데이터 불러오기
  useEffect(() => {
    async function load() {
      const data = await fetchPixels()
      setPixels(data)
    }
    load()
  }, [])

  useEffect(() => {
    loadPixels(setPixels)
  }, [])

  const columns = LOGICAL_WIDTH / PIXEL_SIZE
  const rows = LOGICAL_HEIGHT / PIXEL_SIZE

  return (
    // 전체 페이지 영역: 가운데 정렬된 픽셀 보드
    <div className="w-full bg-neutral-800 flex justify-center items-start pt-0 pb-10">
      <div
        className="relative"
        style={{
          width: LOGICAL_WIDTH,
          height: LOGICAL_HEIGHT,
          backgroundColor: "#D68A59", // 픽셀 보드 배경색 (Canyon Clay)
        }}
        // 마우스 위치 추적 (툴팁 위치 계산용)
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }}
      >
        {/* 이미지 오버레이: 구매된 픽셀에 이미지 렌더 */}
        <PixelImageLayer pixels={pixels} />

        {/* 빈 픽셀 렌더링: 구매되지 않은 위치 표시 */}
        {[...Array(rows)].flatMap((_, y) =>
          [...Array(columns)].map((_, x) => {
            const pixelX = x * PIXEL_SIZE
            const pixelY = y * PIXEL_SIZE

            // 해당 위치가 구매된 픽셀인지 확인
            const purchased = pixels.find(
              (p) =>
                x >= p.x &&
                x < p.x + p.width &&
                y >= p.y &&
                y < p.y + p.height
            )

            if (purchased) return null // 구매된 경우 빈 박스를 렌더하지 않음

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
                // 빈 픽셀 클릭 시 구매 폼 열기
                onClick={() => {
                  setSelectedPixel({ x, y })
                  setIsModalOpen(true)
                }}
              />
            )
          })
        )}

        {/* 툴팁: 마우스 오버된 픽셀 정보 표시 */}
        {hoveredPixel && (
          <PixelTooltip
            name={hoveredPixel.name}
            message={hoveredPixel.message}
            date={hoveredPixel.created_at.split("T")[0]}
            position={mousePos}
          />
        )}

        {/* 구매 폼 모달 렌더링 */}
        {selectedPixel && (
          <BuyPixelFormModal
            x={selectedPixel.x}
            y={selectedPixel.y}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPixelSaved={() => loadPixels(setPixels)} // ✅ 저장 후 호출!
          />
        )}
      </div>
    </div>
  )
}
