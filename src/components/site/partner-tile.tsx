import { cn } from "@/lib/utils";

/**
 * PartnerTile — colored-text-chip fallback until licensed logos ship.
 * Tint via CSS variable class (hex lives in globals.css, never in tsx).
 */
export function PartnerTile({
  name,
  role,
  slug,
}: {
  name: string;
  role: string;
  slug: string;
}) {
  return (
    <div className="group relative flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-forest/12 bg-cream-soft px-5 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(22,101,52,0.45)]">
      <span
        className={cn(
          "partner-chip grid h-14 w-14 place-items-center rounded-full text-xl font-extrabold shadow-sm",
          `tint-${slug}`
        )}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
      <span className={cn("partner-name text-base font-bold tracking-tight", `tint-${slug}`)}>
        {name}
      </span>
      <span className="text-xs text-muted">{role}</span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-forest/50">
        Order now
      </span>
    </div>
  );
}

export function PartnerMarqueeRow() {
  const words = [
    "Zomato",
    "Swiggy",
    "magicpin",
    "Zomato District",
    "Swiggy Dineout",
    "EazyDiner",
  ];
  return (
    <div className="marquee-mask flex w-full overflow-hidden">
      <div className="marquee-track gap-10 pr-10">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className={cn(
              "font-script text-3xl font-bold text-forest/30",
              "whitespace-nowrap"
            )}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
