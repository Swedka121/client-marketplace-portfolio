/** @format */

"use client";

import { LoginWithGithub } from "@/components/auth/loginWithGithub";
import { LoginWithGoogle } from "@/components/auth/loginWithGoogle";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Message {
  id: "EnumMarketplacePopup";
  type: string;
  data: string;
}

function Page() {
  const params = useSearchParams();

  useEffect(() => {
    if (!params.get("callback") || !params.get("access")) return;
    window.opener.postMessage(
      {
        id: "EnumMarketplacePopup",
        type: "SET_ACCESS",
        data: params.get("access"),
      },
      "http://localhost:3000",
    );
    window.close();
  }, [params]);

  useEffect(() => {
    const callback = (msg: MessageEvent<Message>) => {
      if (
        msg.origin != "http://localhost:3000" ||
        msg.data.id != "EnumMarketplacePopup"
      )
        return;
      console.log(msg);
    };
    window.addEventListener("message", callback);

    return () => {
      window.removeEventListener("message", () => {});
    };
  }, []);

  if (params.get("callback")) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <Image
          className="absolute top-0 left-0 -z-10 blur-xs w-screen h-screen"
          src={"/hero1.jpg"}
          fill
          alt="decorative"
        ></Image>
        <Card className="w-100">
          <CardContent className="flex flex-col gap-6">Success!</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Image
        className="absolute top-0 left-0 -z-10 blur-xs w-screen h-screen"
        src={"/hero1.jpg"}
        fill
        alt="decorative"
      ></Image>
      <Card className="w-100">
        <CardContent className="flex flex-col gap-6">
          <LoginWithGoogle />
          <LoginWithGithub />
        </CardContent>
      </Card>
    </section>
  );
}

export default Page;
