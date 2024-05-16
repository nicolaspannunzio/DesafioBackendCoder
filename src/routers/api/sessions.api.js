import { Router } from "express";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPasword.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  isValidData,
  isValidEmail,
  async (req, res, next) => {
    try {
      const data = req.body;
      await usersManager.create(data);
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  isValidUser,
  isValidPassword,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const one = await usersManager.readByEmail(email);
      req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.photo = one.photo;
      req.session.user_id = one._id;
      return res.json({ statusCode: 200, message: "logged in" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is Online",
        user_id: req.session.user_id,
      });
    }
    return res.json({
      statusCode: 401,
      message: "bad Auth",
    });
  } catch (error) {
    return next(error);
  }
});

async function signout(req, res, next) {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default sessionsRouter;