"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) =>
        set({
          slugs: get().slugs.includes(slug)
            ? get().slugs.filter((item) => item !== slug)
            : [...get().slugs, slug],
        }),
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "lumi-favorites" },
  ),
);
