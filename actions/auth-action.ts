// actions/auth-action.ts
"use server";
import { auth, signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    revalidatePath("/");
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "Email ou mot de passe incorrect." };
        default:
          return {
            error: true,
            message:
              "Email ou mot de passe incorrect. Creer un nouveau compte si vous en avez pas!",
          };
      }
    }
    console.error("Authentication error:", error);
    return {
      error: true,
      message: "Une erreur est survenue lors de l'authentification.",
    };
  }
}

export async function createNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isUserExist) {
      return "Cet email est déjà utilisé.";
    }

    const hashedPassword = await hash(password, 10);
    const name = email && email.replace(/@.*/, "");

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    console.log(newUser.name);
  } catch (error) {
    console.error("Authentication error:", error);
    return "Une erreur est survenue lors de l'inscription.";
  }
}

export const getUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user || null;
};
