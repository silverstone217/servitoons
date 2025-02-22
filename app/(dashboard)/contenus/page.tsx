import { getUser } from "@/actions/auth-action";
import { getContentWIthUserId } from "@/actions/content-actions";
import AddNewContentBtn from "@/components/dashboard/contents/AddNewContentBtn";
import MyContentsComponent from "@/components/dashboard/contents/MyContentsComponent";
import { Button } from "@/components/ui/button";
import { Content } from "@prisma/client";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async () => {
  const user = await getUser();
  if (!user) {
    return (
      <div className="w-full pt-20 flex items-center justify-center flex-col gap-4">
        <div className="opacity-75">
          Vous devez vous connecter pour accéder à cette page.
        </div>
        <Button>
          <Link href={"/connexion"} className="w-72">
            Se connecter
          </Link>
        </Button>
      </div>
    );
  }

  const myContents = (await getContentWIthUserId()) as Content[];

  return (
    <main className="flex flex-col gap-10 w-full">
      {/* manga, wt, LN */}
      <div className="w-full flex flex-col gap-10">
        {/* Top and Add new one */}
        <div className="w-full flex flex-wrap gap-4 items-center justify-between max-w-7xl mx-auto">
          {/* text */}
          <h2 className="text-2xl text-primary font-bold text-pretty max-w-sm">
            Mes mangas, WebToons et Light Novels
          </h2>

          {/* button */}
          <AddNewContentBtn />
        </div>

        {/* manga, wt, ln */}
        <Suspense fallback={<p>Chargement...</p>}>
          <MyContentsComponent myContents={myContents} />
        </Suspense>
      </div>

      {/* Illustrations */}
    </main>
  );
};

export default page;
