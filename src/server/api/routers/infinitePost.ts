import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const infinitePost = createTRPCRouter({
  infinitePost: publicProcedure
    .input(
      z.object({
        limit: z.number().min(5).max(50).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await ctx.prisma.blockPost.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          author: {
            isNot: {
              email: ctx.session?.user?.email,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
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
