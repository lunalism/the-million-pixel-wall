// components/LanguageDirectionWrapper.tsx
'use client'

import { useLanguage } from '@/context/languageContext'
import { useEffect } from 'react'

export default function LanguageDirectionWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  useEffect(() => {
    const html = document.documentElement
    html.lang = language
    html.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  return <>{children}</>
}
