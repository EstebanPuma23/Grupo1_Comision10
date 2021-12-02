var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const userLoginCheck = require('../middlewares/userLoginCheck');
const notEntry = require('../middlewares/notEntry')
const {register, processRegister, login, processLogin, logout, profile} = require('../controllers/usersController');

/* GET home page. */
router
    .get('/register',notEntry, register)
    .post('/register',registerValidator, processRegister)
    .get('/login',notEntry, login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)
    .get('/profile',userLoginCheck,  profile)


module.exports = router;
