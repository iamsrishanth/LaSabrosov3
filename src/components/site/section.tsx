import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative w-full scroll-mt-20", className)}
    >
      <div className={cn("container-edge", containerClassName)}>{children}</div>
    </Tag>
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-forest",
        className
      )}
    >
      <span className="inline-block h-px w-6 bg-forest/40" />
      {children}
    </span>
  );
}
