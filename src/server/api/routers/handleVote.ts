import { handleVoteSchema } from "@/src/components/Vote";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const handleVote = createTRPCRouter({
  mutateVote: protectedProcedure
    .input(handleVoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { postID, typeOfVote } = input;

      const userID = session.user.id;

      const vote = await prisma.vote.findUnique({
        where: {
          userID_postID: {
            userID,
            postID,
          },
        },
      });

      if (vote && vote.typeOfVote === typeOfVote) {
        await prisma.vote.delete({
          where: {
            userID_postID: {
              userID,
              postID,
            },
          },
        });
      } else if (vote) {
        // If the user has already voted with the opposite typeOfVote, update their typeOfVote
        await prisma.vote.update({
          where: {
            userID_postID: {
              userID,
              postID,
            },
          },
          data: { typeOfVote },
        });
      } else {
        // If the user has not already voted, add their vote to the Votes table
        await prisma.vote.create({
          data: { postID, userID, typeOfVote },
        });
      }
    }),

  voteCount: protectedProcedure
    .input(
      z.object({
        postID: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postID } = input;

      const voteCounts = await prisma.vote.groupBy({
        by: ["typeOfVote"],
        where: { postID },
        _count: true,
      });

      const upvoteCount =
        voteCounts.find((count) => count.typeOfVote === "up")?._count ?? 0;

      const downvoteCount =
        voteCounts.find((count) => count.typeOfVote === "down")?._count ?? 0;

      return { upvoteCount, downvoteCount };
    }),
});
