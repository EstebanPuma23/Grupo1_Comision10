var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

/*Validaciones*/
const adminUserCheck = require('../middlewares/adminUserCheck');
const productValidator = require('../validations/productValidator');

/*Controlador*/
const {detail, add, store, edit, update, list, destroy, search} = require('../controllers/productsController');

/*storage multer*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, 'img-product-' + Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage })

/*Rutas products*/
router
  .get('/detail/:id', detail)
  .get('/add',adminUserCheck,add)
  .post('/add',upload.single('image'),productValidator,store)
  .get('/edit/:id',adminUserCheck, edit)
  .put('/update/:id',upload.single('image'),productValidator,update)
  .delete('/destroy/:id', destroy)
  .get('/product-list', list)
  .get('/search', search)


module.exports = router;