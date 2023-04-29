import { z } from "zod";

export const postContent = z.object({
  post: z.object({
    description: z.string(),
    leftBlock: z.string(),
    rightBlock: z.string().nullish(),
  }),
});

export type PostContent = z.infer<typeof postContent>;
