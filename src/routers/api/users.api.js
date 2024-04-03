import { Router } from "express";
import  userManager  from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router();



usersRouter.put("/", update);
usersRouter.delete("/", destroy);

//? create users
usersRouter.get(
  "/api/users/:photo/:email/:password/:role",
  async function create(req, res, next) {
    try {
      const { photo, email, password, role } = req.params;
      const data = { photo, email, password, role };
      const one = await userManager.create(data);
      return res.status(201).json({
        response: one,
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//? Filter by role with users
usersRouter.get("/api/users", async function read (req, res, next) {
  try {
    const { role } = req.query;
    const all = await userManager.read(role);
    if (all) {
      return res.status(200).json({
        response: all,
        role,
        success: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//? method readOne() with users
usersRouter.get("/api/users/:id", async function readOne(req, res, next) {
  try {
    const { id } = req.params;
    const one = await userManager.readOne(id);
    if (one != null) {
      return res.status(200).json({
        response: one,
        id,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});


//? update and destroy users

async function update(req, res, next) {
  try {
    const { photo, email, password, role } = req.params;
    const data = { photo, email, password, role };
    const one = await userManager.update(data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { photo, email, password, role } = req.params;
    const one = await userManager.destroy({ photo, email, password, role });
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;