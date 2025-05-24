// components/homepage/PixelGrid.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { supabase } from "@/lib/supabaseClient";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";
import { TooltipProvider } from "@/components/ui/tooltip";

const GRID_SIZE = 1000;
const PIXEL_SIZE = 15;

interface PixelData {
  id: string;
  x: number;
  y: number;
  name: string;
  message: string;
  image_url: string;
  created_at: string;
  width?: number;
  height?: number;
}

export function PixelGrid() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedPixels, setPurchasedPixels] = useState<PixelData[]>([]);

  // ✅ Supabase에서 구매된 픽셀 로드
  useEffect(() => {
    const fetchPurchasedPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");
      if (!error && data) setPurchasedPixels(data);
    };

    fetchPurchasedPixels();
    const interval = setInterval(fetchPurchasedPixels, 30000);
    return () => clearInterval(interval);
  }, []);

  // ✅ 픽셀 클릭 → 구매 모달 열기
  const handlePixelClick = (x: number, y: number) => {
    // 대표 픽셀 범위 안에 포함되어 있으면 클릭 차단
    const isCovered = purchasedPixels.some((p) => {
      const w = p.width || 1;
      const h = p.height || 1;
      return x >= p.x && x < p.x + w && y >= p.y && y < p.y + h;
    });
    if (isCovered) return;

    setSelectedPixel({ x, y });
    setIsModalOpen(true);
  };

  // ✅ 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPixel(null);
  };

  // ✅ 구매 후 상태 반영
  const handlePixelPurchase = (newPixels: PixelData[]) => {
    setPurchasedPixels((prev) => [...prev, ...newPixels]);
  };

  // ✅ 가상화 설정
  const rowVirtualizer = useVirtualizer({
    count: GRID_SIZE,
    getScrollElement: () => parentRef.current,
    estimateSize: () => PIXEL_SIZE,
    overscan: 10,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: GRID_SIZE,
    getScrollElement: () => parentRef.current,
    estimateSize: () => PIXEL_SIZE,
    overscan: 10,
  });

  return (
    <>
      <div className="w-full flex justify-center overflow-auto py-10">
        <div ref={parentRef} className="relative h-[600px] w-[1000px] overflow-auto border rounded shadow-md">
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: columnVirtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            <TooltipProvider>
              {purchasedPixels.map((pixel) => {
                const key = `${pixel.x}-${pixel.y}`;
                const w = pixel.width || 1;
                const h = pixel.height || 1;
                return (
                  <div
                    key={key}
                    title={`${pixel.name}: ${pixel.message}`}
                    className="absolute border border-gray-200 cursor-pointer"
                    style={{
                      width: w * PIXEL_SIZE,
                      height: h * PIXEL_SIZE,
                      left: pixel.x * PIXEL_SIZE,
                      top: pixel.y * PIXEL_SIZE,
                      backgroundImage: `url(${pixel.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                );
              })}

              {rowVirtualizer.getVirtualItems().map((row) =>
                columnVirtualizer.getVirtualItems().map((column) => {
                  const x = column.index;
                  const y = row.index;
                  const pixelId = `${x}-${y}`;

                  // 이미 구매된 범위에 속한 픽셀은 렌더링 생략
                  const isCovered = purchasedPixels.some((p) => {
                    const w = p.width || 1;
                    const h = p.height || 1;
                    return x >= p.x && x < p.x + w && y >= p.y && y < p.y + h;
                  });
                  if (isCovered) return null;

                  return (
                    <div
                      key={pixelId}
                      title={`(${x}, ${y})`}
                      className="absolute bg-white hover:bg-gray-200 border border-gray-200 cursor-pointer"
                      style={{
                        width: PIXEL_SIZE,
                        height: PIXEL_SIZE,
                        transform: `translateX(${column.start}px) translateY(${row.start}px)`
                      }}
                      onClick={() => handlePixelClick(x, y)}
                    />
                  );
                })
              )}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* 구매 모달 */}
      <PixelPurchaseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedPixel={selectedPixel}
        onPurchaseSuccess={handlePixelPurchase}
      />
    </>
  );
}
