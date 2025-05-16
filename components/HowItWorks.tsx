'use client';

import React from 'react';
import {
  MousePointer,
  UploadCloud,
  CreditCard,
} from 'lucide-react'; // 아이콘 임포트

export default function HowItWorks() {
  // 각 단계 정보 정의
  const steps = [
    {
      title: '1. Select Pixels',
      description:
        'Choose all available tiles on the grid where you want to place your ad.',
      icon: <MousePointer size={32} className="mx-auto text-black/70 mb-4" />,
    },
    {
      title: '2. Upload Image',
      description:
        'Submit your image along with the URL where the ad should point to.',
      icon: <UploadCloud size={32} className="mx-auto text-black/70 mb-4" />,
    },
    {
      title: '3. Purchase',
      description:
        'Proceed to checkout. Once complete, your pixels will go live.',
      icon: <CreditCard size={32} className="mx-auto text-black/70 mb-4" />,
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 flex flex-col items-center">
      {/* 섹션 제목 */}
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        HOW IT WORKS
      </h2>

      {/* 카드 그리드: 모바일 1열, 데스크탑 3열 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
          >
            {/* 아이콘 */}
            {step.icon}

            {/* 타이틀 - Regular 굵기 */}
            <h3 className="text-lg font-normal mb-2">{step.title}</h3>

            {/* 설명 - Thin + 흐린 컬러 */}
            <p className="text-sm font-thin text-black/70">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
