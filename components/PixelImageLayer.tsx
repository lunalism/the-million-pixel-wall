'use client'

import { Pixel } from "@/lib/fetchPixels"

interface Props {
  pixels: Pixel[]
}

// 픽셀 하나당 실제 화면에 그릴 크기 (px)
const PIXEL_SIZE = 10

/**
 * PixelImageLayer
 * 구매된 픽셀의 이미지들을 실제 캔버스에 렌더링하는 컴포넌트입니다.
 * 각 픽셀 데이터에는 x, y 좌표와 width, height, image_url이 포함되어 있어야 합니다.
 */
export default function PixelImageLayer({ pixels }: Props) {
  return (
    <>
      {/* 전체 픽셀 데이터 순회하며 이미지 렌더링 */}
      {pixels.map((pixel) => {
        // image_url이 없는 경우 렌더링하지 않음
        if (!pixel.image_url) return null

        return (
          <img
            key={pixel.id}
            src={pixel.image_url}
            alt={pixel.name || "pixel"}
            className="absolute object-cover object-center rounded-sm"
            style={{
              left: pixel.x * PIXEL_SIZE,
              top: pixel.y * PIXEL_SIZE,
              width: pixel.width * PIXEL_SIZE,
              height: pixel.height * PIXEL_SIZE,
              zIndex: 10,
            }}
            onError={(e) => {
              console.warn("❌ 이미지 로딩 실패:", pixel.image_url)
              e.currentTarget.style.display = "none"
            }}
          />
        )
      })}
    </>
  )
}
