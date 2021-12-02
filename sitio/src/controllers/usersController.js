const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const users = require(path.join(__dirname,'../data/users.json'));
const {validationResult} = require('express-validator');

module.exports = {
    register : (req,res) => {
        return res.render('register', {title: "Registro"});
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
        const {name,email,password} = req.body;

        let user = {
            id : users.length != 0 ? users[users.length - 1].id + 1 : 1,
            name : name.trim(),
            email : email.trim(),
            password : bcrypt.hashSync(password,10),
            profile_picture : 'foto-defult.jpg',
            rol : "user"
        }
        users.push(user);
        fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(users,null,3),'utf-8');
        
        req.session.userLogin = {
            id : user.id,
            name : user.name,
            profile_picture : user.profile_picture,
            rol : user.rol
        }

        return res.redirect('/')
        }else{
            return res.render('register',{
                errores : errors.mapped(),
                old : req.body
            })
        }
    },
    login : (req,res) => {
        return res.render('login', {title: "Inicio de sesión"});
    },
    processLogin : (req,res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email);
            
            req.session.userLogin = {
                id : user.id, 
                name : user.name,
                profile_picture : user.profile_picture,
                rol : user.rol
            }
            if(req.body.remember){
                res.cookie('InnovArte', req.session.userLogin,{maxAge : 15000 * 60})
            }
            return res.redirect('/')
        }else {
            return res.render('login', {
                errores : errors.mapped()
            })
        }
    },
    logout : (req,res)=> {

        if (req.cookies.InnovArte) {
            res.cookie('InnovArte', '', {maxAge : -1})   
        }
        req.session.destroy()
        return res.redirect('/')
    },
    
    profile : (req,res) => {
        res.render('profile',{
            user: users.find(user => user.id === req.session.userLogin.id)
        })
    }
}