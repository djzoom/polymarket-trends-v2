import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-center justify-between", className)}>
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--bull)", fontSize: "10px" }}>{">"}</span>
        <h1>{title}</h1>
        {description && (
          <span className="text-xs text-foreground-dim tracking-wide">
            // {description}
          </span>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
