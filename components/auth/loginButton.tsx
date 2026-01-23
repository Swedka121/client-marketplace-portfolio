/** @format */

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@/stores/auth.store";

interface Props extends PropsWithChildren {
  preventCheckLogin?: boolean;
}

export function LoginButton({ children, preventCheckLogin }: Props) {
  const authStore = useAuthStore();
  if (preventCheckLogin || authStore.isAuthorized) return children;
  return (
    <Link href="/login">
      <Button variant={"default"}>Login</Button>
    </Link>
  );
}
