import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const feedback = sqliteTable("feedback", {
  id: integer().primaryKey({ autoIncrement: true }),
  message: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const insertFeedbackSchema = createInsertSchema(feedback, {
  message: z.string().min(1).max(1000),
}).omit({
  id: true,
  createdAt: true,
});
