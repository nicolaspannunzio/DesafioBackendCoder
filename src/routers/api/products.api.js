import { Router } from "express";
//import productsManager from "../../data/fs/ProductsManager.fs.js";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";

const productsRouter = Router();

productsRouter.post("/:", create);
productsRouter.get("/", read);
productsRouter.get("/:id", readOne);
productsRouter.put("/:id", update);
productsRouter.delete("/:id", destroy);

async function create(req, res) {
  try {
    const { photo, title, category, price, stock } = req.body;
    const data = { photo, title, category, price, stock };
    const created = await productManager.create(data);
    return res.status(201).json({
      response: created,
      success: true,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Coder api error",
    });
  }
}

async function read(req, res) {
  try {
    const { category } = req.query;
    const all = await productManager.read(category);
    if (all) {
      return res.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
}

async function readOne(req, res) {
  try {
    const { id } = req.params;
    const one = await productManager.readOne(id);
    if (one != null) {
      return res.status(200).json({
        response: one,
        id,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const one = await productManager.update(id, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Coder api error",
    });
  }
}

async function destroy(req, res) {
  try {
    const { photo, title, category, price, stock } = req.params;
    const one = await productManager.destroy({
      photo,
      title,
      category,
      price,
      stock,
    });

    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Coder api error",
    });
  }
}

export default productsRouter;
