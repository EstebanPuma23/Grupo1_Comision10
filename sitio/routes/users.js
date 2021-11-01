var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const loginUsercheck = require('../middlewares/loginUserCheck')
const {register, processRegister, login, processLogin} = require('../controllers/usersController');

/* GET home page. */
router.get('/register',loginUsercheck, register)
router.post('/register',registerValidator ,processRegister)
router.get('/login',loginUsercheck, login)
router.post('/login',loginValidator, processLogin)

module.exports = router;
