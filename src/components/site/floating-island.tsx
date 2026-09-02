"use client";

import dynamic from "next/dynamic";

const FloatingActions = dynamic(
  () => import("@/components/site/floating-actions").then((m) => m.FloatingActions),
  { ssr: false }
);

const CartButton = dynamic(
  () => import("@/components/site/cart-button").then((m) => m.CartButton),
  { ssr: false }
);

export function FloatingIsland() {
  return (
    <>
      <FloatingActions />
      <CartButton />
    </>
  );
}
