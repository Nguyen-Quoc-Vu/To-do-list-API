import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    createdDate: {
      type: Date,
      required: true,
    },
  },
  { collection: "users" }
);

userSchema.virtual("notes", {
  ref: "notes",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAccessToken = async function () {
  const user = this;
  return jwt.sign(
    { _id: user._id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
  );
};

userSchema.statics.findUserByPasswordAndUsername = async function (
  username,
  password
) {
  const user = await this.findOne({ username: username });
  if (!user) {
    throw new Error("Username or password not match");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Username or password not match");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export default mongoose.model("User", userSchema);
