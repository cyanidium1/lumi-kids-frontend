"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/shared/ui/Container";
import { BagIcon, HeartIcon, MenuIcon, CloseIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const nav = [
  { href: "/catalog/clothing", label: "Одяг" },
  { href: "/catalog/toys", label: "Іграшки" },
  { href: "/catalog/accessories", label: "Аксесуари" },
  { href: "/catalog", label: "Усе" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.open);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[80] transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-bg",
      )}
    >
      <Container className="flex h-[62px] items-center justify-between gap-4 lg:h-[74px]">
        <div className="flex flex-1 items-center gap-7">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Меню"
            className="-ml-1 flex size-9 items-center justify-center lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "u-underline u-label py-1",
                  pathname === item.href && "text-ink",
                  pathname !== item.href && "text-muted hover:text-ink",
                  "transition-colors duration-300",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          aria-label="LUMI — головна"
          className="u-display shrink-0 text-[26px] leading-none tracking-[0.22em] lg:text-[30px]"
        >
          LUMI
        </Link>

        <div className="flex flex-1 items-center justify-end gap-1.5 lg:gap-3">
          <Link
            href="/catalog"
            aria-label="Обране"
            className="hidden size-9 items-center justify-center text-ink transition hover:opacity-60 lg:flex"
          >
            <HeartIcon className="size-[19px]" />
          </Link>

          <button
            id="cart-anchor"
            type="button"
            onClick={openCart}
            aria-label={`Кошик, ${count} товарів`}
            className="relative flex size-9 items-center justify-center text-ink transition hover:opacity-60"
          >
            <BagIcon className="size-[19px]" />
            <AnimatePresence>
              {mounted && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] leading-4 text-bg tabular-nums"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <Container className="flex flex-col py-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="u-label border-b border-line/70 py-4 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
