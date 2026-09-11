import Container from "@/components/shared/ui/Container";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import ProductGrid from "@/components/shared/productCard/ProductGrid";
import Hero from "@/components/homePage/Hero";
import CategoryStrip from "@/components/homePage/CategoryStrip";
import Editorial from "@/components/homePage/Editorial";
import { getCategories, getFeaturedProducts } from "@/lib/api";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <CategoryStrip categories={categories} />

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            label="Нове в магазині"
            title="Обране цього сезону"
            href="/catalog"
          />
          <ProductGrid products={featured} />
        </Container>
      </section>

      <Editorial />
    </>
  );
}
