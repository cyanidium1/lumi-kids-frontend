import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
import CatalogView from "@/components/catalogPage/CatalogView";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Уся колекція LUMI — одяг, іграшки та аксесуари для дітей.",
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CatalogHeader
        title="Уся колекція"
        caption="Одяг, іграшки та аксесуари — те, що є в наявності просто зараз."
        breadcrumbs={[{ label: "Каталог" }]}
      />
      <CatalogView products={products} filterBy="category" />
    </Container>
  );
}
