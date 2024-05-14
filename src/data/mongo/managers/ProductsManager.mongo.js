import Product from "../models/products.model.js"
import Manager from "../Manager.mongo.js";

const productsManager = new Manager(Product);
export default productsManager;