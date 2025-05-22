// lib/api/getForbiddenWords.ts
import { supabase } from "@/lib/supabaseClient";

export async function getForbiddenWords(): Promise<string[]> {
  const { data, error } = await supabase.from("forbidden_words").select("word");

  if (error) {
    console.error("🚫 Failed to fetch forbidden words:", error);
    return [];
  }

  // 'word' 속성만 추출
  return data.map((entry) => entry.word.toLowerCase());
}
