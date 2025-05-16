'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-sm border px-2 py-1 rounded bg-white"
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
