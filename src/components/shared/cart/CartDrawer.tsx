"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Backdrop from "@/components/shared/ui/Backdrop";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/shared/ui/Icons";
import { FREE_SHIPPING_FROM, useCartStore } from "@/store/cartStore";
import { cn, declOfNum, formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : 90;
  const left = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  return (
    <>
      <Backdrop isVisible={isOpen} onClose={close} />
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[100] flex h-dvh w-full max-w-[420px] flex-col bg-bg"
            role="dialog"
            aria-label="Кошик"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-6">
              <p className="u-label">
                Кошик
                {mounted && count > 0 ? ` · ${count}` : ""}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Закрити кошик"
                className="-mr-2 flex size-9 items-center justify-center transition hover:opacity-60"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            {!mounted || items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="u-display text-[24px]">Тут поки порожньо</p>
                <p className="max-w-[240px] text-[13px] text-muted">
                  Оберіть щось із нової колекції — доставка від{" "}
                  {formatPrice(FREE_SHIPPING_FROM)} безкоштовна.
                </p>
                <Link
                  href="/catalog"
                  onClick={close}
                  className="u-label border-b border-ink pb-1"
                >
                  До каталогу
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-5 py-3.5 lg:px-6">
                  <p className="mb-2 text-[11px] text-muted">
                    {left > 0
                      ? `До безкоштовної доставки — ${formatPrice(left)}`
                      : "Безкоштовна доставка застосована"}
                  </p>
                  <div className="h-px w-full bg-line">
                    <motion.div
                      className="h-px bg-ink"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <ul className="no-scrollbar flex-1 overflow-y-auto px-5 lg:px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 border-b border-line py-4">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={close}
                            className="relative aspect-3/4 w-[76px] shrink-0 overflow-hidden bg-sand"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="76px"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={close}
                                className="u-label pr-2"
                              >
                                {item.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() => remove(item.key)}
                                aria-label="Видалити"
                                className="-mt-1 shrink-0 text-muted transition hover:text-ink"
                              >
                                <CloseIcon className="size-4" />
                              </button>
                            </div>

                            <p className="mt-1.5 text-[11px] text-muted">
                              {item.colorName}
                              {item.size ? ` · розмір ${item.size}` : ""}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center border border-line">
                                <button
                                  type="button"
                                  onClick={() => decrease(item.key)}
                                  disabled={item.quantity <= 1}
                                  aria-label="Менше"
                                  className="flex size-7 items-center justify-center transition disabled:opacity-30 enabled:hover:bg-sand"
                                >
                                  <MinusIcon className="size-3.5" />
                                </button>
                                <span className="w-7 text-center text-[12px] tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increase(item.key)}
                                  aria-label="Більше"
                                  className="flex size-7 items-center justify-center transition hover:bg-sand"
                                >
                                  <PlusIcon className="size-3.5" />
                                </button>
                              </div>
                              <span className="text-[13px] tabular-nums">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-line px-5 py-5 lg:px-6">
                  <dl className="mb-4 space-y-1.5 text-[12px]">
                    <div className="flex justify-between">
                      <dt className="text-muted">Сума</dt>
                      <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Доставка</dt>
                      <dd className="tabular-nums">
                        {shipping === 0 ? "Безкоштовно" : formatPrice(shipping)}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-line pt-2.5 text-[14px]">
                      <dt>Разом</dt>
                      <dd className="tabular-nums">
                        {formatPrice(subtotal + shipping)}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href="/checkout"
                    onClick={close}
                    className={cn(
                      "u-label flex w-full items-center justify-center border border-ink bg-ink px-4 py-3.5 text-bg",
                      "transition duration-300 hover:bg-transparent hover:text-ink",
                    )}
                  >
                    Оформити замовлення
                  </Link>

                  <p className="mt-3 text-center text-[11px] text-muted">
                    {count}{" "}
                    {declOfNum(count, ["товар", "товари", "товарів"])} у кошику
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
