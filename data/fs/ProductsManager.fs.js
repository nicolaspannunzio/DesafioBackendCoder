const fs = require("fs");
const crypto = require("crypto");

class ProductsManager {
  constructor() {
    this.path = "./fs/files/products.json";
    this.init();
  }

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const stringData = JSON.stringify([], null);
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
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto creado exitosamente");
        products = JSON.stringify(products, null, 3);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.log("Error al crear producto");
    }
  }

  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      return products;
    } catch (error) {
      console.log("Error al leer el Producto");
      return [];
    }
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const product = products.find((each) => each.id === id);
      if ( product) {
        console.log("Productos no encontrado");
        return null;
      } else {
        return product;
      }
    } catch (error) {
      console.log("Error al leer producto");
      return null;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 3));
      console.log(id + "eliminado");
    } catch (error) {
      console.log("Error al eliminar el producto" + id);
    }
  }
}

async function test() {
  const gestorDeProductos = new ProductsManager();
  await gestorDeProductos.create({
    photo: "dest.png",
    title: "destornillador",
    category: "Herramientas",
    price: 1600,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "latex-prof.png",
    title: "latex prof 10lt",
    category: "pinturas",
    price: 55000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sint-rojo-1.png",
    title: "sintetico rojo 1lt",
    category: "pinturas",
    price: 11200,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sierra.png",
    title: "Sierra Circular",
    category: "Maquinas",
    price: 89000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Amol115.png",
    title: "Amoladora 115",
    category: "Maquinas",
    price: 45000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Amol180.png",
    title: "Amoladora 180",
    category: "Maquinas",
    price: 190000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Espat4.png",
    title: "Espatula 4'",
    category: "Herramientas",
    price: 3400,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "cloropol.png",
    title: "Cloro en polvo 1kg",
    category: "Piletas",
    price: 9500,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Cloroliq.png",
    title: "Cloro liquido 10lt",
    category: "Piletas",
    price: 6000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sacah.png",
    title: "Sacahojas Piletas",
    category: "Piletas",
    price: 3000,
    stock: 9999,
  });
  console.log(await gestorDeProductos.read());
  console.log(await gestorDeProductos.readOne("e83d858a4ad0f53e582f4d37"));
}

test();