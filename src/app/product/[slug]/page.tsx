import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import ProductView from "@/components/productPage/ProductView";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/api";
import { categories } from "@/data/categories";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [product.colors[0].images[0]] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const category = categories.find((item) => item.slug === product.category);

  return (
    <Container className="pt-6 lg:pt-10">
      <nav aria-label="Навігація" className="u-label mb-6 text-muted lg:mb-10">
        <Link href="/" className="transition hover:text-ink">
          Головна
        </Link>
        <span className="px-2">/</span>
        <Link href="/catalog" className="transition hover:text-ink">
          Каталог
        </Link>
        {category && (
          <>
            <span className="px-2">/</span>
            <Link
              href={`/catalog/${category.slug}`}
              className="transition hover:text-ink"
            >
              {category.title}
            </Link>
          </>
        )}
      </nav>

      <ProductView product={product} />

      <section className="pt-24 lg:pt-32">
        <SectionHeading label="Вам також сподобається" title="Схожі речі" />
        <ProductGrid products={related} priorityCount={0} />
      </section>
    </Container>
  );
}
