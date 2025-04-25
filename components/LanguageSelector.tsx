// components/LanguageSelector.tsx
'use client'

import { useLanguage, Language } from '@/context/languageContext'

// ✅ 언어 코드와 이름, 국기 이모지 매핑
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
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex justify-end w-full mb-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-neutral-900 text-white border border-white/20 rounded px-3 py-1 text-sm"
      >
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
