// components/homepage/PixelGrid.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { supabase } from "@/lib/supabaseClient";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";
import { PurchasedPixelModal } from "@/components/pixels/PurchasedPixelModal";
import { TooltipProvider } from "@/components/ui/tooltip";

const GRID_SIZE = 1000;
const PIXEL_SIZE = 10;

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

  const [purchasedPixels, setPurchasedPixels] = useState<PixelData[]>([]);
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedPurchasedPixel, setSelectedPurchasedPixel] = useState<PixelData | null>(null);
  const [isPurchasedModalOpen, setIsPurchasedModalOpen] = useState(false);

  // 🔄 Supabase에서 픽셀 데이터 로드
  useEffect(() => {
    const fetchPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");
      if (!error && data) setPurchasedPixels(data);
    };
    fetchPixels();
    const interval = setInterval(fetchPixels, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🖱️ 빈 픽셀 클릭 → 구매 모달
  const handlePixelClick = (x: number, y: number) => {
    const isCovered = purchasedPixels.some((p) => {
      const w = p.width ?? 1;
      const h = p.height ?? 1;
      return x >= p.x && x < p.x + w && y >= p.y && y < p.y + h;
    });
    if (isCovered) return;

    setSelectedPixel({ x, y });
    setIsModalOpen(true);
  };

  // 🖱️ 구매된 픽셀 클릭 → 신고 모달
  const handlePurchasedPixelClick = (pixel: PixelData) => {
    setSelectedPurchasedPixel(pixel);
    setIsPurchasedModalOpen(true);
  };

  // ✅ 구매 완료 시 상태에 반영
  const handlePixelPurchase = (newPixels: PixelData[]) => {
    setPurchasedPixels((prev) => [...prev, ...newPixels]);
  };

  const handleCloseModal = () => {
    setSelectedPixel(null);
    setIsModalOpen(false);
  };

  const handleClosePurchasedModal = () => {
    setSelectedPurchasedPixel(null);
    setIsPurchasedModalOpen(false);
  };

  // 🎯 가상 스크롤 설정
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
      {/* 🖼️ 픽셀 그리드 */}
      <div className="w-full flex justify-center overflow-auto py-10">
        <div
          ref={parentRef}
          className="relative h-[800px] w-[1200px] overflow-auto border rounded shadow-md"
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: columnVirtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            <TooltipProvider>
              {/* ✅ 구매된 픽셀 표시 */}
              {purchasedPixels.map((pixel) => {
                const { x, y, width = 1, height = 1 } = pixel;
                return (
                  <div
                    key={`${x}-${y}`}
                    title={`${pixel.name}: ${pixel.message}`}
                    className="absolute bg-white hover:bg-gray-200 outline outline-[0.2px] outline-gray-100"
                    style={{
                      width: width * PIXEL_SIZE,
                      height: height * PIXEL_SIZE,
                      left: x * PIXEL_SIZE,
                      top: y * PIXEL_SIZE,
                      backgroundImage: `url(${pixel.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handlePurchasedPixelClick(pixel)}
                  />
                );
              })}

              {/* 🟩 빈 픽셀 표시 */}
              {rowVirtualizer.getVirtualItems().map((row) =>
                columnVirtualizer.getVirtualItems().map((column) => {
                  const x = column.index;
                  const y = row.index;
                  const key = `${x}-${y}`;

                  const isCovered = purchasedPixels.some((p) => {
                    const w = p.width ?? 1;
                    const h = p.height ?? 1;
                    return x >= p.x && x < p.x + w && y >= p.y && y < p.y + h;
                  });
                  if (isCovered) return null;

                  return (
                    <div
                      key={key}
                      title={`(${x}, ${y})`}
                      className="absolute bg-white hover:bg-gray-200 border border-gray-200 cursor-pointer"
                      style={{
                        width: PIXEL_SIZE,
                        height: PIXEL_SIZE,
                        transform: `translateX(${column.start}px) translateY(${row.start}px)`,
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

      {/* 💸 구매 모달 */}
      <PixelPurchaseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedPixel={selectedPixel}
        onPurchaseSuccess={handlePixelPurchase}
      />

      {/* 🚨 신고 모달 */}
      {selectedPurchasedPixel && (
        <PurchasedPixelModal
          open={isPurchasedModalOpen}
          onClose={handleClosePurchasedModal}
          pixel={selectedPurchasedPixel}
        />
      )}
    </>
  );
}
