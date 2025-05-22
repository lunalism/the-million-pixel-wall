// components/homepage/PixelGrid.tsx

"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";
import { supabase } from "@/lib/supabaseClient";

// 픽셀 사이즈 설정
const GRID_SIZE = 1000;
const PIXEL_SIZE = 15;

interface PixelData {
  id: string;
  x: number;
  y: number;
  image_url: string;
}

export function PixelGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedPixels, setPurchasedPixels] = useState<PixelData[]>([]);

  // 🔄 Supabase에서 구매된 픽셀 불러오기
  useEffect(() => {
    const fetchPurchasedPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");
      if (!error && data) setPurchasedPixels(data);
    };

    fetchPurchasedPixels();
  }, []);

  // 픽셀 구매 완료 후 상태에 추가
  const handlePixelPurchase = (newPixel: PixelData) => {
    setPurchasedPixels((prev) => [...prev, newPixel]);
  };

  const handlePixelClick = (x: number, y: number) => {
    const alreadyPurchased = purchasedPixels.some((p) => p.x === x && p.y === y);
    if (alreadyPurchased) return; // 🚫 이미 구매된 픽셀은 클릭 방지

    setSelectedPixel({ x, y });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPixel(null);
  };

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
        <div
          ref={parentRef}
          className="relative h-[600px] w-[1000px] overflow-auto border rounded shadow-md"
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: columnVirtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((row) =>
              columnVirtualizer.getVirtualItems().map((column) => {
                const x = column.index;
                const y = row.index;
                const pixelId = `${x}-${y}`;
                const purchased = purchasedPixels.find((p) => p.x === x && p.y === y);
                const imageUrl = purchased?.image_url;

                return (
                  <div
                    key={pixelId}
                    title={`(${x}, ${y})`}
                    className={`absolute border ${
                      purchased ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"
                    }`}
                    style={{
                      width: PIXEL_SIZE,
                      height: PIXEL_SIZE,
                      transform: `translateX(${column.start}px) translateY(${row.start}px)`,
                    }}
                    onClick={() => handlePixelClick(x, y)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="pixel"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <PixelPurchaseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedPixel={selectedPixel}
        onPurchaseSuccess={handlePixelPurchase} // ✅ 저장 완료 시 콜백 전달
      />
    </>
  );
}
