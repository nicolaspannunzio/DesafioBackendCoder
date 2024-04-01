import { Router } from "express";
import { userManager } from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", read());
usersRouter.get("/:", readOne());
usersRouter.post("/:", create);
usersRouter.put("/", update);
usersRouter.delete("/", destroy);

//? create users
server.get(
  "/api/users/:photo/:email/:password/:role",
  async function create(req, res, next) {
    try {
      const { photo, email, password, role } = req.params;
      const data = { photo, email, password, role };
      const one = await userManager.create(data);
      return res.status(201).json({
        response: one,
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//? Filter by role with users
server.get("/api/users", async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await userManager.read(role);
    if (all) {
      return res.status(200).json({
        response: all,
        role,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//? method readOne() with users
server.get("/api/users/:id", async function readOne(req, res, next) {
  try {
    const { id } = req.params;
    const one = await userManager.readOne(id);
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
    return next(error);
  }
});

// create a product
server.get(
  "/api/products/:photo/:title/:category/:price/:stock",
  async (req, res) => {
    try {
      const { photo, title, category, price, stock } = req.params;
      const data = { photo, title, category, price, stock };
      const created = await productsManager.create(data);
      return res.status(201).json({
        response: created,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        response: "error",
        success: false,
      });
    }
  }
);

// Filter by Category

server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
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
});

server.get("/api/products/:id", async (req, res) => {
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
});

//? update and destroy users

async function update(req, res, next) {
  try {
    const { photo, email, password, role } = req.params;
    const data = { photo, email, password, role };
    const one = await userManager.update(data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { photo, email, password, role } = req.params;
    const one = await userManager.destroy({ photo, email, password, role });
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;