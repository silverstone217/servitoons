"use client";
import { ContentsData } from "@/utils/contentData";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Eye, Bookmark } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 rounded-md">
      {/* section 1 new content   */}
      <HeroFirstSectionNew />

      {/* section 2 popular manga */}
      <SecondSectionTrending />
    </div>
  );
};

export default HeroSection;

const HeroFirstSectionNew = () => {
  const [index, setIndex] = useState(0);

  const langs = useMemo(() => ContentsData[index].language.split(" "), [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ContentsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="lg:col-span-3 flex flex-col gap-4 
    transition-all duration-300 ease-in-out rounded-md overflow:hidden"
    >
      <h1 className="text-xl text-primary font-bold">
        <span>Nouveautés</span>
      </h1>

      {/* content */}
      <div
        className="rounded-md w-full flex-1 flex items-center justify-center relative transition-all 
      duration-300 ease-in-out overflow:hidden "
      >
        {/* image  */}
        <Image
          src={ContentsData[index].image}
          alt={ContentsData[index].title}
          width={2020}
          height={2080}
          placeholder="blur"
          blurDataURL={ContentsData[index].image.blurDataURL}
          className="w-full h-[500px] lg:h-[420px] object-cover rounded-md 
          transition-all duration-300 ease-in-out"
          priority
        />

        {/* infos in absolute div */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow:hidden
        flex flex-col gap-4 p-4 pb-10 lg:pb-6 text-white top-0 justify-end
        bg-gradient-to-r from-black/80 dark:to-black/30 to-40% to-black/20
        "
        >
          {/* category */}
          <p className="capitalize max-w-sm">
            <span className="capitalize max-w-sm">
              {ContentsData[index].category}
            </span>{" "}
            <span className="capitalize max-w-sm text-primary">
              {ContentsData[index].target}
            </span>
          </p>

          {/* title */}
          <h2 className="text-3xl text-white font-bold max-w-sm text-balance line-clamp-2">
            {ContentsData[index].title}
          </h2>

          {/* language */}
          <p className="text-gray-300 text-xs flex gap-2 items-center max-w-sm">
            {langs.map((lang, i) => (
              <span
                key={i}
                className="capitalize text-xs py-1 text-center border 
                bg-black/50 w-8 border-black/50 rounded"
              >
                {lang}
              </span>
            ))}
          </p>

          {/* tags */}
          <div className="text-xs flex gap-2 items-center max-w-sm">
            {ContentsData[index].tags.map((tag, i) => (
              <span
                key={i}
                className="capitalize text-xs text-center text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* desc */}
          <p className="text-gray-200 text-sm max-w-sm text-balance line-clamp-3">
            {ContentsData[index].description}
          </p>
        </div>

        {/* absolute dots */}
        <div
          className="absolute bottom-4 left-0 right-0 flex gap-2 items-center
        justify-center
        "
        >
          {ContentsData.map((_, i) => (
            <span
              key={i}
              className={`text-gray-400 text-xs cursor-pointer p-1 px-2 rounded 
                transition-all duration-300 ease-in-out
                ${i === index ? "bg-primary" : "bg-gray-400/40"}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecondSectionTrending = () => {
  return (
    <section className="col-span-1 flex flex-col gap-4 transition-all duration-300 ease-in-out rounded-md">
      <h1 className="text-xl text-primary font-bold">
        <span>Tendance</span>
      </h1>

      {/* new manga webtoon */}
      <div
        className="w-full flex-1 p-2 relative transition-all duration-300 ease-in-out 
      rounded-md dark:bg-slate-950 bg-slate-100"
      >
        {ContentsData.map((content, idx) => (
          <div key={idx} className="w-full flex gap-4 items-center p-2 ">
            <p className="text-primary">
              {(1 + idx).toString().padStart(2, "0")}
            </p>
            {/* img */}
            <Image
              src={content.image}
              alt={content.title}
              width={1800}
              height={1080}
              placeholder="blur"
              blurDataURL={content.image.blurDataURL}
              className="w-12 h-16 object-cover rounded-md 
              transition-all duration-300 ease-in-out"
              priority
            />
            {/* infos */}
            <div className="flex flex-col gap-1 text-xs flex-1">
              <h2 className="text-sm text-balance line-clamp-2">
                {content.title}
              </h2>
              <div className="flex items-end gap-4 ">
                <p className="flex items-end gap-2">
                  <Eye className="size-4" />
                  <span>{500 * (idx + 1)}</span>
                </p>

                <p className="flex items-end gap-2">
                  <Bookmark className="size-4" />
                  <span>{90 * (idx + 1)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
