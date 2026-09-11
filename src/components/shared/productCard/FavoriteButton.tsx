"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { HeartIcon } from "@/components/shared/ui/Icons";

export default function FavoriteButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const slugs = useFavoritesStore((state) => state.slugs);
  const toggle = useFavoritesStore((state) => state.toggle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active = mounted && slugs.includes(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-label={active ? "Прибрати з обраного" : "Додати в обране"}
      aria-pressed={active}
      className={cn(
        "flex size-8 items-center justify-center text-ink transition active:scale-90",
        "opacity-70 hover:opacity-100 lg:opacity-0 lg:group-hover/card:opacity-70",
        active && "opacity-100 lg:opacity-100",
        className,
      )}
    >
      <HeartIcon
        className={cn("size-[18px] transition", active && "fill-ink")}
      />
    </button>
  );
}
