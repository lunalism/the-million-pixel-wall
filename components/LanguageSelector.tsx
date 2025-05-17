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
    <Listbox value={lang} onChange={setLang}>
      <div className="relative">
        <Listbox.Button className="inline-flex items-center gap-1 text-xs font-light text-black bg-white border border-gray-300 rounded-md px-3 py-[6px] shadow-sm hover:bg-gray-100 transition leading-none">
          <span>{selected.label}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm text-xs z-50">
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
  );
}
