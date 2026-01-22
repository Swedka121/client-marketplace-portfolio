/** @format */

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useGithubProvider } from "@/stores/provider/githubProvider.store";

export function LoginWithGithub() {
  const githubProvider = useGithubProvider();
  const handleLogin = () => {
    githubProvider.requestCode();
  };

  return (
    <Button
      variant="secondary"
      className="rounded-2xl w-full h-max text-md font-medium gap-4 cursor-pointer"
      onClick={handleLogin}
    >
      <Image src="/githubLogo.svg" alt="github logo" width={32} height={32} />
      Continue with Github
    </Button>
  );
}
