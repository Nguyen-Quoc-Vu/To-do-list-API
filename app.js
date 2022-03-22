import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import MainRouter from "./routes/main.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/notes-app")
  .then(() => console.log("connect"))
  .catch((e) => console.log(e));

app.use("/api", MainRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Started on port " + port));
