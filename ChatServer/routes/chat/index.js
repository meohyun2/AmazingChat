var express = require('express');
var router = express.Router();

router.use('/', require('./chat'));

module.exports = router;