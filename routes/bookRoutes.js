const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
