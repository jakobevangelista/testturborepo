import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
  datetime,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { DateTime } from "luxon";

import { mySqlTable } from "./_table";

export const post = mySqlTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

// declaring enum in database
export const rooms = mySqlTable("rooms", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  inviteCode: varchar("inviteCode", { length: 128 }).$defaultFn(() =>
    createId(),
  ),
  name: varchar("name", { length: 128 }),
  description: varchar("description", { length: 128 }),
});

export const roomsRelations = relations(rooms, ({ many }) => ({
  messages: many(message),
}));

export const message = mySqlTable("message", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text("message"),

  chatRoomId: varchar("chatRoomId", { length: 128 }),

  createdAt: datetime("createdAt").$defaultFn(() =>
    DateTime.now().setZone("America/Chicago").toJSDate(),
  ),
  updatedAt: datetime("updatedAt").$defaultFn(() =>
    DateTime.now().setZone("America/Chicago").toJSDate(),
  ),
});

export const messagesRelations = relations(message, ({ one }) => ({
  room: one(rooms, {
    fields: [message.chatRoomId],
    references: [rooms.id],
  }),
}));
