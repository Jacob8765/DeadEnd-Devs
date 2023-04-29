import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { timelineFilters } from "../../../utils/timelineFilters";

export const infinitePost = createTRPCRouter({
  infinitePost: publicProcedure
    .input(
      timelineFilters
    )
    .query(async ({ ctx, input }) => {
      const { cursor, filters, sort, limit } = input;
      const items = await ctx.prisma.blockPost.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          author: {
            isNot: {
              email: ctx.session?.user?.email,
            },
            ...filters,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {createdAt: sort},
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
      console.log("items", items);

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
