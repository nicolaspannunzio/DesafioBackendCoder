import { Router } from "express";
import UserManager from "../../data/fs/UsersManager.fs.js"
import usersProps from "../../middlewares/usersProps.mid.js";

const router = Router();
const userManager = UserManager ;

router.get("/", async (req, res, next) => {
  try {
    let users;
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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userManager.readOne(req.params.id);
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

router.post("/", usersProps, async (req, res, next) => {
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

router.put("/:id", usersProps, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedUser = await userManager.update(id, data);

    res.status(200).json({
      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userManager.destroy(id);

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

const usersRouter = Router();
usersRouter.use("/users", router);

export default usersRouter;