import {
  handleHasUpVotedSchema,
  handleVoteSchema,
} from "@/src/components/Vote";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const handleVote = createTRPCRouter({
  mutateVotes: publicProcedure
    .input(handleVoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { typeOfVote, postID, userID } = input;

      await ctx.prisma.vote.create({
        data: {
          typeOfVote,
          postVoted: {
            connect: { id: postID },
          },
          user: {
            connect: { id: userID },
          },
        },
      });

      await ctx.prisma.blockPost.update({
        where: {
          id: postID,
        },
        data: {
          voteState: {
            increment: typeOfVote === "up" ? 1 : -1,
          },
        },
      });
    }),

  hasUpVoted: publicProcedure
    .input(handleHasUpVotedSchema)
    .query(async ({ ctx, input }) => {
      const { userID, postID } = input;

      const vote = await ctx.prisma.vote.findFirst({
        where: {
          userID: userID as string,
          postID: postID,
          typeOfVote: "up",
        },
      });

      return !!vote;
    }),

  // removeVote: publicProcedure
  // .input(handleVoteSchema)
  // .mutation(async ({ ctx, input }) => {
  //   const typeOf = input.typeofVote;

  //   await ctx.prisma.vote.delete({
  //     where: {
  //       authorId_postId: {
  //         authorId: input.userId,
  //         postId: input.postId,
  //       },
  //     },
  //   });

  //   return ctx.prisma.blockPost.update({
  //     where: {
  //       id: input.postId,
  //     },
  //     data: {
  //       voteState: {
  //         increment: typeOf === "up" ? -1 : 1,
  //       },
  //     },
  //   });
  // }
  // ),
});
