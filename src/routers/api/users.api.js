
import { Router } from "express";
import UsersManager from "../../data/mongo/managers/UsersManager.mongo.js"
import isPhoto from '../../middlewares/isPhoto.js';
import uploader from "../../middlewares/multer.mid.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", uploader.single("photo"), isPhoto, create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await UsersManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await UsersManager.read(role);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;

    }
  } catch (error) {
    return next(error);
  }

}

async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await UsersManager.readOne(uid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;

    }
  } catch (error) {
    return next(error);
  }
});


async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await UsersManager.update(uid, data);

    return res.json({
      statusCode: 200,
      response: all.docs,
      infoPaginate: {
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }

}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await UsersManager.destroy(uid);
    return res.json({

      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;

