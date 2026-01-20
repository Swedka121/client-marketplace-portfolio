/** @format */

import {
  BlocksIcon,
  ClapperboardIcon,
  FilmIcon,
  FlameIcon,
  Gamepad2Icon,
} from "lucide-react";
import { Container } from "../components/layout/container";
import HeroCarousel from "@/components/heroCarousel";
import RowItemsCarousel from "@/components/catalog/rowItemsCarousel";
import { GridItems } from "@/components/catalog/GridItems";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
        <section className="grid grid-cols-[350px_1fr] grid-rows-1 py-10">
          <aside className="shadow-2xl w-full h-full bg-primary rounded-lg"></aside>
          <GridItems loadLink="/items" />
        </section>
        <section className="py-10 w-full h-60 flex items-center justify-center gap-6 flex-col relative ">
          <div className="m-auto absolute h-40 -z-20 w-screen overflow-hidden">
            <Image
              src="/hero1.jpg"
              className="w-full h-auto object-cover blur-center-x"
              fill
              alt="line"
            ></Image>
            <Image
              src="/hero1.jpg"
              className="w-full h-auto object-cover absolute -z-20 blur-sm brightness-70"
              fill
              alt="line"
            ></Image>
          </div>

          <h2 className="text-3xl text-background font-bold">
            Can’t find what you’re looking for?
          </h2>
          <Link href="/catalog">
            <Button size={"lg"}>
              <BlocksIcon /> Start Browsing
            </Button>
          </Link>
        </section>
      </main>
    </Container>
  );
}
