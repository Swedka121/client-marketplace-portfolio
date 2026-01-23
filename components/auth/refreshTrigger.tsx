/** @format */

"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

function RefreshTrigger() {
  const authStore = useAuthStore();
  useEffect(() => {
    authStore.refreshToken();
  }, []);

  return <div id="refresh_trigger"></div>;
}

export default RefreshTrigger;
