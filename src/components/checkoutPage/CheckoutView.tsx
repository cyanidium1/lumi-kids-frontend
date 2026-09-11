"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FREE_SHIPPING_FROM, useCartStore } from "@/store/cartStore";
import { cn, formatPrice } from "@/lib/utils";

interface Fields {
  name: string;
  phone: string;
  city: string;
  branch: string;
  comment: string;
}

const empty: Fields = { name: "", phone: "", city: "", branch: "", comment: "" };

export default function CheckoutView() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Fields>(empty);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : 90;

  const invalid = {
    name: fields.name.trim().length < 2,
    phone: fields.phone.replace(/\D/g, "").length < 10,
    city: fields.city.trim().length < 2,
    branch: fields.branch.trim().length < 1,
  };
  const hasErrors = Object.values(invalid).some(Boolean);

  const set = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    // Demo build: no backend yet. Swap this for the order endpoint later.
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[440px] py-24 text-center"
      >
        <p className="u-label mb-5 text-muted">Замовлення прийнято</p>
        <h1 className="u-display mb-5 text-[34px] leading-[1.1]">Дякуємо!</h1>
        <p className="mb-9 text-[13px] leading-relaxed text-muted">
          Це демонстраційна версія магазину, тож замовлення нікуди не
          надсилається. У бойовій версії тут буде номер замовлення й лист на
          пошту.
        </p>
        <Link href="/catalog" className="u-label border-b border-ink pb-1">
          Повернутись до каталогу
        </Link>
      </motion.div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="mx-auto max-w-[420px] py-24 text-center">
        <h1 className="u-display mb-4 text-[30px]">Кошик порожній</h1>
        <p className="mb-8 text-[13px] text-muted">
          Додайте щось із каталогу, щоб оформити замовлення.
        </p>
        <Link href="/catalog" className="u-label border-b border-ink pb-1">
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="u-display mb-10 text-[34px] leading-[1.08] lg:mb-14 lg:text-[48px]">
        Оформлення
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <form onSubmit={submit} noValidate>
          <p className="u-label mb-6 text-muted">Отримувач</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Імʼя та прізвище"
              value={fields.name}
              onChange={set("name")}
              invalid={touched && invalid.name}
              hint="Вкажіть імʼя та прізвище"
            />
            <Field
              label="Телефон"
              value={fields.phone}
              onChange={set("phone")}
              invalid={touched && invalid.phone}
              hint="Мінімум 10 цифр"
              inputMode="tel"
              placeholder="+38 0__ ___ __ __"
            />
          </div>

          <p className="u-label mb-6 mt-12 text-muted">Доставка</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Місто"
              value={fields.city}
              onChange={set("city")}
              invalid={touched && invalid.city}
              hint="Вкажіть місто"
            />
            <Field
              label="Відділення Нової Пошти"
              value={fields.branch}
              onChange={set("branch")}
              invalid={touched && invalid.branch}
              hint="Вкажіть відділення"
            />
          </div>

          <div className="mt-5">
            <label className="u-label mb-2 block text-muted">
              Коментар до замовлення
            </label>
            <textarea
              value={fields.comment}
              onChange={set("comment")}
              rows={3}
              className="w-full resize-none border border-line bg-transparent px-3.5 py-3 text-[13px] outline-none transition focus:border-ink"
            />
          </div>

          <button
            type="submit"
            className="u-label mt-10 w-full border border-ink bg-ink px-6 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink lg:w-auto lg:px-14"
          >
            Підтвердити замовлення
          </button>

          <p className="mt-4 text-[11px] text-muted">
            Демонстраційний проєкт: оплата та відправка даних не підключені.
          </p>
        </form>

        <aside className="lg:sticky lg:top-[110px] lg:self-start">
          <p className="u-label mb-6 text-muted">Замовлення</p>
          <ul className="divide-y divide-line border-y border-line">
            {mounted &&
              items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="relative aspect-3/4 w-[64px] shrink-0 overflow-hidden bg-sand">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="u-label">{item.title}</p>
                    <p className="mt-1.5 text-[11px] text-muted">
                      {item.colorName}
                      {item.size ? ` · ${item.size}` : ""} · {item.quantity} шт
                    </p>
                    <span className="mt-auto text-[13px] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>

          <dl className="mt-5 space-y-2 text-[12px]">
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
            <div className="flex justify-between border-t border-line pt-3 text-[15px]">
              <dt>Разом</dt>
              <dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  invalid,
  hint,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  hint: string;
  inputMode?: "tel" | "text";
  placeholder?: string;
}) {
  return (
    <div>
      <label className="u-label mb-2 block text-muted">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={cn(
          "w-full border bg-transparent px-3.5 py-3 text-[13px] outline-none transition placeholder:text-muted/60 focus:border-ink",
          invalid ? "border-clay" : "border-line",
        )}
      />
      {invalid && <p className="mt-1.5 text-[11px] text-clay">{hint}</p>}
    </div>
  );
}
