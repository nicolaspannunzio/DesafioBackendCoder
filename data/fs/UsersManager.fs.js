import fs from "fs";
import crypto from "crypto";
import UserManager from "../memory/UserManager";
import exp from "constants";

class UserManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
    this.init();
  }

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const stringData = JSON.stringify([], null, 3);
        fs.writeFileSync(this.path, stringData);
        console.log("File created");
      } else {
        console.log("Existing file");
      }
    } catch (error) {
      console.log("Initialization error");
    }
  }

  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo || url(""),
        email: data.email,
        password: data.password,
        role: data.role,
      };
      if (!data.email || !data.password || !data.role) {
        throw new Error(
          "User not found. Enter the required data again");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("User created successfully");
        users = JSON.stringify(users, null, 3);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log("Error creating user");
    }
  }

  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("Error to read the user");
      return [];
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const user = users.find((each) => each.id === id);
      if (!user) {
        console.log("User not found.");
        return null;
      } else {
        return user;
      }
    } catch (error) {
      console.log("Error to read the user");
      return null;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 3));
      console.log(id + " deleted");
    } catch (error) {
      console.log("Error to deleted the user" + id);
    }
  }
}

async function test() {
  const userAdministrator = new UserManager();
  await userAdministrator.create({
    photo: "photo.png",
    email: "email@gmail.com",
    password: "prueba123",
    role: "admin",
  });
  await userAdministrator.create({
    photo: "photo2.png",
    email: "newemail@gmail.com",
    password: "prueba147",
    role: "user",
  });
  await gestorDeUsuarios.create({
    photo: "photo3.png",
    email: "email121@gmail.com",
    password: "prueba768",
    role: "user2",
  });
  await gestorDeUsuarios.create({
    photo: "photo4.png",
    email: "newemail2024@gmail.com",
    password: "prueba678",
    role: "user3",
  });
  console.log(await gestorDeUsuarios.read());
  console.log(await gestorDeUsuarios.readOne("e83d858a4ad0f53e582f4d37"));
}

//test();

const userManager = new UserManager();
export default userManager;