import { Router } from "express";
import  userManager  from "../../data/fs/UsersManager.fs.js";
import isText from "../../middlewares/isText.min.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:id", readOne);
usersRouter.post("/", uploader.single("photo"), isPhoto, create);
usersRouter.put("/:id", update);
usersRouter.delete("/:id", destroy);

//? create users

async function create (req, res, next) {
    try {
      const { photo, email, password, role } = req.body;
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


//? Filter by role with users
async function read (req, res, next) {
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

};

//? method readOne() with users
async function readOne(req, res, next) {

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
}


//? update and destroy users

async function update(req, res, next) {
  try {
    const { photo, email, password, role } = req.body;

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
    const { id } = req.params;
    const one = await userManager.destroy({ id });
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}



export default usersRouter;