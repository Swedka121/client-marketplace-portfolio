/** @format */

import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "../auth.store";
import { toast } from "sonner";

export const useGithubProvider = create(() => ({
  requestCode() {
    const w = 500;
    const h = 600;

    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const windowFeatures = `left=${left},top=${top},width=${w},height=${h},popup=yes,scrollbars=yes,resizable=yes`;
    const url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    const popup = window.open(url, "githubAuth", windowFeatures);

    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        return;
      }

      try {
        const currentUrl = popup.location.href;

        if (currentUrl.includes("localhost:3000")) {
          const urlParams = new URL(currentUrl).searchParams;
          const access = urlParams.get("access");
          const callback = urlParams.get("callback");
          const error = urlParams.get("error");

          if (callback === "true" && access) {
            useAuthStore.getState().setAccess(access);
            popup.close();
            clearInterval(timer);
          }

          if (error !== null) {
            toast.error("Opps... Something went wrong!", {
              description: error,
            });
            popup.close();
            clearInterval(timer);
          }
        }
      } catch (e) {}
    }, 500);
  },
}));
