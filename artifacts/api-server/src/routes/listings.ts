import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { listingsTable, storesTable, categoriesTable, wilayasTable } from "@workspace/db/schema";
import { eq, and, like, gte, lte, sql, desc, type SQL } from "drizzle-orm";

const router: IRouter = Router();

router.get("/listings", async (req, res) => {
  try {
    const {
      categoryId,
      wilayaId,
      storeId,
      minPrice,
      maxPrice,
      search,
      featured,
      page = "1",
      limit = "24",
    } = req.query;

    const conditions: SQL[] = [];
    if (categoryId) conditions.push(eq(listingsTable.categoryId, Number(categoryId)));
    if (wilayaId) conditions.push(eq(listingsTable.wilayaId, Number(wilayaId)));
    if (storeId) conditions.push(eq(listingsTable.storeId, Number(storeId)));
    if (minPrice) conditions.push(gte(listingsTable.price, Number(minPrice)));
    if (maxPrice) conditions.push(lte(listingsTable.price, Number(maxPrice)));
    if (search) conditions.push(like(listingsTable.title, `%${search}%`));
    if (featured === "true") conditions.push(eq(listingsTable.isFeatured, true));

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(listingsTable)
      .where(whereClause);

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
      .where(whereClause)
      .orderBy(desc(listingsTable.isFeatured), desc(listingsTable.createdAt))
      .limit(limitNum)
      .offset(offset);

    res.json({
      listings,
      total: count,
      page: pageNum,
      totalPages: Math.ceil(count / limitNum),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch listings");
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

router.get("/listings/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [listing] = await db
      .select({
        id: listingsTable.id,
        title: listingsTable.title,
        titleAr: listingsTable.titleAr,
        description: listingsTable.description,
        price: listingsTable.price,
        currency: listingsTable.currency,
        imageUrl: listingsTable.imageUrl,
        images: listingsTable.images,
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
      .where(eq(listingsTable.id, id));

    if (!listing) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }

    await db
      .update(listingsTable)
      .set({ viewCount: (listing.viewCount ?? 0) + 1 })
      .where(eq(listingsTable.id, id));

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
      .where(eq(storesTable.id, listing.storeId))
      .groupBy(storesTable.id, wilayasTable.name, categoriesTable.name);

    const relatedListings = await db
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
      .where(and(eq(listingsTable.categoryId, listing.categoryId), sql`${listingsTable.id} != ${id}`))
      .limit(4);

    res.json({
      ...listing,
      images: listing.images ?? [],
      store,
      relatedListings,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch listing");
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

export default router;
