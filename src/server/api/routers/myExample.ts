import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const myExampleRouter = createTRPCRouter({
  input: publicProcedure
    .input(z.object({ text: z.string().optional() }))
    .query(({ input }) => {
      return { text: `Hi ${input.text || "World"}` };
    }),
    
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        name: {
          contains: 'Gabriel'
        }
      }
    })
  }),

  removeAll: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.deleteMany({
      where: {
        name: {
          contains: "Gabriel",
        },
      },
    });
  }),

  secret: protectedProcedure.query(() => {
    return "Secret message";
  }),
});
