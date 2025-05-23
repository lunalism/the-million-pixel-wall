// components/common/TopNav.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "ADMIN", href: "/admin" },
];

export function TopNav() {
    return (
        <nav className="w-full bg-white px-6 py-3 pt-4">
            <div className="mx-auto flex max-w-5xl items-center justify-end">
                <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className={cn( "transition hover:text-black", "text-sm font-medium" )}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
