'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

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
    <div className="absolute top-4 right-4 z-50 w-36">
      <Listbox value={lang} onChange={setLang}>
        <div className="relative">
          {/* 버튼 */}
          <Listbox.Button className="w-full text-sm text-left bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm flex justify-between items-center">
            {selected.label}
            <ChevronDown size={16} className="text-gray-500" />
          </Listbox.Button>

          {/* 옵션 리스트 */}
          <Listbox.Options className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {languages.map((langOption) => (
              <Listbox.Option
                key={langOption.code}
                value={langOption.code}
                className={({ active }) =>
                  `cursor-pointer px-3 py-2 text-sm ${
                    active ? 'bg-gray-100' : ''
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex justify-between items-center">
                    <span>{langOption.label}</span>
                    {selected && <Check size={14} className="text-gray-600" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
