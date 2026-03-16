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
  shortcut: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "OVERVIEW",   shortcut: "F1", href: "/",            icon: LayoutDashboard },
  { label: "ARB SIGNAL", shortcut: "F2", href: "/arbitrage",   icon: ArrowLeftRight },
  { label: "SMART $",    shortcut: "F3", href: "/smart-money",  icon: Eye },
  { label: "MARKETS",    shortcut: "F4", href: "/markets",      icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 flex flex-col border-r border-border bg-background"
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* Terminal ID */}
      <div
        className="flex items-center gap-2 border-b border-border px-3"
        style={{ height: "var(--header-height)" }}
      >
        <span
          className="inline-block h-2 w-2"
          style={{ background: "var(--bull)", boxShadow: "var(--bull-glow)" }}
        />
        <span className="text-xs font-bold tracking-widest" style={{ color: "var(--bull)" }}>
          POLYTRENDS
        </span>
        <span className="ml-auto text-xs text-foreground-dim font-tabular">v2</span>
      </div>

      {/* System info */}
      <div className="border-b border-border px-3 py-2">
        <div className="space-y-1 text-xs text-foreground-dim">
          <div className="flex justify-between">
            <span>NODE</span>
            <span className="font-tabular text-foreground-muted">POLYGON</span>
          </div>
          <div className="flex justify-between">
            <span>LATENCY</span>
            <span className="font-tabular" style={{ color: "var(--bull)" }}>12ms</span>
          </div>
          <div className="flex justify-between">
            <span>BLOCK</span>
            <span className="font-tabular text-foreground-muted">#74,291,038</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-0.5">
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
                    "flex items-center gap-2 px-2 py-1.5 text-xs font-medium tracking-wider transition-colors",
                    isActive
                      ? "bg-surface-active text-foreground"
                      : "text-foreground-dim hover:bg-surface-hover hover:text-foreground-muted"
                  )}
                  style={isActive ? { borderLeft: "2px solid var(--bull)" } : { borderLeft: "2px solid transparent" }}
                >
                  <item.icon className="h-3 w-3" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-foreground-dim" style={{ fontSize: "9px" }}>
                    {item.shortcut}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer — connection status */}
      <div className="border-t border-border px-3 py-2">
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="status-dot" data-status="live" />
            <span className="text-foreground-dim tracking-wider">CLOB</span>
            <span className="ml-auto font-tabular" style={{ color: "var(--bull)", fontSize: "10px" }}>
              CONNECTED
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot" data-status="live" />
            <span className="text-foreground-dim tracking-wider">WS</span>
            <span className="ml-auto font-tabular" style={{ color: "var(--bull)", fontSize: "10px" }}>
              STREAMING
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
