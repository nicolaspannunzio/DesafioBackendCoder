import { Router } from "express";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await productsManager.read();
      return res.render("products", { title: "Products", products });
    } catch (error) {
      return next(error);
    }
  });

productsRouter.get("/productsForm", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    return res.render("productsForm", { title: "PRODUCTSFORM"})
  } catch (error) {
    return next(error)
  }
})

productsRouter.get("/productDetail/:id", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    return res.render("productDetails", { title: "DETAILS"})
  } catch (error) {
    return next(error)
  }
})
  


export default productsRouter;