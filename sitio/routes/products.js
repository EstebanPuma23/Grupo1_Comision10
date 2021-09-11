var express = require('express');
var router = express.Router();

const {detail} = require('../controllers/productsController');

/* GET home page. */
router.get('/detail/:id',detail);

module.exports = router;