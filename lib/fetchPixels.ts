// lib/fetchPixels.ts

/**
 * fetchPixels
 * Supabase에서 픽셀 정보를 불러오는 함수입니다.
 * - pixels 테이블에서 전체 데이터를 가져옵니다.
 * - 추후 조건이나 페이지네이션을 추가할 수도 있습니다.
 */

import { supabase } from "./supabase";

// Pixel 타입 정의 (앞으로 확장 가능)
export type Pixel = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image_url: string;
  name: string;
  message: string;
  created_at: string;
};

export async function fetchPixels(): Promise<Pixel[]> {
  const { data, error } = await supabase.from("pixels").select("*");

  if (error) {
    console.error("❌ Supabase fetchPixels 오류:", error.message);
    return [];
  }

  return data as Pixel[];
}

/**
 * loadPixels
 * fetchPixels를 감싸서 리액트 컴포넌트 외부에서도 호출 가능한 유틸 함수로 제공합니다.
 */
export async function loadPixels(setPixels: (pixels: any[]) => void) {
  const pixels = await fetchPixels()
  setPixels(pixels)
} 