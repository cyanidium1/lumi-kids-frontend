"use client";

import { useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import { useFlyStore } from "@/store/flyStore";
import { Product } from "@/types/product";

interface AddArgs {
  product: Product;
  colorId: string;
  size: string | null;
  /** Element the flying thumbnail should start from — usually the card image. */
  origin?: HTMLElement | null;
  quantity?: number;
}

/**
 * Adds a variant to the cart and launches the flight animation from `origin`.
 * The store write is delayed until the thumbnail is halfway there, so the
 * cart badge ticks up while the image is still in the air.
 */
export function useAddToCart() {
  const add = useCartStore((state) => state.add);
  const launch = useFlyStore((state) => state.launch);

  return useCallback(
    ({ product, colorId, size, origin, quantity = 1 }: AddArgs) => {
      const color =
        product.colors.find((item) => item.id === colorId) ?? product.colors[0];

      if (origin) {
        launch(color.images[0], origin.getBoundingClientRect());
        window.setTimeout(
          () => add({ product, colorId: color.id, size }, quantity),
          420,
        );
        return;
      }

      add({ product, colorId: color.id, size }, quantity);
    },
    [add, launch],
  );
}
