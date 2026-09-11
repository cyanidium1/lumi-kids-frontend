import Image from "next/image";
import Link from "next/link";

/**
 * Split hero: the copy sits on a sand panel, the photography keeps its own
 * portrait crop instead of being stretched into a letterbox.
 */
export default function Hero() {
  return (
    <section className="grid lg:min-h-[calc(100svh-74px)] lg:grid-cols-[1fr_1.05fr]">
      <div className="order-2 flex flex-col justify-center bg-sand px-5 py-14 lg:order-1 lg:px-14 lg:py-20 xl:px-20">
        <p className="u-label mb-6 text-muted">Осінь — Зима 26</p>
        <h1 className="u-display max-w-[560px] text-[42px] leading-[1.04] sm:text-[54px] lg:text-[60px] xl:text-[68px]">
          Небагато речей,
          <br />
          але кожна — надовго
        </h1>
        <p className="mt-7 max-w-[400px] text-[13px] leading-relaxed text-muted">
          Меринос, органічна бавовна та дерево. Дванадцять моделей на сезон, які
          поєднуються між собою і переходять до молодших.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/catalog"
            className="u-label border border-ink bg-ink px-7 py-4 text-bg transition duration-300 hover:bg-transparent hover:text-ink"
          >
            Дивитись колекцію
          </Link>
          <Link
            href="/catalog/toys"
            className="u-label border border-ink/25 px-7 py-4 transition duration-300 hover:border-ink"
          >
            Іграшки
          </Link>
        </div>
      </div>

      <div className="relative order-1 aspect-4/5 w-full overflow-hidden bg-sand sm:aspect-16/10 lg:order-2 lg:aspect-auto lg:h-full">
        <div className="absolute -inset-px">
          <Image
            src="/images/content/hero.jpg"
            alt="Діти в одязі LUMI"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
      </div>
    </section>
  );
}
