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

type Props = {
  triggerComponent: React.JSX.Element;
  title?: string;
  description?: string;
  content: React.JSX.Element;
  side?: SideType;
};
type SideType = "left" | "right";
const SheetComponent = ({
  triggerComponent,
  title,
  description,
  content,
  side,
}: Props) => {
  return (
    <Sheet>
      <SheetTrigger>{triggerComponent}</SheetTrigger>
      <SheetContent
        className="w-full min-h-dvh overflow-y-auto overflow-x-hidden"
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
