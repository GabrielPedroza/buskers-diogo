import { createTRPCRouter } from "~/server/api/trpc";
import { buskersRouter } from "~/server/api/routers/buskers";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  buskers: buskersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
