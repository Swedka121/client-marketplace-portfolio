/** @format */

import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useCallback } from "react";

export function ItemCard({
  id,
  name,
  price,
  sale,
  salePrice,
  loaded,
  preview,
}: {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  salePrice?: number;
  loaded: boolean;
  preview: string;
}) {
  if (loaded)
    return (
      <Card className="h-100 w-60 flex flex-col relative overflow-hidden pb-0">
        <Image
          src={preview}
          alt="Preview image"
          width={240}
          height={400}
          className="absolute top-0 h-full w-full "
        ></Image>
        <CardHeader className="flex flex-row gap-2 justify-end z-[1]">
          <Button size={"icon-sm"}>
            <HeartIcon />
          </Button>
          <Button size={"icon-sm"}>
            <ShoppingCartIcon />
          </Button>
        </CardHeader>
        <CardContent className="relative"></CardContent>
        <CardFooter className="bottom-0 mt-auto flex flex-col items-start z-[1] text-background backdrop-blur-sm pb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <p>{price}$</p>
        </CardFooter>
      </Card>
    );
  return <Skeleton className="h-100 w-60" />;
}
