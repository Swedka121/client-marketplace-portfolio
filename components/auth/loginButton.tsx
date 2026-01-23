/** @format */

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { AuthorizationSpinner } from "./authorizationSpinner";

interface Props extends PropsWithChildren {
  preventCheckLogin?: boolean;
}

export function LoginButton({ children, preventCheckLogin }: Props) {
  const authStore = useAuthStore();
  return (
    <AuthorizationSpinner>
      {preventCheckLogin || authStore.isAuthorized ? (
        children
      ) : (
        <Link href="/login">
          <Button variant={"default"}>Login</Button>
        </Link>
      )}
    </AuthorizationSpinner>
  );
}
