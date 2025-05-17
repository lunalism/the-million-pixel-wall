'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'ENGLISH' },
  { code: 'ko', label: 'KOREAN' },
  { code: 'ja', label: 'JAPANESE' },
  { code: 'es', label: 'ESPAÑOL' },
  { code: 'de', label: 'DEUTSCH' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const selected = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="absolute top-4 right-4 z-50 w-40">
      <Listbox value={lang} onChange={setLang}>
        <div className="relative">
          {/* 버튼 내부 flex 정렬로 텍스트 + 아이콘 */}
          <Listbox.Button className="w-full text-xs font-light text-black bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:bg-gray-100 transition flex items-center justify-between">
            <span>{selected.label}</span>
            <ChevronDown size={16} className="text-gray-500 shrink-0" />
          </Listbox.Button>

          {/* 드롭다운 옵션 목록 */}
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm text-xs">
            {languages.map((langOption) => (
              <Listbox.Option
                key={langOption.code}
                value={langOption.code}
                className={({ active }) =>
                  `cursor-pointer px-3 py-2 ${
                    active ? 'bg-gray-100' : ''
                  }`
                }
              >
                {langOption.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
