import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "care-taker"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
