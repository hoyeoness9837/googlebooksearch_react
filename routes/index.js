const router = require('express').Router()

router.use('/api', require('./gifRoutes.js'))
router.use('/api', require('./giphyRoutes.js'))

module.exports = router
