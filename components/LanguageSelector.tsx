// components/LanguageSelector.tsx
'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { useLanguage, Language } from '@/context/languageContext'

// ✅ 지원 언어 목록 (국기 제거됨)
const languageOptions: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '简体中文' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'pt-BR', label: 'Português (BR)' },
  { code: 'pt-PT', label: 'Português (PT)' },
  { code: 'it', label: 'Italiano' },
  { code: 'su', label: 'Suomi' },
  { code: 'ar', label: 'العربية' } // ✅ 아랍어 추가
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const selected = languageOptions.find((l) => l.code === language)

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="inline-flex items-center gap-2 bg-neutral-900 border border-white/20 text-white text-sm px-4 py-2 rounded-md shadow-sm hover:bg-neutral-800 transition">
            {selected ? selected.label : 'Language'}
            <ChevronDownIcon className="w-4 h-4 text-white/80" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-52 max-h-64 overflow-y-auto origin-top-right rounded-md bg-neutral-900 border border-white/10 shadow-lg focus:outline-none z-50">
            <div className="py-1">
              {languageOptions.map((lang) => (
                <Menu.Item key={lang.code}>
                  {({ active }) => (
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={`${
                        active ? 'bg-neutral-800 text-white' : 'text-white'
                      } group flex items-center justify-between w-full px-4 py-2 text-sm`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <CheckIcon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
