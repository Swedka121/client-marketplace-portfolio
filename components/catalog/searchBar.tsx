/** @format */

"use client";

import { SearchIcon } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function SearchBar({ className }: { className: ClassNameValue }) {
  const refInput = useRef<HTMLInputElement>(null);
  const refBar = useRef<HTMLDivElement>(null);
  const refIcon = useRef<SVGSVGElement>(null);
  const refPopover = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    node.style.width = (refBar.current?.clientWidth || 0) + 4 + "px";
  }, []);
  const [DialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    //change border color and color of icon when dialog is open
    if (!refBar.current || !refIcon.current) return;
    if (DialogOpen) {
      refBar.current.classList.replace("border-foreground", "border-accent");
      refBar.current.style.borderBottomLeftRadius = "0px";
      refBar.current.style.borderBottomRightRadius = "0px";
      refIcon.current.style.color = "var(--accent)";
    } else {
      refBar.current?.classList.replace("border-accent", "border-foreground");
      refBar.current.style.borderBottomLeftRadius = "";
      refBar.current.style.borderBottomRightRadius = "";
      refIcon.current.style.color = "var(--foreground)";
    }
  }, [DialogOpen]);

  return (
    <Popover open={DialogOpen} modal={false}>
      <section
        className={cn(
          "relative w-50 h-8 border-1 border-foreground rounded-lg cursor-pointer inset-border",
          className
        )}
        id="searchBar"
        aria-label="search"
        onClick={() => {
          refInput.current?.focus();
        }}
        ref={refBar}
      >
        <PopoverTrigger asChild>
          <div className="w-full h-full grid grid-cols-[--spacing(8)_1fr]">
            <div className="h-full flex items-center justify-center w-full">
              <SearchIcon size={16} ref={refIcon} />
            </div>
            <input
              ref={refInput}
              className="w-full text-sm font-light outline-none border-none pr-2"
              placeholder="Search something..."
              onFocus={() => {
                setDialogOpen(true);
              }}
              onBlur={() => {
                setDialogOpen(false);
              }}
            ></input>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="rounded-t-none"
          ref={refPopover}
          autoFocus={false}
          onOpenAutoFocus={(ev) => {
            ev.preventDefault();
          }}
        ></PopoverContent>
      </section>
    </Popover>
  );
}
