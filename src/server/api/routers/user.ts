import { createTRPCRouter, protectedProcedure } from "../trpc";

export const user = createTRPCRouter({
    getPosts: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.blockPost.findMany()
    })
})