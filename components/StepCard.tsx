'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

type StepCardProps = {
  step: {
    title: string;
    description: string;
  };
  icon: LucideIcon;
  index: number;
};

export default function StepCard({ step, icon: Icon, index }: StepCardProps) {
  // 개별 카드 애니메이션 제어 (1번만 실행)
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
    >
      <Icon size={32} className="mx-auto text-black/70 mb-4" />
      <h3 className="text-lg font-normal mb-2">{step.title}</h3>
      <p className="text-sm font-thin text-black/70">{step.description}</p>
    </motion.div>
  );
}
