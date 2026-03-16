import { cn } from "@/lib/utils";

type Status = "live" | "stale" | "offline";

interface StatusDotProps {
  status: Status;
  label?: string;
  className?: string;
}

export function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="status-dot" data-status={status} />
      {label && (
        <span className="text-xs text-foreground-muted">{label}</span>
      )}
    </span>
  );
}
