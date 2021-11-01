var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');
const loginUsercheck = require('../middlewares/loginUserCheck')
const {register, processRegister, login, processLogin, logout} = require('../controllers/usersController');

/* GET home page. */
router
    .get('/register',loginUsercheck, register)
    .post('/register',processRegister)
    .get('/login',loginUsercheck, login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)


module.exports = router;
