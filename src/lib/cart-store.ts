"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dish } from "@/data/menu";

interface CartState {
  items: Pick<Dish, "id" | "name" | "price" | "image" | "veg">[];
  add: (dish: Pick<Dish, "id" | "name" | "price" | "image" | "veg">) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (dish) =>
        set((s) => {
          if (s.items.find((i) => i.id === dish.id)) return s; // no duplicates
          return { items: [...s.items, dish] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((i) => i.id === id),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
      count: () => get().items.length,
    }),
    { name: "lasabroso-cart" }
  )
);
