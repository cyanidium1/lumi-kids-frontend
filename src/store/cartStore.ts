"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartSelection } from "@/types/cart";
import { variantKey } from "@/lib/utils";

const FREE_SHIPPING_FROM = 2500;

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;

  open: () => void;
  close: () => void;

  add: (selection: CartSelection, quantity?: number) => void;
  remove: (key: string) => void;
  increase: (key: string) => void;
  decrease: (key: string) => void;
  clear: () => void;

  count: () => number;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
  freeShippingLeft: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hydrated: false,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      add: ({ product, colorId, size }, quantity = 1) => {
        const color =
          product.colors.find((item) => item.id === colorId) ??
          product.colors[0];
        const key = variantKey(product.id, color.id, size);
        const items = get().items.slice();
        const existing = items.find((item) => item.key === key);

        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            key,
            productId: product.id,
            slug: product.slug,
            title: product.title,
            image: color.images[0],
            price: product.price,
            colorId: color.id,
            colorName: color.name,
            size,
            quantity,
          });
        }

        set({ items });
      },

      remove: (key) =>
        set({ items: get().items.filter((item) => item.key !== key) }),

      increase: (key) =>
        set({
          items: get().items.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }),

      decrease: (key) =>
        set({
          items: get().items.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item,
          ),
        }),

      clear: () => set({ items: [] }),

      count: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      shipping: () => {
        const subtotal = get().subtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_FROM) return 0;
        return 90;
      },

      total: () => get().subtotal() + get().shipping(),

      freeShippingLeft: () =>
        Math.max(0, FREE_SHIPPING_FROM - get().subtotal()),
    }),
    {
      name: "lumi-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export { FREE_SHIPPING_FROM };
