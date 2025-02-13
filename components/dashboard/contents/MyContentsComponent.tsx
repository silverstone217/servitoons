"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@prisma/client";
import { Bookmark, Eye, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import no_image from "@/public/images/no_image.png";
import { categoryType, targetType } from "@/types/contentTypes";
import SheetComponent from "@/components/SheetComponent";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/SelectComponent";
import {
  CategoriesData,
  LanguagesData,
  TagsData,
  TargetData,
} from "@/utils/data";
import { SheetClose } from "@/components/ui/sheet";

type Props = {
  myContents: Content[];
};
const MyContentsComponent = ({ myContents }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<categoryType | "all">("all");
  const [tag, setTag] = useState("all");
  const [language, setLanguage] = useState("all");
  const [target, setTarget] = useState<targetType | "all">("all");

  // filter the contents
  const filteredContents = useMemo(
    () =>
      myContents
        .filter(
          (item) =>
            item.title.includes(searchText.toLowerCase()) ||
            (item.subtitle && item.subtitle.includes(searchText.toLowerCase()))
        )
        .filter((item) =>
          category === "all" ? true : item.category.includes(category)
        )
        .filter((item) =>
          tag === "all" ? true : item.tags.some((t) => t === tag)
        ),

    [myContents, searchText, category, tag]
  );

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
        <FilterContentsComponent
          category={category}
          tag={tag}
          language={language}
          target={target}
          searchText={searchText}
          setCategory={setCategory}
          setTag={setTag}
          setLanguage={setLanguage}
          setTarget={setTarget}
          setSearchText={setSearchText}
        />
      </div>

      {/* content */}
      <div>Mes contenus</div>
      {filteredContents && filteredContents.length < 1 && (
        <p className="text-center opacity-65 mt-4">Aucun contenu trouvé!</p>
      )}
      <div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 
      xl:grid-cols-6 2xl:grid-cols-12 gap-6 w-full
      transition-all duration-500 ease-in-out
      "
      >
        {filteredContents &&
          filteredContents.length > 0 &&
          filteredContents.map((content, idx) => (
            <ItemCardContent key={idx} content={content} />
          ))}

        {filteredContents &&
          filteredContents.length > 0 &&
          filteredContents.map((content, idx) => (
            <ItemCardContent key={idx} content={content} />
          ))}

        {filteredContents &&
          filteredContents.length > 0 &&
          filteredContents.map((content, idx) => (
            <ItemCardContent key={idx} content={content} />
          ))}

        {filteredContents &&
          filteredContents.length > 0 &&
          filteredContents.map((content, idx) => (
            <ItemCardContent key={idx} content={content} />
          ))}
      </div>
    </div>
  );
};

export default MyContentsComponent;

// Item Card content component
export const ItemCardContent = ({ content }: { content: Content }) => {
  return (
    <div
      className="flex flex-col gap-4 w-full group transition-all duration-500 ease-in-out
    cursor-pointer
    "
    >
      {/* images */}
      <div
        className="relative w-full rounded-md transition-all 
      duration-500 ease-in-out overflow-hidden"
      >
        <Image
          src={content.image ?? no_image}
          width={800}
          height={800}
          alt={content.title}
          priority
          className=" h-52 w-full object-cover rounded-md
          transition-all duration-500 ease-in-out
          group-hover:scale-110
          "
        />
      </div>

      {/* info */}
      <div className="flex w-full flex-col gap-1.5">
        {/* title */}
        <h3 className="capitalize text-sm font-bold line-clamp-1">
          {content.title}
        </h3>

        {/* category and lang */}
        <div className="w-full text-sm flex items-center justify-between capitalize">
          <span>{content.category}</span>
          <span className="text-primary">{content.language}</span>
        </div>

        {/* Views and BookMarks */}
        <div className="w-full text-sm flex items-center justify-between">
          <p className="flex items-center gap-0.5">
            <Eye className="size-4" />
            <span>1400</span>
          </p>

          <p className="flex items-center gap-0.5">
            <Bookmark className="size-4" />
            <span>850</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Filter component
type FilterContentsType = {
  category: "all" | categoryType;
  tag: string;
  language: string;
  target: "all" | targetType;
  searchText: string;

  setCategory: React.Dispatch<React.SetStateAction<categoryType | "all">>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<targetType | "all">>;
};
const FilterContentsComponent = ({
  category,
  tag,
  language,
  target,
  // searchText,

  setCategory,
  setSearchText,
  setTag,
  setLanguage,
  setTarget,
}: FilterContentsType) => {
  // ...
  return (
    <SheetComponent
      triggerComponent={
        <div className="flex items-center gap-2 h-12">
          <span>Filtres</span>
          <SlidersHorizontal />
        </div>
      }
      variant="outline"
      title="Filtres"
      classNameBTn="h-12"
      content={
        <div className="w-full flex flex-col gap-4">
          {/* category */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="block text-sm font-medium">Catégorie</Label>
            <SelectComponent
              options={CategoriesData}
              onChange={(option) => setCategory(option as categoryType)}
              placeholder={"Choisir une catégorie..."}
              value={category}
            />
          </div>

          {/* tag */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="block text-sm font-medium">Tag</Label>
            <SelectComponent
              options={TagsData}
              onChange={(option) => setTag(option)}
              placeholder={"Choisir un tag..."}
              value={tag}
            />
          </div>

          {/* language */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="block text-sm font-medium">Langue</Label>
            <SelectComponent
              options={LanguagesData}
              onChange={(option) => setLanguage(option)}
              placeholder={"Choisir une langue..."}
              value={language}
            />
          </div>

          {/* target */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="block text-sm font-medium">Cible</Label>
            <SelectComponent
              options={TargetData}
              onChange={(option) => setTarget(option as targetType)}
              placeholder={"Choisir une cible..."}
              value={target}
            />
          </div>

          {/* button */}
          <div className="w-full flex items-center flex-wrap gap-4 mt-6">
            <Button
              className="w-full"
              onClick={() => {
                setSearchText("");
                setCategory("all");
                setTag("all");
                setLanguage("all");
                setTarget("all");
              }}
              variant={"secondary"}
            >
              Réinitialiser
            </Button>

            <SheetClose asChild>
              <Button
                className="w-full"
                onClick={() => console.log("Apply filter")}
              >
                Fermer
              </Button>
            </SheetClose>
          </div>
        </div>
      }
    />
  );
};
