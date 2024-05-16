import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

async function isValidPassword(req, res, next) {
  try {
    const { email, password } = req.body;
    const formPassword = password;
    const one = await usersManager.readByEmail(email);
    const mongoPassword = one.password;
    if (formPassword === mongoPassword) {
      return next();
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default isValidPassword;