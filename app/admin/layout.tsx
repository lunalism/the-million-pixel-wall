// app/admin/layout.tsx

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/"},
  { name: "Overview", href: "/admin" },
  { name: "Pixels", href: "/admin/pixels" },
  { name: "Reports", href: "/admin/reports" },
  { name: "Forbidden Words", href: "/admin/forbidden-words" }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/50">
      {/* 상단 헤더 */}
      <header className="border-b bg-background">
        <div className="container flex h-14 items-center justify-between px-4 pl-6 pr-6">
          <div className="font-bold text-lg">🧱 Admin</div>

          {/* 내비게이션 탭 */}
          <nav className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="w-full max-w-screen-lg mx-auto py-10 px-4">
        {children}
      </main>
    </div>
  );
}
