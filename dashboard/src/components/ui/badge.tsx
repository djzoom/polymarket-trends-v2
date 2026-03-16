import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium font-tabular",
  {
    variants: {
      variant: {
        bull: "bg-bull-bg text-bull border border-bull-border",
        bear: "bg-bear-bg text-bear border border-bear-border",
        neutral: "bg-neutral-bg text-neutral border border-neutral-border",
        warning: "bg-warning-bg text-warning",
        accent: "bg-accent-bg text-accent",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
