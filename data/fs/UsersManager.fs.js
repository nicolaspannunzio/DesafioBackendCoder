const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 3);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya existente");
    }
  }

  async create(data) {
    // agregar estructura de try catch
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || url(""),
      email: data.email,
      password: data.password,
      role: data.role,
    };

    if (!data.email || !data.password || data.role) {
      console.log(
        "Usuario no encontrado. Ingrese nuevamente los datos requeridos"
      );
    } else {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);
      console.log("Usuario creado exitosamente");
      user.stringify(users, null, 3);
      await fs.promises.writeFile(this.path, users);
    }
  }
  async read() {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users;
    //agregar try catch
  }
  async readOne(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users.find((each) => each.id === id);
    //agregar try catch
  }
  async destroy(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    const filtered = users.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    console.log(id + "eliminado");
    // agregar try catch y condicional de usuario no encontrado
  }
}