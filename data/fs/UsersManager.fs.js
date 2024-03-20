const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
    this.init();
  }

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const stringData = JSON.stringify([], null, 3);
        fs.writeFileSync(this.path, stringData);
        console.log("Archivo creado");
      } else {
        console.log("Archivo ya existente");
      }
    } catch (error) {
      console.log("Error al inicializar");
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
          "Usuario no encontrado. Ingrese nuevamente los datos requeridos"
        );
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("Usuario creado exitosamente");
        users = JSON.stringify(users, null, 3);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log("Error al crear usuario");
    }
  }

  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("Error al leer el usuario");
      return [];
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const user = users.find((each) => each.id === id);
      if (!user) {
        console.log("Usuario no encontrado");
        return null;
      } else {
        return user;
      }
    } catch (error) {
      console.log("Error al leer usuario");
      return null;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 3));
      console.log(id + "eliminado");
    } catch (error) {
      console.log("Eror al eliminar el usuario" + id);
    }
  }
}

async function test() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    photo: "photo.png",
    email: "email@gmail.com",
    password: "prueba123",
    role: "admin",
  });
  await gestorDeUsuarios.create({
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

test();