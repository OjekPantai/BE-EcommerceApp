import mongoose from "mongoose";
import { Schema } from "mongoose";

const singleProduct = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, "This field is required."],
  },
  itemsDetail: [singleProduct], // Updated to match the controller
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  status: {
    type: String,
    enum: ["pending", "failed", "success"],
    default: "pending",
  },
  firstName: {
    type: String,
    required: [true, "This field is required."],
  },
  lastName: {
    type: String,
    required: [true, "This field is required."],
  },
  email: {
    type: String,
    required: [true, "This field is required."],
  },
  phone: {
    type: String,
    required: [true, "This field is required."],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
