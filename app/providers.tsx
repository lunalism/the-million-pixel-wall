// app/providers.tsx
'use client'

import { LanguageProvider } from '@/context/languageContext'

// ✅ 전역 Context Provider 등록 컴포넌트
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
