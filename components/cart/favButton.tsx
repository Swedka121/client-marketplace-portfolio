/** @format */

import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

export function FavButton() {
  return (
    <Button size={"icon"} variant={"default"}>
      <HeartIcon />
    </Button>
  );
}
