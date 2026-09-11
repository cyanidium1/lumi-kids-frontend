import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return `${priceFormatter.format(value)} ₴`;
}

export function variantKey(
  productId: string,
  colorId: string,
  size: string | null,
) {
  return `${productId}:${colorId}:${size ?? "-"}`;
}

export function declOfNum(n: number, forms: [string, string, string]) {
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}
