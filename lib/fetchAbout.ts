// lib/fetchAbout.ts

import { supabase } from "@/lib/supabase"

/**
 * fetchAbout
 * 특정 언어(language)와 슬러그(slug)를 기준으로 about 데이터를 불러오는 함수입니다.
 * - 현재는 'project' slug만 사용합니다.
 * - 다국어 처리를 위해 language별로 가져옵니다.
 */
export async function fetchAbout(language: string, slug: string) {
  const { data, error } = await supabase
    .from("about")
    .select("title, content")
    .eq("language", language)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(`❌ fetchAbout 실패: [${language}/${slug}]`, error.message)
    return null
  }

  return data
}
