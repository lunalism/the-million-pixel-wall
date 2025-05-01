// lib/fetchFaq.ts

import { supabase } from '@/lib/supabase'


// 🔵 FAQ 항목 타입 정의\
export type FaqItem = {
  id: string
  question: string
  answer: string
  lang: string
}

// 🔵 Supabase에서 FAQ를 불러오는 함수
export async function fetchFaq(lang: string): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, answer')
    .eq('lang', lang)
    .order('order', { ascending: true }) // ✅ 순서 기준으로 정렬

  if (error) {
    console.error('❌ fetchFaq 오류:', error.message)
    return []
  }

  return data as FaqItem[]
}
