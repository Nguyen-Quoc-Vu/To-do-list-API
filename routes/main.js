import express from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const MainRouter = express.Router();
MainRouter.use("/auth", authRouter);
MainRouter.use("/user", userRouter);

export default MainRouter;
