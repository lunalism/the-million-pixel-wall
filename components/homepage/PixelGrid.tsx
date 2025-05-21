// components/homepage/PixelGrid.tsx

"use client";

import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const GRID_SIZE = 1000;
const PIXEL_SIZE = 10; // px

export function PixelGrid() {
  const parentRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={parentRef}
      className="relative h-[1000px] w-[1200px] overflow-auto border rounded"
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
            return (
              <div
                key={pixelId}
                title={`(${x}, ${y})`}
                className="absolute bg-white hover:bg-gray-200 border border-gray-200"
                style={{
                  width: PIXEL_SIZE,
                  height: PIXEL_SIZE,
                  transform: `translateX(${column.start}px) translateY(${row.start}px)`,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
