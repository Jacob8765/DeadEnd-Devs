import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const myExampleRouter = createTRPCRouter({
  input: publicProcedure
    .input(z.object({ text: z.string().optional() }))
    .query(({ input }) => {
      return { text: `Hi ${input.text || 'World'}` };
    }),

    secret: protectedProcedure.query(() => {
        return 'Secret message'
    })
});
