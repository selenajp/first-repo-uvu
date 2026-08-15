import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const decks = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const cards = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deckId: integer().notNull().references(() => decks.id, { onDelete: "cascade" }),
  front: text().notNull(), // Question/prompt (e.g., "dog" or "When was the battle of hastings?")
  back: text().notNull(), // Answer (e.g., "anjing" or "1066")
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
