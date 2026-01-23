/** @format */

"use client";

import { PropsWithChildren } from "react";
import { Spinner } from "../ui/spinner";
import { useAuthStore } from "@/stores/auth.store";

export function AuthorizationSpinner({ children }: PropsWithChildren) {
  const authStore = useAuthStore();

  if (authStore.isAuthorized == "Pending") return <Spinner />;
  else return children;
}
