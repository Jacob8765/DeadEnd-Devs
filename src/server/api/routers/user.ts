import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { timelineFilters, type TimelineFilters } from "../../../utils/timelineFilters";

export const user = createTRPCRouter({
  getPostsFromUser: protectedProcedure
    .input(timelineFilters)
    .query(({ ctx, input }) => {
      return ctx.prisma.blockPost.findMany({
        where: {
          ...input.filters,
        },
        orderBy: {createdAt: input.sort}
      });
    }),

  getFeed: publicProcedure.input(timelineFilters).query(({ ctx, input }) => {
    return ctx.prisma.blockPost.findMany({
      where: {
        author: {
          isNot: {
            email: ctx.session?.user?.email,
          },
          ...input.filters,
        },
      },
      orderBy: {createdAt: input.sort},
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });
  }),
});
