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
    <div className="absolute top-4 right-4 z-50 w-20">
      <Listbox value={lang} onChange={setLang}>
        <div className="relative">
          {/* 버튼 */}
          <Listbox.Button className="w-full text-xs font-light text-black bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:bg-gray-100 transition">
            {selected.label}
            <ChevronDown size={14} className="text-gray-500 ml-1" />
          </Listbox.Button>

          {/* 옵션 목록 */}
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm text-xs">
            {languages.map((langOption) => (
              <Listbox.Option
                key={langOption.code}
                value={langOption.code}
                className={({ active }) =>
                  `cursor-pointer px-2 py-1 ${
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
