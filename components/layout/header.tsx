/** @format */

import { HomeIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SearchBar } from "../catalog/searchBar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LoginButton } from "../auth/loginButton";
import { CartButton } from "../cart/cartButton";
import { FavButton } from "../cart/favButton";
import { ProfileButton } from "../auth/profileButton";

const LINKS: { icon: ReactNode; name: string; link?: string }[] = [
  { icon: <HomeIcon size={20} />, name: "Home", link: "/" },
  { icon: <ListIcon size={20} />, name: "Catalog" },
];

export function NavLink({
  icon,
  name,
  link,
}: {
  icon: ReactNode;
  name: string;
  link?: string;
}) {
  return (
    <Link
      className="flex flex-row gap-2 items-center justify-center text-sm hover:text-accent w-20"
      href={link || `/${name.toLowerCase()}`}
    >
      {icon}
      {name}
    </Link>
  );
}

export function HeaderLogoGroup() {
  return (
    <Avatar className="h-11 w-11 my-auto">
      <AvatarImage src={"/logo.png"}></AvatarImage>
      <AvatarFallback>L</AvatarFallback>
    </Avatar>
  );
}

export function Header() {
  return (
    <header className="px-20 w-[80%] rounded-full h-14 bg-secondary fixed mt-4 ml-[10%] grid grid-rows-1 grid-cols-[1fr_2fr_1fr] gap-6">
      <nav className="w-full flex flex-row gap-6">
        <HeaderLogoGroup />
        {LINKS.map((el) => (
          <NavLink {...el} key="name" />
        ))}
      </nav>
      <SearchBar className="w-full my-auto" />
      <nav className="w-full flex items-center justify-end gap-6">
        <LoginButton preventCheckLogin={true}>
          <CartButton />
          <FavButton />
          <ProfileButton />
        </LoginButton>
      </nav>
    </header>
  );
}
