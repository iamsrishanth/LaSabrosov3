import { useSyncExternalStore } from "react";

/**
 * Browser-media hooks via useSyncExternalStore — avoids setState-in-effect
 * and SSR hydration mismatches. Server snapshot is the safe default.
 */

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

const getReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const reduceSubscribe = subscribeMedia("(prefers-reduced-motion: reduce)");
const desktopSubscribe = subscribeMedia("(pointer: fine)");

export function usePrefersReducedMotion() {
  return useSyncExternalStore(reduceSubscribe, getReduced, () => false);
}

export function useIsDesktop() {
  return useSyncExternalStore(desktopSubscribe, getDesktop, () => true);
}

/** Mounted flag — false on SSR, true on client after hydration. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/** WebGL availability — false if unsupported. */
export function useWebGLSupport() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    },
    () => true
  );
}
