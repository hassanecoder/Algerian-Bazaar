import { pgTable, serial, text, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { wilayasTable } from "./wilayas";
import { categoriesTable } from "./categories";

export const storesTable = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description").notNull(),
  wilayaId: integer("wilaya_id").references(() => wilayasTable.id).notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id).notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  website: text("website"),
  address: text("address").notNull(),
  logoUrl: text("logo_url"),
  coverUrl: text("cover_url"),
  openingHours: text("opening_hours"),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  isVerified: boolean("is_verified").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertStoreSchema = createInsertSchema(storesTable).omit({ id: true, createdAt: true });
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof storesTable.$inferSelect;
