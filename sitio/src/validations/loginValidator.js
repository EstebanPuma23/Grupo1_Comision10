const {body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

module.exports =  [
    body('email')
        .custom (async(value, {req}) =>{
         try{
            let userExist = await db.User.findOne({
                where: {
                    email: value
                }
            })
              if(userExist && bcrypt.compareSync(value, userExist.password)){
                return true;
            }else{
                return false;
            }
        
         }catch(error){
              console.log(error)
         }

            }).withMessage('Credenciales invalidas')
]
    
