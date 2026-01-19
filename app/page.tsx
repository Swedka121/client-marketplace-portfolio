/** @format */

import { FlameIcon } from "lucide-react";
import { Container } from "../components/layout/container";
import HeroCarousel from "@/components/heroCarousel";
import RowItemsCarousel from "@/components/catalog/rowItemsCarousel";

export default function Home() {
  return (
    <Container>
      <main className="pt-24 h-full">
        <HeroCarousel />
        <section className="flex flex-col py-8 gap-6">
          <span className="flex flex-row items-center">
            <FlameIcon size={48} />
            <h2 className="text-4xl font-semibold">Popular</h2>
          </span>
          <RowItemsCarousel loadLink="/row?tag=popular" />
        </section>
      </main>
    </Container>
  );
}
