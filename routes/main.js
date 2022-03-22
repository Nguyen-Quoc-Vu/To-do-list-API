import express from "express";
import authRouter from "./auth.js";
import notesRouter from "./notes.js";
import userRouter from "./users.js";

const MainRouter = express.Router();
MainRouter.use("/auth", authRouter);
MainRouter.use("/users", userRouter);
MainRouter.use("/notes", notesRouter);

export default MainRouter;
