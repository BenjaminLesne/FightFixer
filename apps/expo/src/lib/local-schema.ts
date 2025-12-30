import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const fights = sqliteTable("fights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  partner: text("partner"),
  date: text("date").notNull(),
  name: text("name"),
  whatHappened: text("what_happened"),
  myPov: text("my_pov"),
  perceivedPartnerPov: text("perceived_partner_pov"),
  intensity: integer("intensity"),
  seriousness: integer("seriousness"),
  conclusion: text("conclusion"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Fight = typeof fights.$inferSelect;
export type NewFight = typeof fights.$inferInsert;
