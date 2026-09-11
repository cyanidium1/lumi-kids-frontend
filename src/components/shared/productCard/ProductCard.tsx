"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";
import { useAddToCart } from "@/components/shared/addToCart/useAddToCart";
import { useCartStore } from "@/store/cartStore";
import { PlusIcon, CloseIcon } from "@/components/shared/ui/Icons";
import FavoriteButton from "./FavoriteButton";
import ColorSwatches from "./ColorSwatches";

const badgeLabel: Record<string, string> = {
  new: "Новинка",
  bestseller: "Хіт",
  sale: "Sale",
};

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [colorIndex, setColorIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const addToCart = useAddToCart();
  const openCart = useCartStore((state) => state.open);

  const color = product.colors[colorIndex];
  const [front, back = front] = color.images;
  const hasSizes = color.sizes.length > 0;

  const handleAdd = (size: string | null) => {
    addToCart({
      product,
      colorId: color.id,
      size,
      origin: imageRef.current,
    });
    setPanelOpen(false);
    window.setTimeout(openCart, 900);
  };

  return (
    <article className="group/card relative flex flex-col">
      <div
        ref={imageRef}
        className="relative aspect-3/4 w-full overflow-hidden bg-sand"
      >
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={product.title}
        >
          {/* One transform node for the zoom, opacity-only crossfade inside —
              animating scale on both layers at once is what made it stutter.
              -inset-px paints the layer a pixel past the clip box: grid columns
              land on fractional widths, and an antialiased edge on that seam is
              exactly the 1px hairline you see while hovering. */}
          <div className="absolute -inset-px transform-gpu transition-transform duration-[800ms] ease-out lg:group-hover/card:scale-[1.025]">
            <Image
              src={front}
              alt={product.title}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-opacity duration-[550ms] ease-out lg:group-hover/card:opacity-0"
            />
            <Image
              src={back}
              alt=""
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
              aria-hidden
              className="object-cover opacity-0 transition-opacity duration-[550ms] ease-out lg:group-hover/card:opacity-100"
            />
          </div>
        </Link>

        {product.badges.length > 0 && (
          <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "u-label bg-bg/90 px-2 py-[5px] backdrop-blur-[2px]",
                  badge === "sale" && "bg-clay text-bg",
                )}
              >
                {badgeLabel[badge]}
              </span>
            ))}
          </div>
        )}

        <FavoriteButton
          slug={product.slug}
          className="absolute right-3 top-3 z-20"
        />

        {/* Mobile trigger: hover has no equivalent on touch. */}
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-label={panelOpen ? "Закрити вибір" : "Швидке додавання"}
          className="absolute bottom-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-bg/95 text-ink shadow-[0_1px_8px_rgba(23,22,20,0.08)] transition active:scale-95 lg:hidden"
        >
          {panelOpen ? (
            <CloseIcon className="size-4" />
          ) : (
            <PlusIcon className="size-4" />
          )}
        </button>

        {/* Quick add — revealed on hover (desktop) or by the + button (mobile). */}
        <div
          className={cn(
            // -inset-x-px: the panel overshoots by a pixel on each side so
            // subpixel rounding can't leave a hairline of photo showing.
            "absolute -inset-x-px -bottom-px z-20 translate-y-[102%] bg-bg px-3 py-3 transition-transform duration-[450ms] ease-out lg:px-4",
            "lg:group-hover/card:translate-y-0 lg:group-focus-within/card:translate-y-0",
            panelOpen && "translate-y-0",
          )}
        >
          {hasSizes ? (
            <>
              <p className="u-label mb-2 text-muted">Розмір</p>
              <div className="flex flex-wrap gap-1.5">
                {color.sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    disabled={!size.inStock}
                    onClick={() => handleAdd(size.label)}
                    className={cn(
                      "min-w-9 border border-line px-2 py-1.5 text-[11px] leading-none transition",
                      size.inStock
                        ? "hover:border-ink hover:bg-ink hover:text-bg"
                        : "cursor-not-allowed text-muted/50 line-through",
                    )}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleAdd(null)}
              className="u-label w-full border border-ink bg-ink px-3 py-2.5 text-bg transition hover:bg-transparent hover:text-ink"
            >
              Додати в кошик
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        {product.colors.length > 1 && (
          <ColorSwatches
            colors={product.colors}
            activeIndex={colorIndex}
            onChange={setColorIndex}
            className="mb-2.5"
          />
        )}

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="u-label mb-1.5">{product.title}</h3>
          <p className="mb-2 text-[11px] text-muted">{product.subtitle}</p>
        </Link>

        <div className="mt-auto flex items-baseline gap-2">
          <motion.span
            key={color.id}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "text-[13px] tabular-nums",
              product.oldPrice && "text-clay",
            )}
          >
            {formatPrice(product.price)}
          </motion.span>
          {product.oldPrice && (
            <span className="text-[12px] text-muted line-through tabular-nums">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
