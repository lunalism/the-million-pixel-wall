'use client';

import React from 'react';

const GRID_SIZE = 100;

export default function PixelGrid() {
  return (
    // 전체 섹션: 중앙 정렬 + 상하 여백
    <section className="w-full py-12 bg-white flex items-center justify-center">
      
      {/* 픽셀 그리드: 배경을 흰색으로 하고 gap 대신 border로 격자 표현 */}
      <div
        className="grid bg-white"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '1000px',
          maxWidth: '100%',
        }}
      >
        {/* 픽셀 하나하나: border로 격자 느낌을 주고 hover 시 색상 변경 */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
          <div
            key={idx}
            className="w-[10px] h-[10px] bg-gray-100 border border-gray-200 hover:bg-gray-300 transition"
            title={`Pixel ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
