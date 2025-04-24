// lib/uploadImage.ts
import { supabase } from "@/lib/supabase"

/**
 * uploadImage
 * 사용자가 업로드한 파일을 Supabase Storage에 저장하고 public URL을 반환합니다.
 */
export async function uploadImage(file: File): Promise<string | null> {
  // 파일명에 timestamp를 추가해 고유하게 만들기
  const fileExt = file.name.split(".").pop()
  const filePath = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`

  // Storage 버킷에 업로드
  const { error } = await supabase.storage.from("pixel-images").upload(filePath, file)

  if (error) {
    console.error("❌ Image upload failed:", error.message)
    return null
  }

  // public URL 반환
  const { data } = supabase.storage.from("pixel-images").getPublicUrl(filePath)
  return data.publicUrl || null
} 
