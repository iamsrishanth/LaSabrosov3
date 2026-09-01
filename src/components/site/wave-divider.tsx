import { cn } from "@/lib/utils";

/**
 * Animated SVG wave divider — organic editorial separator between sections.
 * Two variants: "dark" (forest-deep fill, for cream→forest transitions) and
 * "light" (cream fill, for forest→cream transitions). Reduced-motion disables
 * the drift animation via the CSS media query.
 */

interface DividerProps {
  variant?: "dark" | "light";
  className?: string;
  flip?: boolean;
}

export function WaveDivider({ variant = "dark", className, flip = false }: DividerProps) {
  const fill = variant === "dark" ? "#14532D" : "#FFFDD0";
  return (
    <div
      className={cn(
        "pointer-events-none relative -mt-px w-full overflow-hidden leading-[0] [svg]:block",
        flip && "rotate-180",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-[40px] w-full sm:h-[60px] lg:h-[80px]"
        role="presentation"
      >
        <defs>
          <linearGradient id={`wave-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={fill} stopOpacity="0.85" />
            <stop offset="50%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          className="wave-path"
          fill={`url(#wave-${variant})`}
          d="M0,40 C180,80 360,0 540,30 C720,60 900,10 1080,35 C1260,60 1380,20 1440,30 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
