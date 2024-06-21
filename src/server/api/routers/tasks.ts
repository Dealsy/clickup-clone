import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { task } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), boardGroupId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(task).values({
        taskName: input.name,
        boardGroupId: input.boardGroupId,
      })
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(task).set({ taskName: input.name }).where(eq(task.id, input.id))
    }),

  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.task.findMany({
      orderBy: (task, { asc }) => [asc(task.createdAt)],
    })
  }),
})
