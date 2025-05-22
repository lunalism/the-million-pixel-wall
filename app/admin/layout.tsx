// app/admin/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:flex-row sm:space-x-0">
        {/* 사이드바 */}
        <aside className="w-full sm:w-64 bg-white border-r shadow-sm">
          <div className="h-16 flex items-center justify-center border-b px-6 font-bold text-lg">
            🧱 Admin Wall
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/pixels"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Pixels
            </Link>
            <Link
              href="/admin/reports"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              Reports
            </Link>
          </nav>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
