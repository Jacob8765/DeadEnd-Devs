import { handleVoteSchema } from "@/src/components/Vote";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const handleVote = createTRPCRouter({
  mutateVotes: publicProcedure
    .input(handleVoteSchema)
    .mutation(async ({ ctx, input }) => {
      const typeOf = input.typeofVote;

      return ctx.prisma.blockPost.update({
        where: {
          id: input.postId,
        },
        data: {
          voteState: {
            increment: typeOf === "up" ? 1 : -1,
          },
        },
      });
    }),
});
