import { createTRPCRouter } from "./trpc";
import "module-alias/register";
import { post } from "./routers/post";
import { user } from "./routers/user";
import { infinitePost } from "./routers/infinitePost";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  post,
  infinitePost,
  user,
});

// export type definition of API
export type AppRouter = typeof appRouter;
