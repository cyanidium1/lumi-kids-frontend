import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
import CheckoutView from "@/components/checkoutPage/CheckoutView";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CheckoutView />
    </Container>
  );
}
