'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MousePointer, UploadCloud, CreditCard } from 'lucide-react';
import StepCard from './StepCard';

type StepContent = {
  step: number;
  title: string;
  description: string;
};

export default function HowItWorks() {
  const { lang } = useLanguage();
  const supabase = createClientComponentClient();
  const [steps, setSteps] = useState<StepContent[]>([]);

  // Supabase에서 현재 언어의 단계별 텍스트 fetch
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('howitworks')
        .select('step, key, value')
        .eq('lang', lang);

      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }

      // step 기준으로 title/description 분리
      const grouped: Record<number, StepContent> = {};
      data.forEach((row) => {
        if (!grouped[row.step]) {
          grouped[row.step] = {
            step: row.step,
            title: '',
            description: '',
          };
        }
        if (row.key === 'title') grouped[row.step].title = row.value;
        if (row.key === 'description') grouped[row.step].description = row.value;
      });

      const orderedSteps = Object.values(grouped).sort((a, b) => a.step - b.step);
      setSteps(orderedSteps);
    };

    fetchData();
  }, [lang, supabase]);

  // 단계별 아이콘 매핑
  const icons = [MousePointer, UploadCloud, CreditCard];

  return (
    <section className="w-full bg-white py-20 px-6 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {steps.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            icon={icons[index] ?? MousePointer}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
