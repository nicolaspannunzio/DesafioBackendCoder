import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import { Types } from "mongoose";

const ticketsRouter = Router();

ticketsRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const tickets = await cartsManager.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(uid),
        },
      },
      {
        $lookup: {
          foreignField: "_id",
          from: "products",
          localField: "product_id",
          as: "product_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product_id, 0"] }, "$$ROOT"],
          },
        },
      },
      {
        $set: { subTotal: { $multiply: ["$quantity", "$price"] } },
      },
      {
        $group: { _id: "$user_id", total: { $sum: "$subTotal" } },
      },
      {
        $proyect: {
          _id: 0,
          user_id: "$_id",
          total: "$total",
          date: new Date(),
        },
      },
      {
        $merge: { into: "tickets" },
      },
    ]);
    return res.json({
      statusCode: 200,
      response: tickets,
    });
  } catch (error) {
    return next(error);
  }
});

export default ticketsRouter;
