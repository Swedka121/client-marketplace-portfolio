/** @format */

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useGoogleProvider } from "@/stores/provider/googleProvider.store";

export function LoginWithGoogle() {
  const googleProviderStore = useGoogleProvider();
  const handleLogin = () => {
    googleProviderStore.requestCode();
  };

  return (
    <Button
      variant={"secondary"}
      className="rounded-2xl w-full h-max text-md font-medium gap-4 cursor-pointer"
      onClick={handleLogin}
    >
      <Image
        src={"/googleLogo.png"}
        alt="google logo"
        width={32}
        height={32}
        className="rounded-full"
      ></Image>
      Continue with Google
    </Button>
  );
}
