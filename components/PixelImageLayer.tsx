// components/PixelImageLayer.tsx

/**
 * PixelImageLayer
 * 픽셀 보드 위에 이미지들을 절대 위치로 덮어주는 컴포넌트입니다.
 * 각 픽셀 영역은 Supabase에서 불러온 image_url을 사용하며,
 * 위치와 크기는 x, y, width, height 값으로 계산됩니다.
 */

import { Pixel } from "@/lib/fetchPixels";

const PIXEL_SIZE = 10;

type Props = {
  pixels: Pixel[];
};

export default function PixelImageLayer({ pixels }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pixels
        .filter((p) => p.image_url) // 이미지가 있는 픽셀만
        .map((p) => (
          <img
            key={p.id}
            src={p.image_url}
            alt={p.name}
            className="absolute object-cover rounded-[2px]"
            style={{
              left: p.x * PIXEL_SIZE,
              top: p.y * PIXEL_SIZE,
              width: p.width * PIXEL_SIZE,
              height: p.height * PIXEL_SIZE,
            }}
          />
        ))}
    </div>
  );
}
