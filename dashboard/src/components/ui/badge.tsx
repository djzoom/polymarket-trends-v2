import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "tag font-tabular",
  {
    variants: {
      variant: {
        bull:    "tag-bull",
        bear:    "tag-bear",
        neutral: "tag-neutral",
        warning: "tag-warning",
        accent:  "text-accent border-accent/15 bg-accent-bg",
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
