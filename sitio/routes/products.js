var express = require('express');
var router = express.Router();
const adminUserCheck = require('../middlewares/adminUserCheck')
const multer = require('multer')

const {detail, add, store, edit, update, destroy} = require('../controllers/productsController');

/*storage multer*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, 'default-product' + Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage })

/*Rutas products*/
router.get('/detail/:id', detail);
router.get('/add',adminUserCheck,add);
router.post('/add',upload.single('image'),store);
router.get('/edit/:id',adminUserCheck,edit);
router.put('/update/:id',update)
router.delete('/destroy/:id', destroy)

module.exports = router;