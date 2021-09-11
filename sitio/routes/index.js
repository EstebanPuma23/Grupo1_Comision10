var express = require('express');
var router = express.Router();

const {index,store} = require('../controllers/mainController');
/* GET home page. */
router.get('/',index);
router.get('/store',store);

module.exports = router;