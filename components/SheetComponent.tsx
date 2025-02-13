"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

type Props = {
  triggerComponent: React.JSX.Element;
  title?: string;
  description?: string;
  content: React.JSX.Element;
  side?: SideType;
  variant?: "default" | "destructive" | "outline";
  classNameBTn?: string;
};
type SideType = "left" | "right";

const SheetComponent = ({
  triggerComponent,
  title,
  description,
  content,
  side,
  classNameBTn,
  variant = "default",
}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={variant} className={`${classNameBTn}`}>
          {triggerComponent}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full h-dvh overflow-y-auto overflow-x-hidden"
        side={side}
      >
        <SheetHeader>
          <SheetTitle hidden={!title}>{title}</SheetTitle>
          <SheetDescription hidden={!description}>
            {description}
          </SheetDescription>
        </SheetHeader>

        <div className="pt-4">{content}</div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
