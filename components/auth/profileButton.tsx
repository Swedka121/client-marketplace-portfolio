/** @format */

import {
  HeartIcon,
  MailIcon,
  PlusIcon,
  ShoppingCartIcon,
  StopCircleIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import Link from "next/link";

const MENUS: {
  label: string;
  menu: {
    icon: ReactNode;
    name: string;
    action?: () => void;
    link?: string;
    destructive?: boolean;
  }[];
}[] = [
  {
    label: "Profile controls",
    menu: [
      {
        icon: <PlusIcon />,
        name: "Purchased assets",
        link: "/cart?tab=purchased",
      },
      {
        icon: <MailIcon />,
        name: "Subscribe to notifications",
        link: "/notifysub",
      },
      {
        icon: <StopCircleIcon />,
        name: "Don't sell my data",
        destructive: true,
      },
      { icon: <TrashIcon />, name: "Delete account", destructive: true },
    ],
  },
];

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <UserIcon /> Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {MENUS.map((el) => (
          <DropdownMenuGroup key={el.label}>
            <DropdownMenuLabel>{el.label}</DropdownMenuLabel>
            {el.menu.map((el2) => {
              if (el2.action) {
                return (
                  <DropdownMenuItem
                    className="focus:bg-foreground focus:text-background"
                    key={el2.name}
                    variant={el2.destructive ? "destructive" : "default"}
                    onClick={el2.action}
                  >
                    {el2.icon} {el2.name}
                  </DropdownMenuItem>
                );
              } else if (el2.link) {
                return (
                  <Link
                    href={el2.link}
                    key={el2.name}
                    className="focus:bg-foreground focus:text-background"
                  >
                    <DropdownMenuItem
                      className="focus:bg-foreground focus:text-background"
                      variant={el2.destructive ? "destructive" : "default"}
                    >
                      {el2.icon} {el2.name}
                    </DropdownMenuItem>
                  </Link>
                );
              } else
                return (
                  <DropdownMenuItem
                    className="focus:bg-foreground focus:text-background"
                    key={el2.name}
                    variant={el2.destructive ? "destructive" : "default"}
                  >
                    {el2.icon} {el2.name}
                  </DropdownMenuItem>
                );
            })}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
