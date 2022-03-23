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
    return res.status(500).json({ message: e.message });
  }
});

notesRouter.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) {
      return res.status(400).json({ message: "Could not find note" });
    }
    return res.status(200).json({ note: note });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

notesRouter.patch("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) {
      return res.status(400).json({ message: "Could not find note" });
    }
    note.completed = !note.completed;
    await note.save();
    return res.status(200).json({ message: "Success" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

notesRouter.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) {
      return res.status(400).json({ message: "Could not find note" });
    }
    await note.delete();
    res.status(200).json({ message: "Success" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

notesRouter.put("/:id", auth, async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: "Text is empty" });
    }

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(400).json({ message: "Could not find note" });
    }

    note.text = req.body.text;
    await note.save();
    return res.status(200).json({ message: "Success" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default notesRouter;
