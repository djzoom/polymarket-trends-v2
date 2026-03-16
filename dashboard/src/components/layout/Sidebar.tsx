"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowLeftRight,
  Eye,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "概览", href: "/", icon: LayoutDashboard },
  { label: "套利信号", href: "/arbitrage", icon: ArrowLeftRight },
  { label: "聪明钱", href: "/smart-money", icon: Eye },
  { label: "实时行情", href: "/markets", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 flex flex-col border-r border-border bg-background-alt"
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 border-b border-border px-5"
        style={{ height: "var(--header-height)" }}
      >
        <div className="h-6 w-6 rounded-sm bg-accent" />
        <span className="text-sm font-semibold tracking-tight">
          PolyTrends
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-surface-active text-foreground"
                      : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-foreground-dim">
          <span className="status-dot" data-status="live" />
          <span>Connected</span>
        </div>
      </div>
    </aside>
  );
}
