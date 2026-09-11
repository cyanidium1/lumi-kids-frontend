import { Product } from "./product";

export interface CartItem {
  /** `${productId}:${colorId}:${size}` — one line per purchasable variant. */
  key: string;
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  colorId: string;
  colorName: string;
  size: string | null;
  quantity: number;
}

export interface CartSelection {
  product: Product;
  colorId: string;
  size: string | null;
}
