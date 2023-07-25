const { body, validationResult } = require("express-validator"),
  Notes = require("../models/Notes"),
  fetchUser = require("../middleware/fetchUser"),
  express = require("express"),
  NotesRouter = express.Router();

// 🔥 get notes using GET:/api/notes/allnotes
NotesRouter.get("/allnotes", fetchUser, async (req, res) => {
  try {
    const _notes = await Notes.find({ user: req.user.id });
    res.json(_notes);
  } catch (err) {
    console.log(err);
    res.status(500).send("some internal server error occured");
  }
});

// 🔥 Create notes using POST:/api/notes/createnote
NotesRouter.post(
  "/createnote",
  fetchUser,
  [
    body("title", "title must be atleast 3 characters")
      .isString()
      .isLength({ min: 3 }),
    body("description", "description must be atleast 6 characters")
      .isString()
      .isLength({ min: 6 }),
    body("tag", "tag should not greater then 50 words")
      .isString()
      .isLength({ max: 50 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req),
        { title, description } = req.body,
        _notes = new Notes({
          title,
          description,
          user: req.user.id,
        });
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const savedNote = await _notes.save();
      res.json(savedNote);
    } catch (err) {
      console.log(err);
      res.status(500).send("some internal server error occured");
    }
  }
);

// 🔥 update an existing note using POST:/api/notes/updatenote
NotesRouter.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "title must be atleasr 3 characters")
      .isString()
      .isLength({ min: 3 }),
    body("description", "description must be atleast 6 characters")
      .isString()
      .isLength({ min: 6 }),
    body("tag", "tag should not greater then 10 words")
      .isString()
      .isLength({ max: 50 }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body,
        error = validationResult(req),
        updatednote = {
          updatedAt: Date.now(),
        };

      let _note = await Notes.findById(req.params.id);

      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      if (!_note) {
        return res.status(404).send("not allowed");
      }

      if (_note.user.toString() !== req.user.id) {
        return res.status(404).send("not allowed");
      }

      // 1- ✅ check is title exist then update it with new value
      if (title) {
        updatednote.title = title;
      }
      // 1- ✅ check is description exist then update it with new value
      if (description) {
        updatednote.description = description;
      }
      // 1- ✅ check is tag exist then update it with new value
      if (tag) {
        updatednote.tag = tag;
      }

      _note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: updatednote },
        { new: true }
      );

      res.json({ _note });
    } catch (error) {
      console.log(error);
      res.status(500).send("some internal server error occured");
    }
  }
);

// 🔥 update an existing note using POST:/api/notes/updatenote
NotesRouter.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let _note = await Notes.findById(req.params.id);

    if (!_note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (_note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    _note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: _note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = NotesRouter;
