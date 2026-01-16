/** @format */

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

async function fetchNewsImages(): Promise<string[]> {
  return ["/hero1.jpg", "/hero1.jpg", "/hero1.jpg"] as string[];
}

export async function HeroCarousel() {
  const data = await fetchNewsImages();
  return (
    <Carousel>
      <CarouselContent>
        {data.map((el) => (
          <CarouselItem key={el}>
            <Image
              className="rounded-lg"
              alt="hero"
              src={el}
              width={2560}
              height={1440}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default HeroCarousel;
