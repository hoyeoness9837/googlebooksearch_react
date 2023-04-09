const router = require('express').Router();
const axios = require('axios');
const Book = require('../models/Book');

router.get('/books/:search', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&printType=books&maxResults=10&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const bookIds = await Book.distinct('bookId');
    const booksFiltered = data.items.filter(
      (book) => !bookIds.includes(book.id)
    );
    res.json(booksFiltered);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
