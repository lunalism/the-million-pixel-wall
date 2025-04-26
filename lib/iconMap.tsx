// lib/iconMap.tsx
'use client'

import { SiNextdotjs, SiTailwindcss, SiSupabase, SiVercel, SiSentry, SiTypescript, SiHeadlessui } from "react-icons/si";
import { FiFramer } from "react-icons/fi";
import { Cursor } from "@lobehub/icons";

// ✅ 아이콘 매핑 객체: key = 아이콘 이름, value = JSX Element
export const iconMap: { [key: string]: JSX.Element } = {
  nextdotjs: <SiNextdotjs className="w-6 h-6 text-white/80" />,
  tailwindcss: <SiTailwindcss className="w-6 h-6 text-white/80" />,
  supabase: <SiSupabase className="w-6 h-6 text-white/80" />,
  vercel: <SiVercel className="w-6 h-6 text-white/80" />,
  sentry: <SiSentry className="w-6 h-6 text-white/80" />,
  typescript: <SiTypescript className="w-6 h-6 text-white/80" />,
  headlessui: <SiHeadlessui className="w-6 h-6 text-white/80" />,
  framer: <FiFramer className="w-6 h-6 text-white/80" />,
  cursor: <Cursor className="w-6 h-6 text-white/80" />,
};
