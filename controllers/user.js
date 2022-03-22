import mongoose from "mongoose";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: "username or password is empty",
      });
    }
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      password: req.body.password,
      createdDate: Date.now(),
    });

    //await to see if the save() function return an error
    await user.save();
    return await res.status(201).json({ success: true });
  } catch (error) {
    if (error && error.code === 11000)
      return res.status(500).json({ message: "Duplicate username" });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        success: "false",
        error: "username or password is empty",
      });
    }
    const user = await User.findUserByPasswordAndUsername(
      req.body.username,
      req.body.password
    );
    const jwt_token = await user.generateAccessToken();
    return await res
      .status(201)
      .json({ message: "Success", jwt_token: jwt_token });
  } catch (e) {
    return res.status(500).json({ success: "false", message: "Server error" });
  }
};
