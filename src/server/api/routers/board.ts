import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { boardGroup } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), boardColour: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(boardGroup).values({
        statusName: input.name,
        boardColour: input.boardColour,
      })
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(boardGroup)
        .set({ statusName: input.name })
        .where(eq(boardGroup.id, input.id))
    }),

  getBoardGroups: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.boardGroup.findMany({
      orderBy: (boardGroup, { asc }) => [asc(boardGroup.createdAt)],
    })
  }),
})
