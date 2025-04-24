// lib/savePixel.ts
import { supabase } from "@/lib/supabase"

/**
 * savePixel
 * 사용자가 입력한 픽셀 정보를 Supabase에 저장합니다.
 * 이미지 URL 또는 업로드된 파일 URL을 포함합니다.
 */
export async function savePixel(data: {
  x: number
  y: number
  width: number
  height: number
  name: string
  message: string
  image_url: string
}) {
  const { error } = await supabase.from("pixels").insert(data)

  if (error) {
    console.error("❌ Failed to save pixel:", error.message)
    throw error
  }

  console.log("✅ Pixel saved successfully")
} 
