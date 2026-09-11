/**
 * Domain model for the shop.
 *
 * The shape is deliberately CMS-shaped: every entity carries a stable `id`
 * so the local fixtures in `src/data` can be swapped for a Sanity/CRM payload
 * without touching a single component. See `src/lib/api.ts`.
 */

export type CategorySlug = "clothing" | "toys" | "accessories";

export type ProductKind = "apparel" | "toy";

export type Badge = "new" | "bestseller" | "sale";

export interface SizeOption {
  /** Human label shown on the size chip, e.g. "86" or "2-3 роки". */
  label: string;
  inStock: boolean;
}

export interface ColorVariant {
  id: string;
  name: string;
  /** Swatch fill. Two stops render a split swatch for melange fabrics. */
  hex: string;
  /** [0] is the card image, [1] is revealed on hover, the rest feed the gallery. */
  images: string[];
  sizes: SizeOption[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  /** Short qualifier under the title: "бавовна · 100%". */
  subtitle: string;
  category: CategorySlug;
  kind: ProductKind;
  price: number;
  oldPrice?: number;
  badges: Badge[];
  description: string;
  details: { label: string; value: string }[];
  colors: ColorVariant[];
}

export interface Category {
  slug: CategorySlug;
  title: string;
  caption: string;
  image: string;
}
