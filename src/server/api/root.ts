import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { myExampleRouter } from './routers/myExample'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  myExample: myExampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
