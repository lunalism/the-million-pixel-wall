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

import { useEffect, useState } from "react"
import { fetchPixels, Pixel } from "@/lib/fetchPixels";
import PixelTooltip from "./PixelTooltip"; // 툴팁 컴포넌트 가져오기

const PIXEL_SIZE = 10 // px

export default function PixelBoard() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [hoveredPixel, setHoveredPixel] = useState<Pixel | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 🚀 Supabase에서 픽셀 데이터 가져오기
  useEffect(() => {
    async function loadPixels() {
      const data = await fetchPixels();
      setPixels(data);
    }
    loadPixels();
  }, []);

  return (
    <div
      className="relative w-full h-[600px] bg-neutral-900"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      {/* 📦 DB에서 불러온 픽셀 이미지/색 블록 */}
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute bg-white hover:bg-blue-500 transition-all duration-150"
          style={{
            left: pixel.x * PIXEL_SIZE,
            top: pixel.y * PIXEL_SIZE,
            width: pixel.width * PIXEL_SIZE,
            height: pixel.height * PIXEL_SIZE,
            opacity: 0.9,
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
  );
}
