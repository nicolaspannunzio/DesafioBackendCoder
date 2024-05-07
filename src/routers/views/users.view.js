import { Router } from "express";
import userManager from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
    try {
      const users = await userManager.read();
      return res.render("users", { title: "users", users });
    } catch (error) {
      return next(error);
    }
  });

export default usersRouter;