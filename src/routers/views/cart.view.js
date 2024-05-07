import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router()

cartsRouter.get("/", async (req, res, next) => {
    try {
        const carts = await cartsManager.read()
        return res.render("carts", { carts })
    } catch (error) {
        next(error)
    }
})

export default cartsRouter