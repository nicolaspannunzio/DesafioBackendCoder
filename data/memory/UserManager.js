const crypto = require("cryto");

class UserManager {
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
      throw new Error(
        "Usuario no encontrado. Ingrese nuevamente los datos requeridos"
      );
    } else {
      let users = readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);
      console.log("Usuario creado exitosamente");
      users = JSON.stringify(users, null, 3);
      fs.promises.writeFile(this.path, users);
    }
  } catch (error) {
    console.log("Error al crear usuario");
  }
  }

  read() {
    try {
      let users = readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("Error al leer el usuario");
      return [];
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find(each => each.id === id);
      if (user) {
        return user;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.log("error");
      return null; 
    }
  }

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter(each => each.id !== id);
      if (filtered.length < UserManager.#users.length) {
        UserManager.#users = filtered;
        console.log(id + " eliminado");
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
  
const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  photo: "photo.png",
  email: "email@gmail.com",
  password: "prueba123",
});
gestorDeUsuarios.create({
  photo: "photo2.png",
  email: "newemail@gmail.com",
  password: "prueba678",
});