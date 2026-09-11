import Link from "next/link";
import Container from "@/components/shared/ui/Container";

const columns = [
  {
    title: "Магазин",
    links: [
      { href: "/catalog/clothing", label: "Одяг" },
      { href: "/catalog/toys", label: "Іграшки" },
      { href: "/catalog/accessories", label: "Аксесуари" },
      { href: "/catalog", label: "Уся колекція" },
    ],
  },
  {
    title: "Сервіс",
    links: [
      { href: "/catalog", label: "Доставка й оплата" },
      { href: "/catalog", label: "Обмін і повернення" },
      { href: "/catalog", label: "Таблиця розмірів" },
      { href: "/catalog", label: "Догляд за речами" },
    ],
  },
  {
    title: "Контакти",
    links: [
      { href: "tel:+380440000000", label: "+38 044 000 00 00" },
      { href: "mailto:hello@lumi.studio", label: "hello@lumi.studio" },
      { href: "/catalog", label: "Київ, вул. Лугова 12" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg lg:mt-32">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div>
            <p className="u-display mb-4 text-[28px] leading-none tracking-[0.22em]">
              LUMI
            </p>
            <p className="max-w-[280px] text-[13px] text-muted">
              Дитячий одяг та іграшки з натуральних матеріалів. Небагато речей,
              але кожна — надовго.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="u-label mb-4 text-muted">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="u-underline text-[13px] transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[11px] text-muted lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} LUMI. Демонстраційний проєкт.</p>
          <p>Зображення: Pexels</p>
        </div>
      </Container>
    </footer>
  );
}
