var express = require('express');
var router = express.Router();
const adminUserCheck = require('../middlewares/adminUserCheck')


const {detail, add, store, edit, update,list, destroy, search} = require('../controllers/productsController');


  
var upload = require('../middlewares/multerImageUser')

/*Rutas products*/
router
  .get('/detail/:id', detail)
  .get('/add',adminUserCheck,add)
  .post('/add',upload.single('image'),store)
  .get('/edit/:id',adminUserCheck, edit)
  .put('/update/:id',upload.single('image'),update)
  .delete('/destroy/:id', destroy)
  .get('/product-list', list)
  .get('/search', search)


module.exports = router;