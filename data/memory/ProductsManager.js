const crypto = require("cryto");

class ProductsManager {
  static #products = [];

  create(data) {
    try {
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || url(""),
      title: data.title,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    if (!data.title || !data.category || !data.price || !data.stock) {
      throw new Error(
        "Producto no creado. Ingrese nuevamente los datos requeridos"
      );
    } else {
      let products = readFile(this.path, "utf-8");
      products = JSON.parse(products);
      products.push(product);
      console.log("Producto creado exitosamente");
      products = JSON.stringify(products, null, 3);
      fs.promises.writeFile(this.path, products);
    }
  } catch (error) {
    console.log("Error al crear Producto");
  }
  }

  read() {
    try {
      let products = readFile(this.path, "utf-8");
      products = JSON.parse(products);
      return products;
    } catch (error) {
      console.log("Error al leer el Producto");
      return [];
    }
  }

  readOne(id) {
    try {
      const product = ProductsManager.#products.find(each => each.id === id);
      if (product) {
        return product;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.log("error");
      return null; 
    }
  }

  destroy(id) {
    try {
      const filtered = ProductsManager.#products.filter(each => each.id !== id);
      if (filtered.length < ProductsManager.#products.length) {
        ProductsManager.#products = filtered;
        console.log(id + " eliminado");
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
  
const gestorDeProductos = new ProductsManager();
  gestorDeProductos.create({
    photo: "dest.png",
    title: "destornillador",
    category: "Herramientas",
    price: 1600,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "latex-prof.png",
    title: "latex prof 10lt",
    category: "pinturas",
    price: 55000,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "sint-rojo-1.png",
    title: "sintetico rojo 1lt",
    category: "pinturas",
    price: 11200,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "sierra.png",
    title: "Sierra Circular",
    category: "Maquinas",
    price: 89000,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "Amol115.png",
    title: "Amoladora 115",
    category: "Maquinas",
    price: 45000,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "Amol180.png",
    title: "Amoladora 180",
    category: "Maquinas",
    price: 190000,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "Espat4.png",
    title: "Espatula 4'",
    category: "Herramientas",
    price: 3400,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "cloropol.png",
    title: "Cloro en polvo 1kg",
    category: "Piletas",
    price: 9500,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "Cloroliq.png",
    title: "Cloro liquido 10lt",
    category: "Piletas",
    price: 6000,
    stock: 9999,
  });
  gestorDeProductos.create({
    photo: "sacah.png",
    title: "Sacahojas Piletas",
    category: "Piletas",
    price: 3000,
    stock: 9999,
  });