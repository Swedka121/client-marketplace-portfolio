/** @format */

"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <main>
      <Container>
        <section className="w-full h-screen flex flex-col gap-6 items-center justify-center">
          <h2 className="text-4xl">Ooops... Page is undefined!</h2>
          <Link href="/">
            <Button size={"lg"}>Return to the main page</Button>
          </Link>
        </section>
      </Container>
    </main>
  );
}

export default Page;
