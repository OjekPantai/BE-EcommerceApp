import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "This field is required."],
    unique: [true, "This product name is already taken."],
  },
  price: {
    type: Number,
    required: [true, "This field is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Laptop", "Tablet", "Smartphone"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
