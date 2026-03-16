"use client";

import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-10 flex items-center justify-between border-b border-border bg-background-alt/80 px-6 backdrop-blur-sm",
        className
      )}
      style={{
        left: "var(--sidebar-width)",
        height: "var(--header-height)",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-xs text-foreground-dim font-tabular">
          Polymarket Trends Terminal
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* 实时时钟区域 */}
        <span className="text-xs text-foreground-muted font-tabular">
          UTC
        </span>
      </div>
    </header>
  );
}
