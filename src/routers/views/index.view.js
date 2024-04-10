import { Router } from "express";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/users", usersRouter);
viewsRouter.get("/home", (req, res, next) => {
  try {
    return res.render("index", { title: "HOME" });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;