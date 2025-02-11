"use client";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LucideProps } from "lucide-react";

type DataLinksType = {
  href: string;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type DropdownMenuType = {
  dataLinks: DataLinksType[];
  triggerComponent: React.JSX.Element;
  title: string;
};

const DropDownMenuComponent = ({
  dataLinks,
  triggerComponent,
  title,
}: DropdownMenuType) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerComponent}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px]">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {
          dataLinks.map((lk, idx) => (
            <DropdownMenuItem key={idx} asChild>
              <Link href={lk.href} className="w-full flex items-center gap-4">
                {lk.icon && <lk.icon className="flex-shrink-0 size-7" />}
                <span className="flex-1 text-left">{lk.label}</span>
              </Link>
            </DropdownMenuItem>
          ))

          // Add more menu items as needed. For example:
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuComponent;
