'use client';

import React from 'react';

export default function Footer() {
  return (
    // 전체 푸터 영역: 흰 배경, 위 여백, 중앙 정렬
    <footer className="w-full bg-white py-12 flex justify-center items-center">
      {/* 텍스트: 흐린 검정, 얇은 글꼴 */}
      <p className="text-sm text-black/60 font-thin tracking-wide">
        2005 | 2025
      </p>
    </footer>
  );
}
