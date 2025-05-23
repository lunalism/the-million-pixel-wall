// components/homepage/pixel/PurchasedPixel.tsx

import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ✅ 컴포넌트 props 정의
export interface PurchasedPixelProps {
  x: number;
  y: number;
  size: number;
  imageUrl: string;
  name: string;
  message: string;
  left: number;
  top: number;
  onClick?: () => void; // ✅ 클릭 핸들러 (선택적)
}

export function PurchasedPixel({ x, y, size, imageUrl, name, message, left, top, onClick }: PurchasedPixelProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute"
          style={{
            width: size,
            height: size,
            transform: `translateX(${left}px) translateY(${top}px)`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
          }}
          title={`${name}: ${message}`}
          onClick={onClick} // ✅ 클릭 시 상위에서 전달받은 동작 수행 (예: 모달 열기)
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {name}: {message}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
