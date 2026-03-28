import { pgTable, serial, text, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { storesTable } from "./stores";
import { categoriesTable } from "./categories";
import { wilayasTable } from "./wilayas";

export const listingsTable = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  currency: text("currency").notNull().default("DZD"),
  imageUrl: text("image_url"),
  images: text("images").array(),
  storeId: integer("store_id").references(() => storesTable.id).notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id).notNull(),
  wilayaId: integer("wilaya_id").references(() => wilayasTable.id).notNull(),
  condition: text("condition").notNull().default("new"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNegotiable: boolean("is_negotiable").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({ id: true, createdAt: true });
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listingsTable.$inferSelect;
