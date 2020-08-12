var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/file', require('./file'));
router.use('/chat', require('./chat'));

module.exports = router;
