// lib/i18n.ts
'use client'

import { useLanguage } from '@/context/languageContext'
import en from '@/locales/en/common.json'
import ko from '@/locales/ko/common.json'
import ja from '@/locales/ja/common.json'
import zh from '@/locales/zh/common.json'
import es from '@/locales/es/common.json'
import de from '@/locales/de/common.json'
import fr from '@/locales/fr/common.json'
import ptPT from '@/locales/pt-PT/common.json'
import ptBR from '@/locales/pt-BR/common.json'
import it from '@/locales/it/common.json'
import su from '@/locales/su/common.json'
import ar from '@/locales/ar/common.json'

// ✅ 언어별 번역 객체 매핑
const translations = {
  en,
  ko,
  ja,
  zh,
  es,
  de,
  fr,
  'pt-PT': ptPT,
  'pt-BR': ptBR,
  it,
  su,
  ar,
} as const

// ✅ 중첩된 키 ("contact.title")를 안전하게 접근하는 유틸 함수
function getNestedValue(obj: any, key: string): string | undefined {
  return key.split('.').reduce((acc, part) => acc?.[part], obj)
}

// ✅ t 함수: 중첩 키 지원
export function useTranslation() {
  const { language } = useLanguage()
  const dictionary = translations[language] || translations['en']

  const t = (key: string): string => {
    const value = getNestedValue(dictionary, key)
    return typeof value === 'string' ? value : key
  }

  return { t, language }
}
