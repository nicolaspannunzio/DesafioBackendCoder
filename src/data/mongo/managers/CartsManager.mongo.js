import Manager from "../Manager.mongo.js";
import Carts from "../models/carts.model.js"

const cartsManager = new Manager(Carts);
export default cartsManager;