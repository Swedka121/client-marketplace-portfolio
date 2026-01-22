/** @format */

import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "../auth.store";

export const useGoogleProvider = create(() => ({
  requestCode() {
    const { google } = window;
    if (!google) return;

    google.accounts.oauth2
      .initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        scope:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
        ux_mode: "popup",
        async callback(response) {
          useGoogleProvider.getState().authorizeGoogleProvider(response.code);
        },
        error_callback(error) {
          console.log(error);
        },
      })
      .requestCode();
  },
  async authorizeGoogleProvider(code: string) {
    const data = await axios
      .get(`/auth/login?provider=google&redirect=false&code=${code}`, {
        baseURL: process.env.NEXT_PUBLIC_SERVER_LINK,
      })
      .then((res) => res.data.access);

    useAuthStore.getState().setAccess(data);
  },
}));
