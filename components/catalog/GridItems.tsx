/** @format */

"use client";

import * as UUID from "uuid";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { ItemCard } from "./itemCard";
import { cn } from "@/lib/utils";

export function GridItems({ loadLink }: { loadLink: string }) {
  const [Items, setItems] = useState(
    new Array(16)
      .fill({
        loaded: true,
        name: "item",
        price: 100,
        preview: "/blank-image.png",
        id: "id",
      })
      .map((el) => ({ ...el, id: UUID.v4() })),
  );

  return (
    <section
      className={cn(
        "w-full h-full flex flex-wrap flex-row justify-center p-6 gap-6 ",
      )}
    >
      {Items.map((el) => (
        <ItemCard {...el} key={el.id} />
      ))}
    </section>
  );
}
