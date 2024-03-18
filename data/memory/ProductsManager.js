class ProductsManager {
  static #products = [];

  create(data) {
    const product = {
      id: ProductsManager.#products.length === 0 
      ? 1 
      : ProductsManager.#products[ProductsManager.#products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.price
    };
    ProductsManager
  .#products.push(product);

  }
  read() {
    return ProductsManager
  .#products;
  }
}

const gestorDeProductos = new ProductsManager();
gestorDeProductos.create({
  title : "zapatilla",
  photo : "zapatilla.jpg",
  category: "calzado",
  price: 100,
  stock:9999
}); 
gestorDeProductos.create({
  title : "Borcego",
  photo : "Borcego.jpg",
  category: "calzado",
  price: 120,
  stock:9999
});
gestorDeProductos.create({
  title : "Remera",
  photo : "Remera.jpg",
  category: "Indumentaria",
  price: 40,
  stock:9999
});
gestorDeProductos.create({
  title : "Joggins",
  photo : "Joggins.jpg",
  category: "Indumentaria",
  price: 80,
  stock:9999
});
gestorDeProductos.create({
  title : "Gorra",
  photo : "Gorra.jpg",
  category: "Indumentaria",
  price: 20,
  stock:9999
});

console.log(gestorDeProductos.read());