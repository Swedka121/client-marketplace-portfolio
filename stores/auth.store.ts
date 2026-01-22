/** @format */

import axios, {
  Axios,
  AxiosError,
  AxiosHeaders,
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

interface AuthStore {
  isAuthorized: boolean;
  accessToken: string | null;
  user: User | null;

  client: Axios;

  setAccess: (access: string | null) => void;
  recreateClient: () => void;
  refreshToken: () => Promise<string>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthorized: false,
  accessToken: null,
  user: null,
  client: axios.create(),
  setAccess(access) {
    if (!access)
      return set((prev) => ({
        ...prev,
        accessToken: null,
        isAuthorized: false,
        user: null,
        client: axios.create(),
      }));
    const user = jwtDecode.jwtDecode(access) as User;
    set((prev) => ({ ...prev, accessToken: access, isAuthorized: true, user }));
    this.recreateClient();
  },
  async refreshToken() {
    console.log("refresh!");
    const data = await axios
      .get("/auth/refresh", {
        baseURL: process.env.NEXT_PUBLIC_SERVER_LINK,
        withCredentials: true,
      })
      .then((res) => res.data as { access: string })
      .catch((err) => {
        // window.location.pathname = "/login";
        toast.error("You are unauthorized!", { description: err.message });

        return { access: null };
      });
    console.log(data);
    useAuthStore.getState().setAccess(data.access);
    return data.access as string;
  },
  recreateClient() {
    const controller = new AbortController();
    const client = axios.create();

    client.interceptors.request.use((config) => {
      if (config.headers.has("X-Refreshed")) {
        toast.warning("You are unauthorized!");
        config.signal = controller.signal;
        controller.abort();

        return config;
      }
      config.headers.set("X-Refreshed", false);
      config.headers.Authorization = `Bearer ${get().accessToken}`;

      return config;
    });

    client.interceptors.response.use(
      (config) => {
        return config;
      },
      (error: AxiosError) => {
        switch (error.code) {
          case "Unauthorized": {
            const access = useAuthStore.getState().refreshToken();

            const requestConfig = {
              ...error.request,
              headers: {
                Authorization: `Bearer ${access}`,
              },
            } as AxiosRequestConfig;

            Promise.resolve(axios(requestConfig));

            break;
          }
          default:
            toast.error(error.message || "Request exited with error!");
        }
      },
    );
  },
}));
