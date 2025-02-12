"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewContentBtn = () => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-4 lg:min-w-72 w-full lg:w-auto cursor-pointer">
          <CirclePlus />
          <span>Ajouter</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Choisir votre nouvelle publication`}</DialogTitle>
          <DialogDescription>
            Choisissez le type de publication que vous souhaitez ajouter à votre
            liste.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full py-4 flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/contenus/manga/ajouter")}
            className="flex items-center gap-4 w-full h-12 px-4 border rounded-md text-sm cursor-pointer"
          >
            Manga
            <span className="ml-2 text-gray-500">Ajouter un manga</span>
          </button>
          <button
            onClick={() => router.push("/contenus/webtoon/ajouter")}
            className="flex items-center gap-4 w-full h-12 px-4 border rounded-md text-sm cursor-pointer"
          >
            WebToon
            <span className="ml-2 text-gray-500">Ajouter un WebToon</span>
          </button>
          <button
            onClick={() => router.push("/contenus/ln/ajouter")}
            className="flex items-center gap-4 w-full h-12 px-4 border rounded-md text-sm cursor-pointer"
          >
            Light Novel
            <span className="ml-2 text-gray-500">Ajouter une Light Novel</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewContentBtn;
