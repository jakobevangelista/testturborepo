import { z } from "zod";

import { desc, eq, schema } from "@t3test/db";
import { message, rooms } from "@t3test/db/schema/post";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.post.findMany({ orderBy: desc(schema.post.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.post.findFirst({
        where: eq(schema.post.id, input.id),
      });
    }),

  createRoom: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      await ctx.db.insert(rooms).values({
        name: input,
      });
      return await ctx.db.query.rooms.findFirst({
        where: eq(rooms.name, input),
      });
    }),

  getRooms: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.rooms.findMany();
  }),

  getMessages: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      console.log(input);
      return ctx.db.query.message.findMany({
        where: eq(message.chatRoomId, input),
      });
    }),

  sendMessage: publicProcedure
    .input(z.object({ roomId: z.string().min(1), message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(message).values({
        chatRoomId: input.roomId,
        content: input.message,
      });
    }),
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       content: z.string().min(1),
  //     }),
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.post).values(input);
  //   }),

  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
