import { z } from "zod";

export const addContentSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  tags: z.array(z.string().min(1)).max(5),
  //   author: z.string().min(1).max(100),

  language: z.string().min(2).max(10),
  target: z.enum(["seinen", "shonen", "shojo", "josei", "kodomo"]),

  category: z.enum(["manga", "webtoon", "light_novel"]),
  publishedAt: z.date(),

  isColored: z.boolean(),
  subtitle: z.string().max(100).optional(),
});

export const addContentSecondSchema = z.object({
  image: z.string().url(),
  cover: z.string().url().optional(),
  contentId: z.string(),

  editor: z.string().optional(),
  artist: z.tuple([z.string(), z.string()]),
});
