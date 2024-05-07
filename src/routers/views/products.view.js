import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await productsManager.read();
      return res.render("products", { title: "Products", products });
    } catch (error) {
      return next(error);
    }
  });

productsRouter.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const one = await productsManager.readOne(id);
      return res.render("details", { title: "DETAILS", products: one });
    } catch (error) {
      return next(error);
    }
  });
  


export default productsRouter;