import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

const productsFormRouter = Router();

productsFormRouter.get("/", async (req, res, next) => {
    try {
      const products = await productsManager.read();
      return res.render("products", { title: "Products", products });
    } catch (error) {
      return next(error);
    }
  });

productsFormRouter.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const one = await productsManager.readOne(id);
      return res.render("details", { title: "DETAILS", products: one });
    } catch (error) {
      return next(error);
    }
  });
  


export default productsFormRouter;