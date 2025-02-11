"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <Button
      className="lg:px-3 px-4 py-2 lg:py-1 rounded-md text-sm hover:bg-gray-700 
      hover:text-white transition duration-300"
      onClick={toggleTheme}
      variant={"outline"}
    >
      {theme === "light" ? (
        <Moon className="fill-current" />
      ) : (
        <Sun className="fill-current" />
      )}
      <span className="lg:hidden">
        Changer de thème {theme === "light" ? "Sombre" : "Claire"}
      </span>
    </Button>
  );
};

export default ChangeTheme;
