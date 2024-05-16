import { Router } from "express";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

const productsRouter = Router();


productsRouter.get("/paginate", paginate);
productsRouter.get("/:id", readOne);
productsRouter.post("/", isValidAdmin, isText, create);
productsRouter.put("/:id", update);
productsRouter.delete("/:id", destroy);

async function create(req, res) {
  try {
    const { photo, title, category, price, stock } = req.body;
    const data = { photo, title, category, price, stock };
    const created = await productsManager.create(data);
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
// 


// async function read(req, res, next) {
//   try {
//     const { cat } = req.query;
//     let all;
//     if (cat) {
//       all = await productsManager.read({ cat });
//     } else {
//       all = await productsManager.read();
//     }
//     res.status(200).json({
//       statusCode: 200,
//       response: all,
//     });
//     const error = new Error("Not Found");
//     error.statusCode = 404;
//     throw error;
    
//   } catch (error) {
//     return next(error);
//   }
// }

productsRouter.get("/", async (req, res, next) => {
  try {
    const category = req.query.category;
    const products = await productsManager.read();
    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;
    const totalProducts = filteredProducts.length;

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No Products for Display",
      });
    }

    res.status(200).json({
      statusCode: 200,
      totalProducts: totalProducts,
      response: filteredProducts,
    });
  } catch (error) {
    return next(error);
  }
});





async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = { page: 1, limit: 9, lean: true, sort: { title: 1 } };
    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    const all = await productsManager.paginate({ filter, opts });
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        totalDocs: all.totalDocs,
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res) {
  try {
    const { id } = req.params;
    const one = await productsManager.readOne(id);
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
    const one = await productsManager.update(id, data);
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
    const one = await productsManager.destroy({
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