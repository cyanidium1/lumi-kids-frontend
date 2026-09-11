import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { Category } from "@/types/product";
import { ArrowIcon } from "@/components/shared/ui/Icons";

export default function CategoryStrip({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="pt-16 lg:pt-24">
      <Container>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.08}>
              <Link
                href={`/catalog/${category.slug}`}
                className="group/tile block"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden bg-sand md:aspect-3/4">
                  <div className="absolute -inset-px transform-gpu transition-transform duration-[900ms] ease-out group-hover/tile:scale-[1.035]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/10 transition-opacity duration-700 group-hover/tile:opacity-0" />
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <h3 className="u-label mb-1.5">{category.title}</h3>
                    <p className="max-w-[260px] text-[12px] text-muted">
                      {category.caption}
                    </p>
                  </div>
                  <ArrowIcon className="mt-0.5 size-4 shrink-0 transition-transform duration-500 group-hover/tile:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
