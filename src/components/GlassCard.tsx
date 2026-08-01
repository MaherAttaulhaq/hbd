import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export default function GlassCard({
  className = "",
  children,
  ...props
}: GlassCardProps) {
  return (
    <div className={`glass-card rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  );
}
