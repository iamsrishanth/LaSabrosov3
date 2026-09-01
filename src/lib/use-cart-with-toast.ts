"use client";

import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-store";

/**
 * Cart actions with toast feedback. Wraps the raw cart store actions
 * and fires branded toasts on add/remove.
 */
export function useCartWithToast() {
  const items = useCart((s) => s.items);
  const addRaw = useCart((s) => s.add);
  const removeRaw = useCart((s) => s.remove);
  const clearRaw = useCart((s) => s.clear);
  const has = useCart((s) => s.has);
  const { toast } = useToast();

  const add = (dish: Parameters<typeof addRaw>[0]) => {
    if (has(dish.id)) return;
    addRaw(dish);
    toast({
      title: "Added to your list",
      description: `${dish.name} (₹${dish.price}) is ready to order.`,
    });
  };

  const remove = (id: string) => {
    const dish = items.find((i) => i.id === id);
    removeRaw(id);
    if (dish) {
      toast({
        title: "Removed from list",
        description: `${dish.name} was removed.`,
      });
    }
  };

  const clear = () => {
    if (items.length === 0) return;
    clearRaw();
    toast({
      title: "List cleared",
      description: "Your order list is now empty.",
    });
  };

  return { items, add, remove, clear, has, total: items.reduce((s, i) => s + i.price, 0) };
}
