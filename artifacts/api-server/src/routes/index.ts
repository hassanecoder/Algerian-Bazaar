import { Router, type IRouter } from "express";
import healthRouter from "./health";
import wilayasRouter from "./wilayas";
import categoriesRouter from "./categories";
import storesRouter from "./stores";
import listingsRouter from "./listings";
import searchRouter from "./search";

const router: IRouter = Router();

router.use(healthRouter);
router.use(wilayasRouter);
router.use(categoriesRouter);
router.use(storesRouter);
router.use(listingsRouter);
router.use(searchRouter);

export default router;
