import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { storesTable, wilayasTable, categoriesTable, listingsTable } from "@workspace/db/schema";
import { eq, and, like, sql, type SQL } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stores", async (req, res) => {
  try {
    const { wilayaId, categoryId, search, featured } = req.query;

    const conditions: SQL[] = [];
    if (wilayaId) conditions.push(eq(storesTable.wilayaId, Number(wilayaId)));
    if (categoryId) conditions.push(eq(storesTable.categoryId, Number(categoryId)));
    if (search) conditions.push(like(storesTable.name, `%${search}%`));
    if (featured === "true") conditions.push(eq(storesTable.isFeatured, true));

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
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(
        storesTable.id,
        wilayasTable.name,
        categoriesTable.name
      )
      .orderBy(storesTable.isFeatured, storesTable.rating);

    res.json(stores);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stores");
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

router.get("/stores/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [store] = await db
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
        email: storesTable.email,
        website: storesTable.website,
        address: storesTable.address,
        logoUrl: storesTable.logoUrl,
        coverUrl: storesTable.coverUrl,
        openingHours: storesTable.openingHours,
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
      .where(eq(storesTable.id, id))
      .groupBy(storesTable.id, wilayasTable.name, categoriesTable.name);

    if (!store) {
      res.status(404).json({ error: "Store not found" });
      return;
    }

    const storeListings = await db
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
      .where(eq(listingsTable.storeId, id))
      .orderBy(listingsTable.createdAt);

    res.json({ ...store, listings: storeListings });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch store");
    res.status(500).json({ error: "Failed to fetch store" });
  }
});

export default router;
