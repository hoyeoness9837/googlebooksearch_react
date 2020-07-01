const router = require('express').Router();

router.use('/api', require('./apiRoutes'));
router.use('/api', require('./bookRoutes'));

module.exports = router;
