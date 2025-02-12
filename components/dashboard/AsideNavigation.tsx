"use client";
import React from "react";
import LogoApp from "../LogoApp";
import { ProfileUserPages } from "@/utils/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import AvatarUser from "../AvatarUser";
import { Button } from "../ui/button";
import ChangeTheme from "../ChangeTheme";
import { MailIcon, Rss } from "lucide-react";

const AsideNavigation = () => {
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
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 min-w-[200px] max-w-[300px] 
    bg-secondary h-full overflow-x-hidden overflow-y-hidden py-4 gap-4"
    >
      {/* logo top*/}
      <Link href={"/"} className="px-4">
        <LogoApp />
      </Link>

      {/* nav */}
      <div className="flex-1 w-full border-y flex flex-col gap-4 p-4">
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

      {/* bottom */}
      <div className="mt-auto p-4 flex flex-col gap-4 w-full">
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

        {/* name */}
        {user && (
          <div className="w-full flex items-center gap-4">
            <AvatarUser avatar={user.image} username={user.name} />
            <div className="flex flex-col flex-1 text-left">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs opacity-75">{user.email}</span>
            </div>
          </div>
        )}

        {/* change theme */}
        <ChangeTheme />

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
    </aside>
  );
};

export default AsideNavigation;
