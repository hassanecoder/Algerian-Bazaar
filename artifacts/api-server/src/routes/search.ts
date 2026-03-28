import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { listingsTable, storesTable, categoriesTable, wilayasTable } from "@workspace/db/schema";
import { eq, like, sql, or } from "drizzle-orm";

const router: IRouter = Router();

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ error: "Query parameter q is required" });
      return;
    }
    const searchTerm = `%${q}%`;

    const listings = await db
      .select({
        id: listingsTable.id,
        title: listingsTable.title,
        titleAr: listingsTable.titleAr,
        description: listingsTable.description,
        price: listingsTable.price,
        currency: listingsTable.currency,
        imageUrl: listingsTable.imageUrl,
        storeId: listingsTable.storeId,
        storeName: storesTable.name,
        categoryId: listingsTable.categoryId,
        categoryName: categoriesTable.name,
        wilayaId: listingsTable.wilayaId,
        wilayaName: wilayasTable.name,
        condition: listingsTable.condition,
        isFeatured: listingsTable.isFeatured,
        isNegotiable: listingsTable.isNegotiable,
        viewCount: listingsTable.viewCount,
        createdAt: sql<string>`${listingsTable.createdAt}::text`,
      })
      .from(listingsTable)
      .leftJoin(storesTable, eq(listingsTable.storeId, storesTable.id))
      .leftJoin(categoriesTable, eq(listingsTable.categoryId, categoriesTable.id))
      .leftJoin(wilayasTable, eq(listingsTable.wilayaId, wilayasTable.id))
      .where(or(like(listingsTable.title, searchTerm), like(listingsTable.description, searchTerm)))
      .limit(10);

    const stores = await db
      .select({
        id: storesTable.id,
        name: storesTable.name,
        nameAr: storesTable.nameAr,
        description: storesTable.description,
        wilayaId: storesTable.wilayaId,
        wilayaName: wilayasTable.name,
        categoryId: storesTable.categoryId,
        categoryName: categoriesTable.name,
        phone: storesTable.phone,
        address: storesTable.address,
        logoUrl: storesTable.logoUrl,
        coverUrl: storesTable.coverUrl,
        rating: storesTable.rating,
        reviewCount: storesTable.reviewCount,
        listingCount: sql<number>`cast(count(${listingsTable.id}) as int)`,
        isVerified: storesTable.isVerified,
        isFeatured: storesTable.isFeatured,
        createdAt: sql<string>`${storesTable.createdAt}::text`,
      })
      .from(storesTable)
      .leftJoin(wilayasTable, eq(storesTable.wilayaId, wilayasTable.id))
      .leftJoin(categoriesTable, eq(storesTable.categoryId, categoriesTable.id))
      .leftJoin(listingsTable, eq(listingsTable.storeId, storesTable.id))
      .where(like(storesTable.name, searchTerm))
      .groupBy(storesTable.id, wilayasTable.name, categoriesTable.name)
      .limit(5);

    res.json({
      listings,
      stores,
      total: listings.length + stores.length,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to search");
    res.status(500).json({ error: "Search failed" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const [listingsCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(listingsTable);
    const [storesCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(storesTable);
    const [wilayasCount] = await db.select({ count: sql<number>`cast(count(distinct ${listingsTable.wilayaId}) as int)` }).from(listingsTable);
    const [categoriesCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(categoriesTable);

    res.json({
      totalListings: listingsCount.count,
      totalStores: storesCount.count,
      totalWilayas: wilayasCount.count,
      totalCategories: categoriesCount.count,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
