/** @format */

import axios, { Axios } from "axios";
import { create } from "zustand";

interface AuthStore {
  isAuthorized: boolean;
  accessToken: string | null;

  client: Axios;

  setAccess: (access: string) => void;
  recreateClient: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthorized: false,
  accessToken: null,
  client: axios.create(),
  setAccess(access) {
    console.log(access);
    set((prev) => ({ ...prev, accessToken: access, isAuthorized: true }));
    this.recreateClient();
  },
  recreateClient() {},
}));
