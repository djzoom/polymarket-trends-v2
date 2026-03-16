"use client";

import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-10 flex items-center justify-between border-b border-border bg-background px-4",
        className
      )}
      style={{
        left: "var(--sidebar-width)",
        height: "var(--header-height)",
      }}
    >
      {/* Left: terminal path */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-foreground-dim tracking-wider">
          SYS
        </span>
        <span className="text-foreground-dim">/</span>
        <span className="text-xs text-foreground-muted tracking-wider">
          POLYMARKET
        </span>
        <span className="text-foreground-dim">/</span>
        <span className="text-xs text-foreground tracking-wider">
          TERMINAL
        </span>
      </div>

      {/* Right: status indicators */}
      <div className="flex items-center gap-4">
        {/* Gas */}
        <div className="flex items-center gap-1.5">
          <span className="text-foreground-dim" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
            GAS
          </span>
          <span className="font-tabular text-xs" style={{ color: "var(--bull)" }}>
            0.3 gwei
          </span>
        </div>

        {/* Separator */}
        <span className="text-foreground-dim">|</span>

        {/* Active markets */}
        <div className="flex items-center gap-1.5">
          <span className="text-foreground-dim" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>
            MKTS
          </span>
          <span className="font-tabular text-xs text-foreground-muted">
            247
          </span>
        </div>

        <span className="text-foreground-dim">|</span>

        {/* UTC clock placeholder */}
        <span className="font-tabular text-xs text-foreground-muted">
          UTC 00:00:00
        </span>

        {/* Cursor blink */}
        <span className="cursor-blink text-xs" style={{ color: "var(--bull)" }}>_</span>
      </div>
    </header>
  );
}
