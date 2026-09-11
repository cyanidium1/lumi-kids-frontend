import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

/**
 * Two columns on phones (the brief), three on tablets, four on desktop.
 * Hairline gaps keep the grid reading as one sheet of imagery.
 */
export default function ProductGrid({
  products,
  className,
  priorityCount = 2,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:gap-y-14 xl:grid-cols-4 xl:gap-x-6",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
