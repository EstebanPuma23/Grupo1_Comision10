const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const users = require(path.join(__dirname,'../data/users.json'));
const {validationResult} = require('express-validator');
const db = require('../database/models');

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
        /* let user = users.find(user => user.id === req.session.userLogin.id);
        return res.send(user) */

        db.User.findByPk(req.session.userLogin.id,{
            include : [{all:true}]
        })
            .then(user => {
                return res.render('profile', {
                    user
                })
            })
            .catch(error => console.log(error))

        /* 
        let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/users.json'),'utf-8'));
        return res.render('profile',{
            user : users.find(user => user.id === req.session.userLogin.id)
        }) */
    },
    update : (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            //let hashPass = req.body.password ? bcrypt.hashSync(req.body.password, 10) : user.password;
            db.User.update(
                {
                    name : req.body.name,
                    avatar : req.file ? req.file.filename : req.session.userLogin.profile_picture,
                },
                {
                    where : {
                        id : req.session.userLogin.id
                    }
                },
            ).then( async () => {
                await db.Address.update(
                    {
                        city : req.body.city,
                        state : req.body.state,
                    },
                    {
                        where : {
                            userId : req.session.userLogin.id
                        }
                    }
                )
                if (req.file) {
                    if (fs.existsSync(path.join(__dirname, '../public/images/' + user.profile_picture)) && user.profile_picture != "foto-default.jp´g") {
                        fs.unlinkSync(path.join(__dirname, '../public/images/' + user.profile_picture))
                    }
                    req.session.userLogin.avatar = req.file.filename
                }
                req.session.userLogin.name = req.body.name
                return res.redirect('/users/profile')
            }).catch(error => console.log(error))
        } else {
            res.render('profile', {
                user: users.find(user => user.id === req.session.userLogin.id),
                errors: errors.mapped()
            })
        }


    }
        /* let errors = validationResult(req);
        if(errors.isEmpty()){
            let user = users.find(user => user.id === req.session.userLogin.id);
            let hashPass = req.body.password ? bcrypt.hashSync(req.body.password,10) : user.password;
            console.log(req.body.password)
            let userModified = {
                id : user.id,
                name : req.body.name,
                email : user.email,
                password : hashPass,
                profile_picture : req.file ? req.file.filename : user.profile_picture,
                rol : user.rol
            }

            if(req.file){
                if(fs.existsSync(path.join(__dirname,'../public/images/' + user.profile_picture)) && user.profile_picture != "default.jpg"){
                    fs.unlinkSync(path.join(__dirname,'../public/images/' + user.profile_picture))

                }
            }
    
            let usersModified = users.map(user => user.id === req.session.userLogin.id ? userModified : user);
    
            fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(usersModified,null,3),'utf-8');
    
            req.session.userLogin = {
                id : user.id,
                name : userModified.name,
                profile_picture : userModified.profile_picture,
                rol : user.rol
            }
    
            return res.redirect('/users/profile')
        }else{
            res.render('profile',{
                user : users.find(user => user.id === req.session.userLogin.id),
                errors : errors.mapped()
            })
        }

       
    } */
}