"use server";

import { prisma } from "@/lib/prisma";
import {
  addContentSchema,
  addContentSecondSchema,
} from "@/schema/contentSchema";
import { z } from "zod";
import { getUser } from "./auth-action";
import { createSlug } from "@/utils/functions";

export type newContentType = z.infer<typeof addContentSchema>;

export const addNewContent = async (newContent: newContentType) => {
  const user = await getUser();

  if (!user) {
    return {
      error: true,
      message: "Veuillez vous connecter pour ajouter un contenu.",
      contentId: "",
    };
  }

  const validationResult = addContentSchema.safeParse(newContent);

  if (!validationResult.success) {
    // Retourner les erreurs Zod formatées

    console.log(validationResult.error.issues, "erreurs survenues");
    return {
      error: true,
      message: "Erreur de validation",
      contentId: "",
      errors: validationResult.error.issues, // Important: Retourner les erreurs Zod
    };
  }

  const validated = validationResult.data; // Utiliser les données validées

  const slug = createSlug(validated.title);
  const category = validated.category;

  const checkIfContentExists = await prisma.content.findFirst({
    where: {
      slug: slug,
      language: validated.language,
    },
  });

  if (checkIfContentExists) {
    return {
      error: true,
      message: `Un ${category} avec le même titre et la même langue existe déjà.`,
      contentId: "",
    };
  }

  const addContent = await prisma.content.create({
    data: {
      title: validated.title.toLowerCase().trim(),
      slug: slug,
      description: validated.description,
      tags: { set: validated.tags },
      category: validated.category,
      target: validated.target,
      authorId: user.id,
      language: validated.language,
      subtitle: validated.subtitle,
      isColored: validated.isColored,
      publishedAt: validated.publishedAt,
    },
  });

  if (!addContent) {
    return {
      error: true,
      message: ` Une erreur s'est produite lors de l'ajout du ${category}`,
      contentId: "",
    };
  }

  return {
    error: false,
    message: `Le ${category} a été ajouté avec succès.`,
    contentId: addContent.id,
  };
};

export type newContentSecondType = z.infer<typeof addContentSecondSchema>;

export const addNewContentSecond = async (
  newContentSecond: newContentSecondType
) => {
  const user = await getUser();

  if (!user) {
    return {
      error: true,
      message: "Veuillez vous connecter pour ajouter un contenu.",
      content: null,
    };
  }

  const validationResult = addContentSecondSchema.safeParse(newContentSecond);
  if (!validationResult.success) {
    console.log(validationResult.error.issues, "erreurs secondes survenues");
    // Retourner les erreurs Zod formatées
    return {
      error: true,
      message: "Erreur de validation",
      content: null,
      errors: validationResult.error.issues, // Important: Retourner les erreurs Zod
    };
  }

  const validated = validationResult.data; // Utiliser les données validées

  const content = await prisma.content.findFirst({
    where: {
      id: validated.contentId,
    },
  });

  if (!content) {
    return {
      error: true,
      message: "Le contenu n'existe pas.",
      content: null,
    };
  }

  const addContentSecond = await prisma.content.update({
    where: {
      id: validated.contentId,
    },
    data: {
      image: validated.image,
      cover: validated.cover !== undefined ? validated.cover : null,
      editor: validated.editor !== undefined ? validated.editor : null,

      //   additionalArtists: {
      //     create: validated.artist.map((artist) => ({
      //       artistName: artist[0],
      //       role: artist[1],
      //     })),
      //   },
    },
  });

  if (!addContentSecond) {
    return {
      error: true,
      message:
        "Une erreur s'est produite lors de l'ajout des images et des informations supplémentaires.",
      content: null,
    };
  }

  if (validated.artist.length > 0) {
    const additionalArtists = await prisma.additionalArtistInfo.create({
      data: {
        contentId: validated.contentId,
        artistName: validated.artist[0],
        role: validated.artist[1],
      },
    });

    if (!additionalArtists) {
      return {
        error: true,
        message: "Une erreur s'est produite réessayez plus tard!.",
        content: null,
      };
    }
  }

  return {
    error: false,
    message: `Le ${addContentSecond.category} a été ajouté avec succès.`,
    content: addContentSecond,
  };
};

// get the content with userId
export const getContentWIthUserId = async () => {
  const user = await getUser();

  if (!user) return [];

  const contents = await prisma.content.findMany({
    where: {
      authorId: user.id,
    },
    // include: {
    //   additionalArtists: true,

    // },
  });

  return contents || [];
};
