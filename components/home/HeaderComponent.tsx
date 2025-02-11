"use client";
import { cn } from "@/lib/utils";
import { HomeLinksPage, ProfileUserPages } from "@/utils/data";
import { AlignJustify, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import DropDownMenuComponent from "../DropDownMenuComponent";
import { signOut, useSession } from "next-auth/react";
import AvatarUser from "../AvatarUser";
import SheetComponent from "../SheetComponent";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="w-full transition-all duration-300 ease-in-out ">
      {/* container */}
      <div className="flex items-center  mx-auto p-4 gap-6 xl:gap-8">
        {/* logo */}
        <Link href={"/"} className="font-bold text-2xl flex gap-1 group">
          <span
            className="group-hover:text-primary transition-all duration-500 ease-in-out
          "
          >
            Servi
          </span>
          <span
            className="text-primary group-hover:text-black dark:group-hover:text-white
          transition-all duration-500 ease-in-out font-serif font-extrabold
          "
          >
            Toons
          </span>
        </Link>

        {/* rest of  */}
        <div className="flex-1 md:flex items-center gap-6 xl:gap-8 hidden">
          {/* Link search */}
          <Link
            href={"#"}
            className="flex px-2 py-1 rounded-lg border border-gray-300 flex-1 max-w-[250px]
            xl:max-w-[300px] 2xl:max-w-[400px]
            text-sm items-center gap-2
            cursor-text
            "
          >
            <Search className="opacity-85" />
            <span className="opacity-65">Recherche...</span>
          </Link>

          {/* Nav home page*/}
          <nav className=" flex items-center gap-4">
            {HomeLinksPage.map((lk, idx) => (
              <Link
                key={idx}
                href={lk.href}
                className={cn(
                  "hover:text-primary hover:opacity-75 transition-all duration-500 ease-in-out",
                  lk.href === "/" ? "text-primary" : "text-black"
                )}
              >
                <span>{lk.label}</span>
              </Link>
            ))}
          </nav>

          {/* profile and logout */}
          <div className="ml-auto">
            {user && (
              <DropDownMenuComponent
                triggerComponent={
                  <AvatarUser avatar={user.image} username={user.name} />
                }
                dataLinks={ProfileUserPages}
                title="Mon profile"
              />
            )}
          </div>
        </div>

        {/* Small nav menu */}
        <div className="md:hidden ml-auto">
          <SheetComponent
            triggerComponent={<OpenMenuSmallScreen />}
            content={<SmallScreenNavComponent />}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

const OpenMenuSmallScreen = () => {
  return <AlignJustify />;
};

const SmallScreenNavComponent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const router = useRouter();

  const logUserOut = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur de déconnexion",
        description: "Veuillez réessayer plus tard!",
      });
    }
  };

  return (
    <div className=" flex flex-col items-center gap-8 w-full min-h-[75dvh]">
      {/* navigation */}
      <nav className="flex flex-1 flex-col items-center gap-4 w-full h-full border-b">
        {HomeLinksPage.map((lk, idx) => (
          <Link
            key={idx}
            href={lk.href}
            className={cn(
              "hover:opacity-75 hover:bg-primary transition-all duration-500 ease-in-out",
              lk.href === "/" ? "bg-primary text-white" : "text-black",
              "flex items-center w-full p-2 gap-4 rounded-lg"
            )}
          >
            {lk.icon && <lk.icon />}
            <span>{lk.label}</span>
          </Link>
        ))}
      </nav>

      {/* profile and logout */}
      <div className="mt-auto w-full flex flex-col gap-6">
        {user && (
          <DropDownMenuComponent
            triggerComponent={
              <div className="w-full flex items-center gap-4">
                <AvatarUser avatar={user.image} username={user.name} />
                <div className="flex flex-col flex-1 text-left">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs opacity-75">{user.email}</span>
                </div>
              </div>
            }
            dataLinks={ProfileUserPages}
            title="Mon profile"
          />
        )}

        {user && (
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={logUserOut}
          >
            Déconnexion
          </Button>
        )}

        {!user && (
          <Button asChild className="w-full">
            <Link href={"/connexion"}>Se connecter</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
