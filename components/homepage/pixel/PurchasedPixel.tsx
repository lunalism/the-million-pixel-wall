// components/homepage/pixel/PurchasedPixel.tsx

"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface PurchasedPixelProps {
  x: number;
  y: number;
  size: number;
  imageUrl: string;
  name: string;
  message: string;
  left: number;
  top: number;
}

export function PurchasedPixel({
  x,
  y,
  size,
  imageUrl,
  name,
  message,
  left,
  top,
}: PurchasedPixelProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute border bg-gray-300 cursor-not-allowed"
          style={{
            width: size,
            height: size,
            transform: `translateX(${left}px) translateY(${top}px)`,
          }}
        >
          <img
            src={imageUrl}
            alt={`Pixel (${x}, ${y})`}
            className="w-full h-full object-cover"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
