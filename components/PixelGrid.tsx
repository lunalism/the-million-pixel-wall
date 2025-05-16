'use client';

import React from 'react';

// 픽셀 총 개수 정의 (100 x 100 = 10,000픽셀)
const GRID_SIZE = 100;

export default function PixelGrid() {
  return (
    <section className="w-full py-16 bg-white flex justify-center">
      <div
        className="grid gap-[1px] bg-gray-200"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '1000px', // 픽셀 보드 전체 너비
          maxWidth: '100%',
        }}
      >
        {/* 픽셀 하나하나 렌더링 */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
          <div
            key={idx}
            className="w-[10px] h-[10px] bg-gray-100 hover:bg-gray-300 transition"
            title={`Pixel ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
