import { getUser } from "@/actions/auth-action";
import AlertMessage from "@/components/AlertMessage";
import TabsAddNewContent from "@/components/dashboard/contents/TabsAddNewContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

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

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full gap-4 flex flex-col ">
        <h2 className="text-2xl font-bold text-pretty max-w-sm">
          Ajouter un nouveau manga.
        </h2>

        {/* alert msg */}
        <AlertMessage
          title="Info pertinente"
          message="Tous les champs avec un * sont obligatoires pour  continuer."
          type="info"
        />
      </div>

      {/* Tables forms */}
      <TabsAddNewContent />
    </div>
  );
};

export default page;
