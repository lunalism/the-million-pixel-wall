'use client';

import React from 'react';

const GRID_SIZE = 100;

export default function PixelGrid() {
  return (
    // 섹션 전체: 가운데 정렬 + 여백 조정
    <section className="w-full py-12 bg-white flex items-center justify-center">
      
      {/* 픽셀 그리드 박스: 100x100 그리드 */}
      <div
        className="grid gap-[1px] bg-gray-200"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '1000px', // 고정 너비 (픽셀당 10px x 100)
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
