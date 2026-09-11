import Link from "next/link";
import Container from "@/components/shared/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="u-label mb-5 text-muted">404</p>
      <h1 className="u-display mb-5 text-[34px] leading-[1.1] lg:text-[46px]">
        Сторінку не знайдено
      </h1>
      <p className="mb-9 max-w-[360px] text-[13px] text-muted">
        Можливо, товар уже розібрали або адреса змінилась.
      </p>
      <Link href="/catalog" className="u-label border-b border-ink pb-1">
        До каталогу
      </Link>
    </Container>
  );
}
