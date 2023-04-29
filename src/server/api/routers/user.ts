import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  timelineOptions,
  type TimelineOptions,
} from "../../../utils/timelineOptions";

export const user = createTRPCRouter({
  getPostsFromUser: protectedProcedure
    .input(timelineOptions)
    .query(({ ctx, input }) => {
      return ctx.prisma.blockPost.findMany({
        where: {
          ...input.filters,
        },
        orderBy: { createdAt: input.sort },
      });
    }),

  getFeed: publicProcedure.input(timelineOptions).query(({ ctx, input }) => {
    return ctx.prisma.blockPost.findMany({
      where: input.filters,
      orderBy: { createdAt: input.sort },
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
