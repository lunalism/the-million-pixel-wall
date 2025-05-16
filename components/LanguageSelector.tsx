'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-xs text-black bg-white border border-gray-300 rounded-md px-2 py-[6px] shadow-sm focus:outline-none focus:ring-1 focus:ring-black/10"
      >
        <option value="en">ENGLISH</option>
        <option value="ko">KOREAN</option>
        <option value="ja">JAPANESE</option>
        <option value="es">ESPAÑOL</option>
        <option value="de">DEUTCH</option>
      </select>
    </div>
  );
}
