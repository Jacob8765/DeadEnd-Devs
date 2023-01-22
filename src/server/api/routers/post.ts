import { codeSchema } from "../../../pages/components/Post";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const post = createTRPCRouter({
  createPost: protectedProcedure
    .input(codeSchema)
    .mutation(({ ctx, input }) => {
      const { code: text } = input;
      const { prisma, session } = ctx;
      const userID = session.user.id;
      return prisma.blockPost.create({
        data: {
          text,
          author: {
            connect: {
              id: userID,
            },
          },
        },
      });
    }),
});
