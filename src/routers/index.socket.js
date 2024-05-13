import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";

export default async (socket) => {
  console.log("client id: " + socket.id);

  socket.emit("users", await usersManager.read());

  socket.on("register", async (data) => {
    await usersManager.create(data);
    socket.emit("users", await usersManager.read());
  });

  socket.emit("products", await productManager.read())

  socket.emit("carts", await cartsManager.read())
};