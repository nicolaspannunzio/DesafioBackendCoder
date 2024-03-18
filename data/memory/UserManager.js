const crypto = require("cryto");

class UserManager {
  static #users = [];

  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || url(""),
      email: data.email,
      password: data.password,
      role: data.role,
    };
    UserManager.#users.push(user);
    //? console.log("UsuarioCreado");
  }
  read() {
    return UserManager.#users; 
    //agregar try catch
  }
  readOne(id) {
    return UserManager.#users.find(each=>each.id===id);
    //agregar try catch
  }
  destroy(id) {
    const filtered = UserManager.#users.filter(each=>each.id!==id);
    UserManager.#users = filtered;
    console.log(id + "eliminado");
    // agregar try catch y condicional de usuario no encontrado
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

console.log(gestorDeUsuarios.read());

//? agregar readOne(id) y destroy(id)