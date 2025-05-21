// components/homepage/PixelGrid.tsx

"use client";

import React, { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";

const GRID_SIZE = 1000;
const PIXEL_SIZE = 15;

export function PixelGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rowVirtualizer = useVirtualizer({ count: GRID_SIZE, getScrollElement: () => parentRef.current, estimateSize: () => PIXEL_SIZE, overscan: 10 });
  const columnVirtualizer = useVirtualizer({ horizontal: true, count: GRID_SIZE, getScrollElement: () => parentRef.current, estimateSize: () => PIXEL_SIZE, overscan: 10 });

  const handlePixelClick = (x: number, y: number) => {
    setSelectedPixel({ x, y });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPixel(null);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div ref={parentRef} className="relative h-[600px] w-[1000px] overflow-auto border rounded">
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
          </div>
        </div>
      </div>

      <PixelPurchaseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedPixel={selectedPixel}
      />
    </>
  );
}
