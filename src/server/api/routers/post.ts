import { codeSchema } from "@/components/Post";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const post = createTRPCRouter({
  createPost: protectedProcedure
    .input(codeSchema)
    .mutation(({ ctx, input }) => {
      const { description: text, editorBoxOne, editorBoxTwo } = input;
      const { prisma, session } = ctx;
      const userID = session.user.id;
      return prisma.blockPost.create({
        data: {
          text,
          leftBlock: editorBoxOne,
          rightBlock: editorBoxTwo,
          voteState: 0,
          author: {
            connect: {
              id: userID,
            },
          },
        },
      });
    }),
});
