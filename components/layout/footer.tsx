/** @format */

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="w-screen h-max bg-primary">
      <Container>
        <section className="grid grid-cols-[2fr_1fr_1fr] py-24 max-lg:grid-rows-3 max-lg:grid-cols-1">
          <article className="flex flex-col h-full">
            <div className="flex felx-row gap-6 items-center">
              <Avatar className="w-24 h-24 ">
                <AvatarFallback>Logo</AvatarFallback>
                <AvatarImage src={"/logo.png"}></AvatarImage>
              </Avatar>
              <div className="flex flex-col h-max text-background">
                <h1 className="text-3xl font-bold">Enum marketplace</h1>
                <p className="text-xs">
                  Developed as portfolio project of swedka121
                </p>
              </div>
            </div>
          </article>
          <nav className="p-4 flex flex-col gap-2">
            <h2 className="text-2xl text-background">Menu</h2>
            <Link href="/" className="text-white">
              - Home
            </Link>
            <Link href="/catalog" className="text-white">
              - Catalog
            </Link>
            <Link href="/login" className="text-white">
              - Login
            </Link>
            <Link href="/privacy" className="text-white">
              - Privacy policy
            </Link>
            <Link href="/terms" className="text-white">
              - Terms of use
            </Link>
          </nav>
          <nav className="p-4 flex flex-col gap-2">
            <h2 className="text-2xl text-background">Social media</h2>
            <Link href="https://github.com/Swedka121" className="text-white">
              - My github
            </Link>
            <Link href="https://swedka121.com" className="text-white">
              - Portfolio website
            </Link>
          </nav>
        </section>
        <p className="mt-auto text-background p-6">
          &copy; 2026 Enum Marketplace. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
