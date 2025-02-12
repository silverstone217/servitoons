"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const MyContentsComponent = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex flex-col gap-6">
      {/* header search filter */}
      <div className="flex items-center gap-4 w-full">
        {/* text-search */}
        <Input
          placeholder="Rechercher..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 h-12 px-4 border rounded-md max-w-xl"
          type="search"
          autoComplete="off"
          //   autoFocus
          disabled={false}
        />

        {/* button filter */}
        <Button variant={"outline"} className="flex items-center gap-2 h-12">
          <span>Filtres</span>
          <SlidersHorizontal />
        </Button>
      </div>

      {/* content */}
      <div>My contents</div>
    </div>
  );
};

export default MyContentsComponent;
