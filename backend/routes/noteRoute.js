import express from 'express';
import { Note } from '../models/noteModel.js';

const router = express.Router();

// Route to handle POST request for creating a new note
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res
        .status(400)
        .send({ message: 'Please enter all required fields: title, text' });
    }
    const newNote = {
      title: req.body.title,
      text: req.body.text,
    };

    const note = await Note.create(newNote);
    return res.status(201).send(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to handle GET requests for retrieving all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json({
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to handle GET requests for retrieving a specific note by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    return res.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to handle PUT requests for updating a soecific note by ID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res
        .status(400)
        .send({ message: 'Please enter all required fields: title, text' });
    }

    const { id } = req.params;
    const result = await Note.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).send({ message: 'Note updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to handle DELETE requests for deleting a specific note by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Note.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
