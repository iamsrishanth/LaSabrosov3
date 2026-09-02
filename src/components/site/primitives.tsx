import { cn } from "@/lib/utils";

/** Veg / non-veg tag — mint for veg. */
export function VegTag({ veg, className }: { veg: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 p-0.5",
        veg ? "border-forest bg-mint/60" : "border-terracotta-deep bg-cream",
        className
      )}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className={cn(
          "block h-2.5 w-2.5 rounded-full",
          veg ? "bg-forest" : "bg-terracotta-deep"
        )}
      />
    </span>
  );
}

/** Chef's-pick badge — gold. */
export function Badge({
  children,
  variant = "gold",
  className,
}: {
  children: React.ReactNode;
  variant?: "gold" | "mint" | "terracotta" | "forest";
  className?: string;
}) {
  const variants = {
    gold: "bg-gold/15 text-forest-deep border-gold/40",
    mint: "bg-mint/60 text-forest-deep border-mint",
    terracotta: "bg-terracotta/10 text-terracotta-deep border-terracotta/30",
    forest: "bg-forest text-cream border-forest",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Dotted-leader price row for menu items. */
export function PriceRow({
  name,
  price,
  veg,
  className,
}: {
  name: string;
  price: number;
  veg?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline", className)}>
      {veg !== undefined && <VegTag veg={veg} className="mr-2.5 self-center" />}
      <span className="text-sm font-semibold text-ink">{name}</span>
      <span className="dotted-leader" aria-hidden />
      <span className="font-display text-base font-semibold text-terracotta-deep">
        ₹{price}
      </span>
    </div>
  );
}
