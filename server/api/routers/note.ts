import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const noteRouter = createTRPCRouter({
  // [GET] /api/trpc/note.list
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.note.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { updatedAt: 'desc' },
    })
  }),

  // [GET] /api/trpc/note.getById
  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.note.findFirst({
      where: { id: input.id, userId: ctx.session.user.id },
    })
  }),

  // [POST] /api/trpc/note.create
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: { ...input, userId: ctx.session.user.id },
      })
    }),

  // [POST] /api/trpc/note.update
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: input,
      })
    }),
})
