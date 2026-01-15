/** @format */

import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";

export function CartButton() {
  return (
    <Button size={"icon"} variant={"default"}>
      <ShoppingCartIcon />
    </Button>
  );
}
