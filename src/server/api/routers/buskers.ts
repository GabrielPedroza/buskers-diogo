import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const becomeBuskerSchema = z.object({
  description: z.string(),
});

export const isBuskerSchema = z.object({
  id: z.string().optional(),
});

export const buskersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.busker.findMany();
  }),

  becomeABusker: protectedProcedure
    .input(becomeBuskerSchema)
    .mutation(({ input, ctx }) => {
      const sessionUser = ctx.session.user;
      if (!sessionUser.name) return;
      return ctx.prisma.busker.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          name: sessionUser.name,
          description: input.description,
        },
      });
    }),

  isABusker: protectedProcedure
    .input(isBuskerSchema)
    .query(async ({ input, ctx }) => {
      if (!input.id) return false
      const busker = await ctx.prisma.busker.findUnique({
        where: {
          userId: input.id,
        },
      });

      return busker !== null;
    }),
});
