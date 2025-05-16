'use client';

import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      title: '1. Select Pixels',
      description: 'Choose all available tiles on the grid where you want to place your ad.',
    },
    {
      title: '2. Upload image',
      description: 'Submit your image along with the URL where the ad should point to.',
    },
    {
      title: '3. Purchase',
      description: 'Proceed to checkout. Once complete, your pixels will go live.',
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 flex flex-col items-center">
      {/* 섹션 제목 */}
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        HOW IT WORKS
      </h2>

      {/* 3단 카드 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-black/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
