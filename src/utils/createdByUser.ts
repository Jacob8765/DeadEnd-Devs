import { z } from "zod";

export const createdByUser = z.object({
  authorID: z.string(),
  author: z.object({
    name: z.string().nullish(),
    image: z.string().nullish(),
  }),
});

export type CreatedByUser = z.infer<typeof createdByUser>;
