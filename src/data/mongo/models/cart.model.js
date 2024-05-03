import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, index: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, index: true, ref: "products" },
    photo:{ type: String, default: "/default_photo.png" },
    quantity: { type: Number, required: true, default: 1 },
    state: {
        type: String,
        enum: ['pending', 'paid', 'success', 'failed'],
        default: 'pending'
      },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("user_id", "name, quantity -_id");
});
schema.pre("find", function () {
  this.populate("product_id", "name, quantity -_id");
});
schema.pre("findOne", function () {
  this.populate("product_id", "name");
});
schema.pre("findOneAndUpdate", function () {
  this.populate("product_id", "name");
});
schema.pre("findOneAndDelete", function () {
  this.populate("product_id", "name");
});

schema.plugin(mongoosePaginate);

const Cart = model(collection, schema);
export default Cart;