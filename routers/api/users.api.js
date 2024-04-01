import { Router } from "express";
import { userManager } from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", read());
usersRouter.get("/:", readOne());
usersRouter.post("/:", create);
usersRouter.put("/", update);
usersRouter.delete("/", destroy);

export default usersRouter;