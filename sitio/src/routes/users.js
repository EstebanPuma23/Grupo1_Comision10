var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const loginUsercheck = require('../middlewares/loginUserCheck')
const {register, processRegister, login, processLogin, logout} = require('../controllers/usersController');

/* GET home page. */
router
    .get('/register',loginUsercheck, register)
    .post('/register',registerValidator, processRegister)
    .get('/login',loginUsercheck, login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)


module.exports = router;
