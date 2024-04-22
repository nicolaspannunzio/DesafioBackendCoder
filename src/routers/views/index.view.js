import { Router } from "express";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";
import productsFormRouter from "./productsForm.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/productsForm", productsFormRouter)
viewsRouter.get("/", async (req, res, next) => {
  try {
    return res.render("index", { title: "HOME" });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;