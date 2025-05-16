'use client';

import React from 'react';
import {
  MousePointer,
  UploadCloud,
  CreditCard,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HowItWorks() {
  // 카드 내용 정의
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
      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {steps.map((step, index) => {
          // 각 카드 요소를 감지하기 위한 ref
          const [ref, inView] = useInView({ triggerOnce: true });

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
            >
              {step.icon}
              <h3 className="text-lg font-normal mb-2">{step.title}</h3>
              <p className="text-sm font-thin text-black/70">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
