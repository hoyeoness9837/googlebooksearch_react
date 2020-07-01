const { model, Schema } = require('mongoose');

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  image: Buffer,
  link: String,
  bookId: String,
});

module.exports = model('Book', BookSchema);
