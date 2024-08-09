import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, cartItem, phone } = req.body;

  if (!cartItem || cartItem.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });

    if (!productData) {
      res.status(404);
      throw new Error("Product not found");
    }

    const { name, price, _id } = productData;

    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };

    orderItem.push(singleProduct);
    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  if (!order) {
    res.status(500);
    throw new Error("Failed to create order");
  }

  return res.status(201).json({
    total,
    order,
    message: "Order created successfully!",
  });
});

export const allOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({
    data: orders,
    message: "Show all order data success!",
  });
});

export const detailOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  return res.status(200).json({
    data: order,
    message: "Detail order data created successfully!",
  });
});

export const currentUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  return res.status(200).json({
    data: order,
    message: "Successfully displayed current user orders",
  });
});
