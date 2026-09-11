"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import { Product } from "@/types/product";
import { cn, declOfNum } from "@/lib/utils";
import { ChevronIcon } from "@/components/shared/ui/Icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Рекомендовані" },
  { key: "new", label: "Спочатку новинки" },
  { key: "price-asc", label: "Ціна: зростання" },
  { key: "price-desc", label: "Ціна: спадання" },
];

const categoryLabels: Record<string, string> = {
  clothing: "Одяг",
  toys: "Іграшки",
  accessories: "Аксесуари",
};

/**
 * `filterBy` keeps the toolbar honest: a mixed catalogue filters by section,
 * a single section filters by size (where 56–116, 16–19 and 44–54 no longer
 * sit in the same row and mean three different things).
 */
export default function CatalogView({
  products,
  filterBy = "size",
}: {
  products: Product[];
  filterBy?: "size" | "category";
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => set.add(product.category));
    return Array.from(set);
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) =>
      product.colors.forEach((color) =>
        color.sizes.forEach((item) => set.add(item.label)),
      ),
    );
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, "uk", { numeric: true }),
    );
  }, [products]);

  const visible = useMemo(() => {
    let filtered = products;

    if (filterBy === "size" && size) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) =>
          color.sizes.some((item) => item.label === size && item.inStock),
        ),
      );
    }

    if (filterBy === "category" && category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    const sorted = filtered.slice();
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new")
      sorted.sort(
        (a, b) =>
          Number(b.badges.includes("new")) - Number(a.badges.includes("new")),
      );
    return sorted;
  }, [products, size, sort, category, filterBy]);

  const chips =
    filterBy === "category"
      ? allCategories.map((item) => ({
          value: item,
          label: categoryLabels[item] ?? item,
        }))
      : allSizes.map((item) => ({ value: item, label: item }));

  const activeChip = filterBy === "category" ? category : size;
  const setChip = (value: string | null) =>
    filterBy === "category" ? setCategory(value) : setSize(value);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-3.5 lg:mb-12">
        <div className="no-scrollbar -mx-1 flex max-w-full items-center gap-1.5 overflow-x-auto px-1">
          {chips.length > 0 && (
            <>
              <span className="u-label mr-1.5 shrink-0 text-muted">
                {filterBy === "category" ? "Розділ" : "Розмір"}
              </span>
              <button
                type="button"
                onClick={() => setChip(null)}
                className={cn(
                  "shrink-0 border px-2.5 py-1.5 text-[11px] leading-none transition",
                  activeChip === null
                    ? "border-ink bg-ink text-bg"
                    : "border-line hover:border-ink",
                )}
              >
                Усі
              </button>
              {chips.map((chip) => (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() =>
                    setChip(chip.value === activeChip ? null : chip.value)
                  }
                  className={cn(
                    "shrink-0 border px-2.5 py-1.5 text-[11px] leading-none transition",
                    chip.value === activeChip
                      ? "border-ink bg-ink text-bg"
                      : "border-line hover:border-ink",
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </>
          )}
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="u-label flex items-center gap-1.5 py-1"
          >
            {sortOptions.find((option) => option.key === sort)?.label}
            <ChevronIcon
              className={cn(
                "size-4 transition-transform duration-300",
                sortOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full z-40 mt-2 w-[210px] border border-line bg-bg py-1 shadow-[0_8px_30px_rgba(23,22,20,0.06)]"
              >
                {sortOptions.map((option) => (
                  <li key={option.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSort(option.key);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "block w-full px-4 py-2.5 text-left text-[12px] transition hover:bg-sand",
                        option.key === sort && "text-ink",
                        option.key !== sort && "text-muted",
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} priorityCount={4} />
      ) : (
        <p className="py-20 text-center text-[13px] text-muted">
          За цим фільтром зараз нічого немає. Спробуйте інший.
        </p>
      )}

      <p className="mt-10 text-[11px] text-muted">
        {visible.length}{" "}
        {declOfNum(visible.length, ["товар", "товари", "товарів"])}
      </p>
    </>
  );
}
