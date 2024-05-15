import "dotenv/config.js";
import "dotenv/config.js";
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
import dbConnect from "./src/utils/dbConnect.util.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import fileStore from "session-file-store";
import MongoStore from "connect-mongo";


//console.log("todas las variables de entorno: " + process.env);
//console.log(process.env.MONGO_URI);

//server
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect();
};
const nodeServer = createServer(server);
//server.listen(port, ready);
nodeServer.listen(port, ready);

//server TCP
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

//handlebars
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use("/css/bootstrap", express.static(path.join(__dirname, "/public")));
server.use("/css/bootstrap", express.static(path.join(__dirname, "/public")));

server.use("/js/bootstrap", express.static(path.join(__dirname, "/public")));
server.use("/js/bootstrap", express.static(path.join(__dirname, "/public")));

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));
server.use(express.static(__dirname + "/public"));
server.use(cookieParser(process.env.SECRET_COOKIE));
//const FileStore = fileStore(session);
server.use(
  session({
    /* store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 60 * 60,
    }), */
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    //cookie: { maxAge: 60 * 60 * 1000}
  })
);

//router
server.get("/home", async (requerimientos, respuesta) => {
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
server.post("/multer.mid", multer.single("photo"), (req, res) => {
  res.send(req.file.filename);
});

//? endpoints users and products
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
