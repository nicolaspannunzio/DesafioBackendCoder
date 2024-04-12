import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import path from "path";
import multer from "./src/middlewares/multer.mid.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
const nodeServer = createServer(server);
//server.listen(port, ready);
nodeServer.listen(port, ready);

//server TCP
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);

//handlebars
server.engine("hanlenbars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(
  "/css/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);

server.use(
  "/js/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

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

//image & form
 server.post("/multer.mid", multer.single("photo"), (req, res) => {
   res.send(req.file.filename);
 });

//? endpoints users and products
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);