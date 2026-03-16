import { cn } from "@/lib/utils";
import { StatusDot } from "./status-dot";

/* ── Panel 容器 ─────────────────────────────────────────── */

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 跨越 grid 列数 */
  colSpan?: 1 | 2 | 3 | 4;
}

const colSpanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

export function Panel({
  className,
  colSpan = 1,
  children,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn("panel", colSpanMap[colSpan], className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Panel Header ───────────────────────────────────────── */

interface PanelHeaderProps {
  title: string;
  status?: "live" | "stale" | "offline";
  children?: React.ReactNode;
  className?: string;
}

export function PanelHeader({
  title,
  status,
  children,
  className,
}: PanelHeaderProps) {
  return (
    <div className={cn("panel-header", className)}>
      <div className="flex items-center gap-2">
        <h2>{title}</h2>
        {status && <StatusDot status={status} />}
      </div>
      {children}
    </div>
  );
}
