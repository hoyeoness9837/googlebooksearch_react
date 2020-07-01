const { model, Schema } = require('mongoose')

const GifSchema = new Schema({
  title: String,
  source: String,
  url: String,
  author: String,
  gifId: String
})

module.exports = model('Gif', GifSchema)
