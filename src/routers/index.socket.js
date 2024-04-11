import userManager from "../data/fs/UsersManager.fs";

export default async (socket) => {
  console.log("client id: " + socket.id);
  socket.emit("users", await userManager.read());
};