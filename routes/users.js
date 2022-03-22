import express from "express";
import { auth } from "../middleware/auth.js";
import user from "../models/user.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

userRouter.get("/", (req, res) => res.json({ message: "ok" }));

userRouter.get("/me", auth, (req, res) => {
  res.status(200).json({
    users: {
      _id: req.user._id,
      username: req.user.username,
      createdDate: req.user.createdDate,
    },
  });
});

userRouter.delete("/me", auth, async (req, res) => {
  try {
    await user.deleteOne({ username: req.user.username });
    res.status(200).json({
      message: "Success",
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

userRouter.patch("/me", auth, async (req, res) => {
  try {
    if (!req.body.newPassword || !req.body.oldPassword || !req.user.password) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const isMatched = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );
    if (isMatched) {
      req.user.password = req.body.newPassword;
      await req.user.save();
      res.status(200).json({ message: "success" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

export default userRouter;
