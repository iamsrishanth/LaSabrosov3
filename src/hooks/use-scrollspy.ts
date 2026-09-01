"use client";

import { useEffect, useState } from "react";

/**
 * Scrollspy — tracks which section id is currently active in the viewport.
 * Uses IntersectionObserver with a thin detection band near the top of the
 * viewport (the classic scrollspy pattern). SSR-safe (defaults to first id).
 */
export function useScrollspy(ids: string[], topOffset = 80): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    // Detection band: a thin strip at `topOffset`px from the top.
    // A section is "active" when this band intersects it.
    const rootMargin = `-${topOffset}px 0px -${window.innerHeight - topOffset - 4}px 0px`;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.1, 0.5, 1] }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [ids, topOffset]);

  return active;
}
