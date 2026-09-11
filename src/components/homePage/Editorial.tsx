import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";

const promises = [
  {
    title: "Натуральні тканини",
    text: "Меринос, льон і сертифікована бавовна GOTS. Жодної синтетики біля шкіри.",
  },
  {
    title: "Шви назовні",
    text: "Там, де це важливо, ми виносимо шви й ярлики назовні — щоб нічого не тиснуло.",
  },
  {
    title: "Живе далі",
    text: "Речі розраховані на двох-трьох дітей. Приймаємо назад на переробку.",
  },
];

export default function Editorial() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <Reveal>
            <div className="relative aspect-4/5 w-full overflow-hidden bg-sand lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <div className="absolute -inset-px">
                <Image
                  src="/images/content/editorial.jpg"
                  alt="Діти у в'язаному одязі"
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="u-label mb-5 text-muted">Про LUMI</p>
            <h2 className="u-display mb-6 text-[30px] leading-[1.12] lg:text-[42px]">
              Ми робимо менше речей і довше над ними думаємо
            </h2>
            <p className="mb-9 max-w-[440px] text-[13px] leading-relaxed text-muted">
              Кожен сезон — десять-дванадцять моделей. Їх можна поєднувати між
              собою, передавати молодшим і не думати про те, що вдягнути зранку.
            </p>

            <ul className="mb-9 divide-y divide-line border-y border-line">
              {promises.map((promise) => (
                <li key={promise.title} className="py-4">
                  <p className="u-label mb-1.5">{promise.title}</p>
                  <p className="max-w-[420px] text-[12px] text-muted">
                    {promise.text}
                  </p>
                </li>
              ))}
            </ul>

            <Link href="/catalog" className="u-label self-start border-b border-ink pb-1">
              Уся колекція
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
