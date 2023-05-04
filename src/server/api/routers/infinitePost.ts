import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { timelineOptions } from "@/utils/timelineOptions";

export const infinitePost = createTRPCRouter({
  infinitePost: publicProcedure
    .input(
      z.object({
        options: timelineOptions,
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, options } = input;
      const { limit, sort, filters } = options;

      const items = await ctx.prisma.blockPost.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: filters,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: sort },
        include: {
          author: true,
          // upVotes: true,
        },
      });

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
