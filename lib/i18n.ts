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

// ✅ 각 언어 코드에 해당하는 번역 객체를 매핑
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

// ✅ t 함수: 현재 언어에 따라 해당 key의 번역값 반환
export function useTranslation() {
  const { language } = useLanguage()
  const dictionary = translations[language] || translations['en']

  const t = (key: keyof typeof dictionary): string => {
    return dictionary[key] || key
  }

  return { t, language }
}
