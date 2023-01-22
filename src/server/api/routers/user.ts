import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const user = createTRPCRouter({
  getPostsFromUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.blockPost.findMany({
      where: {
        authorID: ctx.session.user.id,
      },
    });
  }),

  getFeed: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blockPost.findMany({
      where: {
        author: {
          isNot: {
            email: ctx.session?.user?.email,
          },
        },
      },
    });
  }),
});
