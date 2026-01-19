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

function RowItemsCarousel({ loadLink }: { loadLink: string }) {
  const [Items, setItems] = useState(
    new Array(16)
      .fill({
        loaded: true,
        name: "item",
        price: 100,
        preview: "/blank-image.png",
        id: "id",
      })
      .map((el) => ({ ...el, id: UUID.v4() }))
  );
  const [ItemsInRow, setItemsInRow] = useState(0);

  const refContent = useCallback((current: HTMLDivElement) => {
    if (!current) return;
    const updateWidth = () => {
      setItemsInRow(Math.floor(current.clientWidth / 250) || 1);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const rows = useMemo(() => {
    if (ItemsInRow === 0) return [];
    const countOfPages = Math.ceil(Items.length / ItemsInRow);
    const gen_rows = [];
    for (let i = 0; i < countOfPages; i++) {
      const rowItems = Items.slice(i * ItemsInRow, (i + 1) * ItemsInRow);
      while (rowItems.length < ItemsInRow) {
        rowItems.push({
          loaded: false,
          name: "item",
          price: 100,
          id: UUID.v4(),
        });
      }

      if (!rowItems[0]) continue;

      gen_rows.push({ id: `row-${rowItems[0].id}`, items: rowItems });
    }

    return gen_rows;
  }, [ItemsInRow, Items]);

  return (
    <Carousel className="w-full h-max" ref={refContent}>
      <CarouselNext></CarouselNext>
      <CarouselPrevious></CarouselPrevious>
      <CarouselContent className="h-max">
        {rows.map((row) => (
          <CarouselItem key={row.id} className="flex fle-row justify-between">
            {row.items.map((item) => (
              <ItemCard {...item} key={item.id} />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default RowItemsCarousel;
