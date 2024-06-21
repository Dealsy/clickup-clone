import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { boardGroup } from '@/server/db/schema'

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), boardColour: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(boardGroup).values({
        statusName: input.name,
        boardColour: input.boardColour,
      })
    }),

  getBoardGroups: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.boardGroup.findMany({
      orderBy: (boardGroup, { desc }) => [desc(boardGroup.createdAt)],
    })
  }),
})
