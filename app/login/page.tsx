/** @format */

"use client";

import { LoginWithGoogle } from "@/components/auth/loginWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const handleClick = (provider: string) => {
    return () => {
      router.push(
        `${process.env.NEXT_PUBLIC_SERVER_LINK || ""}/auth/login?provider=${encodeURIComponent(provider)}&redirect=${encodeURIComponent("/login")}`,
      );
    };
  };
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
          <Button
            variant={"secondary"}
            className="rounded-2xl w-full h-max text-md font-medium gap-4 cursor-pointer"
            onClick={handleClick("github")}
          >
            <Image
              src={"/githubLogo.svg"}
              alt="github logo"
              width={32}
              height={32}
            ></Image>
            Continue with Github
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default Page;
