import crypto from "crypto";

export default class UserManager {
  static #users = [];

  create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo || url(""),
        email: data.email,
        password: data.password,
        role: data.role,
      };
      if (!data.email || !data.password || !data.role) {
        throw new Error("User not found. Enter the required data again");
      } else {
        let users = readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("User created successfully");
        users = JSON.stringify(users, null, 3);
        fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log("Error creating user");
    }
  }

  read() {
    try {
      let users = readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("Error to read the user");
      return [];
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((each) => each.id === id);
      if (user) {
        return user;
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.log("error");
      return null;
    }
  }

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (filtered.length < UserManager.#users.length) {
        UserManager.#users = filtered;
        console.log(id + " deleted");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

const userAdministrador = new UserManager();
userAdministrador.create({
  photo: "photo.png",
  email: "email@gmail.com",
  password: "prueba123",
});
userAdministrador.create({
  photo: "photo2.png",
  email: "newemail@gmail.com",
  password: "prueba678",
});
userAdministrador.create({
  photo: "photo2.png",
  email: "newemail@gmail.com",
  password: "prueba147",
});
userAdministrador.create({
  photo: "photo3.png",
  email: "email121@gmail.com",
  password: "prueba768"
});