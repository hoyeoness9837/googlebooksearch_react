const router = require('express').Router()
const axios = require('axios')
const { Gif } = require('../models')

router.get('/giphy/:search', (req, res) => {
  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.search}&rating=g&limit=20`)
    .then(({ data }) => {
      Gif.find()
        .then(gifs => {
          const gifsFiltered = data.data.filter(gif => {
            let keep = true
            gifs.forEach(saved => {
              if (saved.gifId === gif.id) {
                keep = false
              }
            })
            return keep
          })
          res.json(gifsFiltered)
        })
    })
    .catch(err => console.error(err))
})

module.exports = router
