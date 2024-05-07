import { Router, response } from "express";
//import userManager from "../../data/fs/UsersManager.fs.js";
import userManager from "../../data/mongo/Manager.mongo.js";
import usersProps from "../../middlewares/usersProps.mid.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    let users = await userManager.read();
    if (userManager.read) {
      users = await userManager.read(req.query.role);
    } else {
      users = await userManager.read();
    }

    if (users.length > 0) {
      res.status(200).json({
        statusCode: 200,
        response: users,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No users to display",
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const user = await userManager.readOne(req.params.uid);
    if (user != null) {
      res.status(200).json({ statusCode: 200, response: user });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: "User not found",
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/paginate", async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if (req.query.limit){
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    const all = await userManager.paginate({ filter, opts });
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
});

usersRouter.post("/", usersProps, async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await userManager.create(data);

    res.status(201).json({
      statusCode: 201,
      response: newUser.id,
      message: "User created successfully!",
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", usersProps, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;

    const updatedUser = await userManager.update(uid, data);

    res.status(200).json({
      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deletedUser = await userManager.destroy(uid);

    if (deletedUser) {
      res.status(200).json({
        statusCode: 200,
        response: deletedUser,
      });
    } else {
      throw new Error(`Failed to delete user with ID ${id}.`);
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
