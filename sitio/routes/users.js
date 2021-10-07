var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');

const {register, processRegister, login, processLogin} = require('../controllers/usersController');

/* GET home page. */
router.get('/register', register)
router.post('/register',processRegister)
router.get('/login',login)
router.post('/login',loginValidator, processLogin)

module.exports = router;
