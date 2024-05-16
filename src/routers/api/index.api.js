import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./cart.api.js";
import sessionsRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);



export default apiRouter;