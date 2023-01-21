import { createTRPCRouter } from "./trpc";
import { myExampleRouter } from './routers/myExample'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  myExample: myExampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
