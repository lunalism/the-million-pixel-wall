'use client';

import React from 'react';

const GRID_SIZE = 100;

export default function PixelGrid() {
  return (
    <section className="w-full pt-8 pb-16 bg-white flex justify-center">
      <div
        className="grid gap-[1px] bg-gray-200"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '1000px',
          maxWidth: '100%',
        }}
      >
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
