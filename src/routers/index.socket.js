import usersManager from "../data/fs/UsersManager.fs.js";
import productsManager from "../data/fs/ProductsManager.fs.js"

export default async (socket) => {
  console.log("client id: " + socket.id);

  socket.emit("users", await usersManager.read());

  socket.on("register", async (data) => {
    await usersManager.create(data);
    socket.emit("users", await usersManager.read());
  })

  socket.emit("products", await productsManager.read());

  socket.on("newProduct", async (data) => {
    await productsManager.create(data);
    const updatedProducts = await productsManager.read()
    socket.emit("products", updatedProducts);
  })
};