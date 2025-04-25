// context/languageContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// ✅ 우리가 지원하는 언어 목록 정의
const supportedLanguages = [
  'ko', 'en', 'ja', 'zh', 'es', 'de', 'fr', 'pt-PT', 'pt-BR', 'it', 'fi'
] as const

// ✅ Language 타입 정의 (지원 언어만 허용)
export type Language = typeof supportedLanguages[number]

// ✅ Context에서 제공할 값의 타입 정의
interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
}

// ✅ LanguageContext 생성 (초기값은 undefined)
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

// ✅ Provider 컴포넌트 정의
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en')

  // ✅ 브라우저 언어 또는 localStorage에서 초기 언어 설정
  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null
    const browser = navigator.language.split('-')[0] as Language
    const defaultLang = stored || (supportedLanguages.includes(browser) ? browser : 'en')
    setLanguageState(defaultLang)
  }, [])

  // ✅ 언어 변경 함수: 상태 변경 + localStorage 저장
  const setLanguage = (lang: Language) => {
    localStorage.setItem('lang', lang)
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ✅ Context를 쉽게 사용할 수 있는 커스텀 훅
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
