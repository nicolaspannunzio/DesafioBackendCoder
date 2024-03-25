import express from "express";
import productsManager from "./fs/ProductsManager.fs.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen (port, ready);

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
 
server.get("/api/users/:photo/:email/:password/:role",
    async (req, res) => {
      try {
        const { photo, email, password, role } = req.params;
        const data = { photo, email, password, role };
        const one = await productsManager.create(data);
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
    }
  );

server.get(
  "/api/products/:photo/:title/:category/:price/:stock",
  async (req, res) => {
    try {
      const { photo, title, category, price, stock } = req.params;
      const data = { photo, title, category, price, stock };
      const one = await productsManager.create(data);
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
  }
);