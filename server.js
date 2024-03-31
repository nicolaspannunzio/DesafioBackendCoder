import express from "express";
import productsManager from "./data/fs/ProductsManager.fs.js";
import userManager from "./data/fs/UsersManager.fs.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middlewares
server.use(express.urlencoded({ extended: true }));

//router
server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "Coder Api",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "Coder Api Error",
      success: false,
    });
  }
});

//? create users
server.get("/api/users/:photo/:email/:password/:role", async (req, res) => {
  try {
    const { photo, email, password, role } = req.params;
    const data = { photo, email, password, role };
    const one = await userManager.create(data);
    return res.status(201).json({
      response: one,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "error",
      success: false,
    });
  }
});

//? Filter by role with users
server.get("/api/users", async (req, res) => {
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
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

//? method readOne() with users
server.get("/api/users/:id", async (req, res) => {
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
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
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



//? Hacer correcciones
/* endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler); */