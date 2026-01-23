/** @format */

import { LoginWithGithub } from "@/components/auth/loginWithGithub";
import { LoginWithGoogle } from "@/components/auth/loginWithGoogle";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

function Page() {
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
