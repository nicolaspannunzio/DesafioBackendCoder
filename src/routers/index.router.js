import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import cartsRouter from "./api/carts.router.api.js";

const router = Router();

router.use("/users", apiRouter);
router.use("/products", viewsRouter);
router.use("/cart", cartsRouter);

export default router;