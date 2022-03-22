import express from "express";
import mongoose from "mongoose";
import { auth } from "../middleware/auth.js";
import Note from "../models/note.js";

const notesRouter = express.Router();

notesRouter.get("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate({
      path: "notes",
      options: {
        limit: req.query.limit,
        skip: req.query.offset,
      },
    });
    res.status(200).json({
      offset: req.query.offset || 0,
      limit: req.query.limit || 0,
      count: req.user.notes.length,
      notes: user.notes,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

notesRouter.post("/", auth, async (req, res) => {
  try {
    const note = new Note({
      _id: mongoose.Types.ObjectId(),
      userId: req.user._id,
      text: req.body.text,
    });
    await note.save();
    return res.status(201).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default notesRouter;
