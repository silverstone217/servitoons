"use client";
import React from "react";
import LogoApp from "../LogoApp";
import SheetComponent from "../SheetComponent";
import { OpenMenuSmallScreen } from "../home/HeaderComponent";
import { ProfileUserPages } from "@/utils/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import AvatarUser from "../AvatarUser";
import { Button } from "../ui/button";
import ChangeTheme from "../ChangeTheme";
import { MailIcon, Rss } from "lucide-react";

const HeaderSmallScreen = () => {
  return (
    <header className="lg:hidden w-full">
      <div className="w-full flex gap-4 p-4">
        {/* logo top*/}
        <Link href={"/"}>
          <LogoApp />
        </Link>

        {/* Menu open button */}
        <div className="ml-auto">
          <MenuOpen />
        </div>
      </div>
    </header>
  );
};

export default HeaderSmallScreen;

const MenuOpen = () => {
  return (
    <SheetComponent
      triggerComponent={<OpenMenuSmallScreen />}
      content={<SmallScreenNavComponentDashboard />}
    />
  );
};

const SmallScreenNavComponentDashboard = () => {
  const pathname = usePathname();
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
    <div className="flex flex-col gap-4 min-h-full justify-between ">
      {/* Links */}
      <div className="flex-1 w-full border-b flex flex-col gap-4 pb-4 pt-2 min-h-[50dvh]">
        {ProfileUserPages.map((lk, idx) => (
          <Link
            href={lk.href}
            key={idx.toString()}
            className={cn(
              "flex items-center gap-3 px-4 py-2 hover:bg-primary hover:opacity-75 w-full",
              "hover:text-white transition-all duration-500 ease-in-out",
              pathname.includes(lk.href) ? "text-white bg-primary" : "",
              "rounded-md"
            )}
          >
            {lk.icon && <lk.icon />} {/* icon */}
            <span>{lk.label}</span>
          </Link>
        ))}
      </div>

      {/* second part */}
      {/* bottom */}
      <div className="mt-auto py-4 flex flex-col gap-4 w-full">
        {/* other links */}
        <div className="my-2 flex flex-col gap-4 w-full">
          {/* blog */}
          <Link href={"#"} className="flex items-center gap-3 px-4 py-2">
            <Rss />
            <span>Blog</span>
          </Link>
          {/* contact */}
          <Link href={"#"} className="flex items-center gap-3 px-4 py-2">
            <MailIcon />
            <span>Contact</span>
          </Link>
        </div>

        {/* change theme */}
        <ChangeTheme />

        {/* name */}
        {user && (
          <div className="w-full flex items-center gap-4 mt-2">
            <AvatarUser avatar={user.image} username={user.name} />
            <div className="flex flex-col flex-1 text-left">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs opacity-75">{user.email}</span>
            </div>
          </div>
        )}

        {/* sign out */}
        {user && (
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={logUserOut}
          >
            Déconnexion
          </Button>
        )}

        {/* sign in */}
        {!user && (
          <Button asChild className="w-full">
            <Link href={"/connexion"}>Se connecter</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
