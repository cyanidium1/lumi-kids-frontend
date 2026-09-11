"use client";

import { cn } from "@/lib/utils";
import { ColorVariant } from "@/types/product";

export default function ColorSwatches({
  colors,
  activeIndex,
  onChange,
  size = "sm",
  className,
}: {
  colors: ColorVariant[];
  activeIndex: number;
  onChange: (index: number) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {colors.map((color, index) => (
        <button
          key={color.id}
          type="button"
          onClick={() => onChange(index)}
          aria-label={color.name}
          aria-pressed={index === activeIndex}
          title={color.name}
          className={cn(
            "relative rounded-full border transition duration-300",
            size === "sm" ? "size-3.5" : "size-5",
            index === activeIndex
              ? "border-ink"
              : "border-line hover:border-muted",
          )}
        >
          <span
            className="absolute inset-[2px] rounded-full"
            style={{ backgroundColor: color.hex }}
          />
        </button>
      ))}
    </div>
  );
}
