var express = require('express');
var router = express.Router();

const {index,store,admin} = require('../controllers/mainController');
/* GET home page. */
router.get('/',index);
router.get('/store',store);
router.get('/admin',admin);

module.exports = router;