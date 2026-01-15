/** @format */

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  preventCheckLogin?: boolean;
}

export function LoginButton({ children, preventCheckLogin }: Props) {
  if (preventCheckLogin) return children;
  return (
    <Link href="/login">
      <Button variant={"default"}>Login</Button>
    </Link>
  );
}
