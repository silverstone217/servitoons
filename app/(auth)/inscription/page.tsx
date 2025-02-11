import React from "react";
import manga1 from "@/public/images/manga3.jpg";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import { getUser } from "@/actions/auth-action";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/");
  }
  return (
    <main className="w-full min-h-dvh overflow-hidden grid md:grid-cols-2 grid-cols-1 gap-2 p-2 rounded-lg">
      {/* design imgs text */}
      <div className="dark:bg-gray-800 bg-gray-200 w-full h-full md:flex hidden rounded-lg relative">
        <Image
          src={manga1}
          alt="manga"
          width={2020}
          height={2080}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAAAaAXevAAAAD0lEQVR42mNk+P7eAAAAASUVORK5CYII="
          className="w-full h-full object-cover rounded-md"
        />

        {/* absolute text div */}
        <div className="absolute left-0 right-0 bottom-0 flex flex-col gap-3 p-4 pb-8 bg-black/10">
          <h1
            className="text-4xl font-bold text-primary
              "
          >
            Servi Toons
          </h1>
          <p className="text-pretty text-gray-300">
            Créer un compte pour commencer à lire vos mangas, light novels et
            web comics préférés.
          </p>
        </div>
      </div>

      {/* form */}
      <LoginForm />
    </main>
  );
};

export default SignUpPage;
