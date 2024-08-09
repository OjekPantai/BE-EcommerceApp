import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Parent Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server runing on port : ${port} ⚡`);
});

// DB Connection
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log(`DB Connected 😎😎😎`);
});
