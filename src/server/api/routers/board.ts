import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { boardGroup, task } from '@/server/db/schema'
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

  deleteGroupAndTasks: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async trx => {
        await trx.delete(task).where(eq(task.boardGroupId, input.id))
        await trx.delete(boardGroup).where(eq(boardGroup.id, input.id))
      })
    }),

  getBoardGroups: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.boardGroup.findMany({
      orderBy: (boardGroup, { asc }) => [asc(boardGroup.createdAt)],
    })
  }),
})
