import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import productsManager from "./src/data/fs/ProductsManager.fs.js";
import userManager from "./src/data/fs/UsersManager.fs.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

server.engine("hanlenbars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(__dirname + "public"));

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

//? endpoints users and products
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
