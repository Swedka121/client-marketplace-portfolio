/** @format */

"use client";

import { LoginWithGithub } from "@/components/auth/loginWithGithub";
import { LoginWithGoogle } from "@/components/auth/loginWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";

function Page() {
  const authStore = useAuthStore();
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
          <Button
            onClick={async () => {
              console.log("Try!");
              await authStore.refreshToken();
            }}
          >
            Check refresh
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default Page;
