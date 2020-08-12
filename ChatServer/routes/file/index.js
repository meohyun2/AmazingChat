var express = require('express');
var router = express.Router();

router.use('/', require('./file'));

module.exports = router;