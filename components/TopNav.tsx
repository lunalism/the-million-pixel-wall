'use client';

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

export default function TopNav() {
  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-4 h-10">
      {/* 네비게이션 메뉴 */}
      <Link href="/" className="text-xs text-black/80 hover:underline leading-none">
        HOME
      </Link>
      <Link href="/about" className="text-xs text-black/80 hover:underline leading-none">
        ABOUT
      </Link>
      <Link href="/faq" className="text-xs text-black/80 hover:underline leading-none">
        FAQ
      </Link>

      {/* 언어 선택 드롭다운 */}
      <LanguageSelector />
    </div>
  );
}
