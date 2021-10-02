var express = require('express');
var router = express.Router();

const {detail, add, store, edit, update, destroy} = require('../controllers/productsController');


router.get('/detail/:id', detail);
router.get('/add',add);
router.post('/add',store);
router.get('/edit/:id',edit);
router.put('/update/:id',update)
router.delete('/destroy/:id', destroy)

module.exports = router;