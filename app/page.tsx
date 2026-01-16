/** @format */

import { Container } from "../components/layout/container";
import HeroCarousel from "@/components/heroCarousel";

export default function Home() {
  return (
    <Container>
      <main className="pt-24 h-full">
        <HeroCarousel />
      </main>
    </Container>
  );
}
