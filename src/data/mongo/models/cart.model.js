import { model, Schema } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    product_id: { type: String, required: true },
    photo:{ type: String, default: "/default_photo.png" },
    quantity: { type: Number, required: true },
    state: {
        type: String,
        enum: ['pending', 'connected', 'success', 'failed'],
        default: 'pending'
      },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = model(collection, schema);
export default Cart;