const { check, body } = require('express-validator');
const db = require('../database/models')
const bcrypt = require('bcryptjs');

module.exports = [

    check('name')
        .notEmpty().withMessage('back-El nombre es requerido'),

    body('passwordOrigin')
    
        .custom(async (value, { req }) => {
            console.log('-------Probando--------');
           console.log(req.body);
            try {
                let user = await db.User.findOne({
                    where: {
                        email: req.session.userLogin.email
                    }
                })
                
                if (user && bcrypt.compareSync(value, user.password)) {
                    return Promise.reject()
                   
                } else {
                    return Promise.reject('back--La contraseña no es correcta!')
                    
                }
                
            } catch (error) {
                console.log(error)
            }

        }).withMessage('back-La contraseña no es correcta'),

]