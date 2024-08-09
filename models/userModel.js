import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "This field is required."],
    unique: [true, "This name is already taken."],
  },
  email: {
    type: String,
    required: [true, "This field is required."],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long."],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
