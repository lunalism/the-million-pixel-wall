// components/LanguageSelector.tsx
'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { useLanguage, Language } from '@/context/languageContext'

// ✅ 지원 언어 목록: 코드, 이름, 국기 이모지 포함
const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-PT', label: 'Português (PT)', flag: '🇵🇹' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' }
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage() // 현재 언어 상태와 변경 함수
  const selected = languageOptions.find((l) => l.code === language) // 선택된 언어 정보

  return (
    <div className="relative inline-block text-left">
      {/* 드롭다운 전체 메뉴 컨테이너 */}
      <Menu as="div" className="relative">
        <div>
          {/* 드롭다운 버튼 - 선택된 언어 표시 */}
          <Menu.Button className="inline-flex items-center gap-2 bg-neutral-900 border border-white/20 text-white text-sm px-4 py-2 rounded-md shadow-sm hover:bg-neutral-800 transition">
            {/* 선택된 언어의 국기와 이름 함께 표시 */}
            {selected ? (
              <span className="flex items-center gap-2">
                {selected.flag} {selected.label}
              </span>
            ) : '🌐 Language'}
            <ChevronDownIcon className="w-4 h-4 text-white/80" aria-hidden="true" />
          </Menu.Button>
        </div>

        {/* 드롭다운 애니메이션 처리 */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* 드롭다운 메뉴 항목 */}
          <Menu.Items className="absolute right-0 mt-2 w-52 max-h-64 overflow-y-auto origin-top-right rounded-md bg-neutral-900 border border-white/10 shadow-lg focus:outline-none z-50">
            <div className="py-1">
              {languageOptions.map((lang) => (
                <Menu.Item key={lang.code}>
                  {({ active }) => (
                    <button
                      onClick={() => setLanguage(lang.code)} // 클릭 시 언어 변경
                      className={`${
                        active ? 'bg-neutral-800 text-white' : 'text-white'
                      } group flex items-center justify-between w-full px-4 py-2 text-sm`}
                    >
                      {/* 언어 항목 - 국기 + 이름 */}
                      <span className="flex items-center gap-2">
                        {lang.flag} {lang.label}
                      </span>
                      {/* 현재 선택된 언어일 경우 체크아이콘 표시 */}
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
