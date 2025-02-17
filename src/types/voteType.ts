import { z } from "zod";

const voteProps = z.object({
  postID: z.string(),
  voteCount: z.number(),
  myVote: z
    .object({
      id: z.string().optional(),
      typeOfVote: z.string(),
    })
    .nullable(),
});

export type VoteType = z.infer<typeof voteProps>;
