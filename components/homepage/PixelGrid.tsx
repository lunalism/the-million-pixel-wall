// components/homepage/PixelGrid.tsx

"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { supabase } from "@/lib/supabaseClient";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";
import { PurchasedPixel } from "@/components/homepage/pixel/PurchasedPixel";
import { PurchasedPixelModal } from "@/components/pixels/PurchasedPixelModal";
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
}

export function PixelGrid() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedPixels, setPurchasedPixels] = useState<PixelData[]>([]);
  const [selectedPurchasedPixel, setSelectedPurchasedPixel] = useState<PixelData | null>(null);

  // ✅ Supabase에서 기존 구매된 픽셀 데이터 로드
  useEffect(() => {
    const fetchPurchasedPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");
      if (!error && data) setPurchasedPixels(data);
    };

    fetchPurchasedPixels();

    const interval = setInterval(fetchPurchasedPixels, 30000); // 30초 polling
    return () => clearInterval(interval);
  }, []);

  // ✅ 픽셀 클릭 핸들러
  const handlePixelClick = (x: number, y: number) => {
    const purchased = purchasedPixels.find((p) => p.x === x && p.y === y);
    if (purchased) {
      // 이미 구매된 픽셀 → 상세 모달
      setSelectedPurchasedPixel(purchased);
    } else {
      // 미구매 픽셀 → 구매 모달
      setSelectedPixel({ x, y });
      setIsModalOpen(true);
    }
  };

  // ✅ 구매 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPixel(null);
  };

  // ✅ 구매 후 상태 반영
  const handlePixelPurchase = (newPixel: PixelData) => {
    setPurchasedPixels((prev) => [...prev, newPixel]);
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
            <TooltipProvider>
              {rowVirtualizer.getVirtualItems().map((row) =>
                columnVirtualizer.getVirtualItems().map((column) => {
                  const x = column.index;
                  const y = row.index;
                  const pixelId = `${x}-${y}`;

                  const purchased = purchasedPixels.find((p) => p.x === x && p.y === y);

                  if (purchased) {
                    return (
                      <PurchasedPixel
                        key={pixelId}
                        x={x}
                        y={y}
                        size={PIXEL_SIZE}
                        imageUrl={purchased.image_url}
                        name={purchased.name}
                        message={purchased.message}
                        left={column.start}
                        top={row.start}
                        onClick={() => setSelectedPurchasedPixel(purchased)}
                      />
                    );
                  }

                  return (
                    <div
                      key={pixelId}
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

      {/* 미구매 픽셀 구매 모달 */}
      <PixelPurchaseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedPixel={selectedPixel}
        onPurchaseSuccess={handlePixelPurchase}
      />

      {/* 이미 구매된 픽셀 상세 모달 */}
      {selectedPurchasedPixel && (
        <PurchasedPixelModal
          open={true}
          onClose={() => setSelectedPurchasedPixel(null)}
          pixel={selectedPurchasedPixel}
        />
      )}
    </>
  );
}