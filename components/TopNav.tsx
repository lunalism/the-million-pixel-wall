'use client';

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

export default function TopNav() {
  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
      {/* 메뉴 링크 */}
      <Link href="/about" className="text-xs text-black/80 hover:underline">
        ABOUT
      </Link>
      <Link href="/faq" className="text-xs text-black/80 hover:underline">
        FAQ
      </Link>

      {/* 언어 선택 드롭다운 */}
      <LanguageSelector />
    </div>
  );
}
