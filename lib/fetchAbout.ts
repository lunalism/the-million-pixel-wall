// lib/fetchAbout.ts

import { supabase } from "@/lib/supabase"

// About 데이터 타입
export type AboutItem = {
  id?: string
  title: string
  content: string
  slug: string
  language: string
  category?: string | null
  icon?: string | null
}

/**
 * fetchAbout
 * - slug만 있으면 단일 데이터(Project, Language, Credit 등)를 가져옴
 * - slug + category가 모두 있으면 여러 개(Technology, Highlight 리스트)를 가져옴
 */
export async function fetchAbout(language: string, slug: string, category?: string) {
  if (category) {
    // ✅ category가 있는 경우: 여러 행 불러오기
    const { data, error } = await supabase
      .from('about')
      .select('title, content, icon')
      .eq('language', language)
      .eq('slug', slug)
      .eq('category', category)

    if (error) {
      console.error(`❌ fetchAbout 실패: [${language}/${slug}/${category}]`, error.message)
      return []
    }

    return data as AboutItem[] // 배열 리턴
  } else {
    // ✅ category가 없는 경우: 단일 행 불러오기
    const { data, error } = await supabase
      .from('about')
      .select('title, content')
      .eq('language', language)
      .eq('slug', slug)
      .single()

    if (error) {
      console.error(`❌ fetchAbout 실패: [${language}/${slug}]`, error.message)
      return null
    }

    return data as AboutItem // 객체 리턴
  }
}
