var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const loginUsercheck = require('../middlewares/loginUserCheck')
const {register, processRegister, login, processLogin, logout} = require('../controllers/usersController');

/* GET home page. */
<<<<<<< HEAD:sitio/routes/users.js
router
    .get('/register',loginUsercheck, register)
    .post('/register',processRegister)
    .get('/login',loginUsercheck, login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)

=======
router.get('/register',loginUsercheck, register)
router.post('/register',registerValidator ,processRegister)
router.get('/login',loginUsercheck, login)
router.post('/login',loginValidator, processLogin)
>>>>>>> fcd45407fe90f2a5c6a58f072a3f8feb4139e83f:sitio/src/routes/users.js

module.exports = router;
