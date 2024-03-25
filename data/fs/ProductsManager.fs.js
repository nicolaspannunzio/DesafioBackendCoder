import fs from "fs"
import crypto from "crypto"

class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("file created");
    } else {
      console.log("Files exists");
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
          "product error. Try again."
        );
      } else {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("product created");
        products = JSON.stringify(products, null, 3);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.log("create product error");
    }
  }

  async read( cat ) {
    if(cat){
      try {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products = products.filter(each=>each.category===cat)
        if(products.length === 0) {
          return null
        } else {
          return products;
        }

      } catch (error) {
        console.log("product error");
      }
    } else {

    }
    
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const product = products.find((each) => each.id === id);
      if ( product ) {
        console.log("product not found");
        return product
      } else {
        return null;
      }
    } catch (error) {
      console.log("product error");
      return null;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 3));
      console.log(id + "deleted");
    } catch (error) {
      console.log("error deleting product" + id);
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
  await gestorDeProductos.create({
    photo: "dest1.png",
    title: "destornillador 100",
    category: "Herramientas",
    price: 1600,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "latex-prof20.png",
    title: "latex prof 20lt",
    category: "pinturas",
    price: 55000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sint-rojo-4.png",
    title: "sintetico rojo 4lt",
    category: "pinturas",
    price: 11200,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sierra2.png",
    title: "Sierra Circular lusqtoff",
    category: "Maquinas",
    price: 89000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Amol115lusq.png",
    title: "Amoladora 115 lusqtoff",
    category: "Maquinas",
    price: 45000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Amol180lusq.png",
    title: "Amoladora 180 lusqtoff",
    category: "Maquinas",
    price: 190000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Espat5.png",
    title: "Espatula 5'",
    category: "Herramientas",
    price: 3400,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "cloroliq1.png",
    title: "Cloro liquido x1lt",
    category: "Piletas",
    price: 9500,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "Cloroliq20.png",
    title: "Cloro liquido 20lt",
    category: "Piletas",
    price: 6000,
    stock: 9999,
  });
  await gestorDeProductos.create({
    photo: "sacah32.png",
    title: "Sacahojas Piletas",
    category: "Piletas",
    price: 3000,
    stock: 9999,
  });
  console.log(await gestorDeProductos.read());
  console.log(await gestorDeProductos.readOne("e83d858a4ad0f53e582f4d37"));
}

const productsManager = new ProductsManager()
export default productsManager