/** @format */

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";

export function LoginWithGoogle() {
  const handleLogin = () => {
    const { google } = window;
    if (!google) return;

    google.accounts.oauth2
      .initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        scope:
          "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
        ux_mode: "popup",
        callback(response) {
          console.log(response);
        },
      })
      .requestCode();
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
