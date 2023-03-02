import { codeSchema } from "../../../pages/components/Post";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const post = createTRPCRouter({
  createPost: protectedProcedure
    .input(codeSchema)
    .mutation(({ ctx, input }) => {
      const { code: text, markdownOne, markdownTwo} = input;
      const { prisma, session } = ctx;
      const userID = session.user.id;
      return prisma.blockPost.create({
        data: {
          text,
          leftBlock: markdownOne,
          rightBlock: markdownTwo,
          author: {
            connect: {
              id: userID,
            },
          },
        },
      });
    }),
});
