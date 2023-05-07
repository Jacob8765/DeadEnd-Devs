import { z } from "zod";

const voteProps = z.object({
  postID: z.string(),
  votes: z.array(
    z.object({
      user: z.object({
        name: z.string().nullish(),
      }),
      typeOfVote: z.string(),
    })
  ),
});

export type VoteType = z.infer<typeof voteProps>;
