'use client';

import React from 'react';
import {
  MousePointer,
  UploadCloud,
  CreditCard,
} from 'lucide-react';

export default function HowItWorks() {
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
      {/* 섹션 제목 제거됨 */}

      {/* 카드 그리드: 반응형 1~3단 구성 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
          >
            {step.icon}
            <h3 className="text-lg font-normal mb-2">{step.title}</h3>
            <p className="text-sm font-thin text-black/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
