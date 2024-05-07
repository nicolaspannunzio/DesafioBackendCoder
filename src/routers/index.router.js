import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

import cartsRouter from "./api/cart.api.js";


const router = Router();

router.use("/users", apiRouter);
router.use("/cart", cartsRouter);

router.use("/api", apiRouter);
router.use("/", viewsRouter);

export default router;