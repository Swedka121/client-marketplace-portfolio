/** @format */

import axios, {
  Axios,
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { create } from "zustand";
import * as jwtDecode from "jwt-decode";
import { toast } from "sonner";

interface User {
  provider: number;
  providerId: string;
  sub: string;
  email: string;
  name: string;
  role: number;
  avatarUrl: string;
}

type isAuthorizedStatus = "isAuthorized" | "nonAuthorized" | "Pending";

interface AuthStore {
  isAuthorized: isAuthorizedStatus;
  accessToken: string | null;
  user: User | null;

  client: AxiosInstance;

  refreshPromise: Promise<string | null> | null;

  setAccess: (access: string | null) => void;
  refreshToken: () => Promise<string | null>;
  checkAuthorization: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthorized: "Pending",
  accessToken: null,
  user: null,
  client: AuthorizedClient(),
  refreshPromise: null,
  setAccess(access) {
    if (!access)
      return set((prev) => ({
        ...prev,
        accessToken: null,
        isAuthorized: "nonAuthorized",
        user: null,
        client: axios.create(),
      }));
    const user = jwtDecode.jwtDecode(access) as User;
    set((prev) => ({
      ...prev,
      accessToken: access,
      isAuthorized: "isAuthorized",
      user,
    }));
  },
  async refreshToken() {
    if (get().refreshPromise) return get().refreshPromise;

    return new Promise<string>(async () => {
      const data = await axios
        .get("/auth/refresh", {
          baseURL: process.env.NEXT_PUBLIC_SERVER_LINK,
          withCredentials: true,
        })
        .then((res) => res.data as { access: string })
        .catch((err) => {
          toast.error("You are unauthorized!", { description: err.message });
          set((prev) => ({ ...prev, isAuthorized: "nonAuthorized" }));
          return Promise.reject();
        });
      useAuthStore.getState().setAccess(data.access);
      Promise.resolve(data.access);
    });
  },

  async checkAuthorization() {
    console.log(await get().client.get("/auth/check"));
  },
}));

function AuthorizedClient() {
  const controller = new AbortController();
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_LINK,
    withCredentials: true,
  });

  client.interceptors.request.use((config) => {
    if (config.headers.get("X-Refreshed") == true) {
      toast.warning("You are unauthorized!");
      useAuthStore.getState().isAuthorized = "nonAuthorized";
      config.signal = controller.signal;
      controller.abort();

      return config;
    }
    config.headers.set("X-Refreshed", false);
    config.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;

    return config;
  });

  client.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error: AxiosError) => {
      switch (error.status) {
        case 401: {
          await useAuthStore.getState().refreshToken();

          const config = {
            ...error.request,
            headers: {
              "X-Refreshed": 1,
            },
          } as AxiosRequestConfig;

          Promise.resolve(useAuthStore.getState().client(config));

          break;
        }
        default:
          toast.error(error.message || "Request exited with error!");
      }
    },
  );

  return client;
}
