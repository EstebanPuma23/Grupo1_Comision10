const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const db = require('../database/models')



module.exports = {
    register: (req, res) => {
        return res.render('register', { title: "Registro" });
    },
    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.mapped())
            return res.render('register', {
              errores: errors.mapped()
            })
        }

        const { name, email, password } = req.body;
        try {
            let userExist = await db.User.findOne({
                where: {
                    email
                }
            })
            if (userExist) {
                return res.redirect('/'), {
                    error: {
                        msg: 'Este mail ya esta registrado'
                    }
                        ('register', {
                            errores: errors.mapped(),
                            old: req.body
                        })
                }

            }
            let names = name.split(' ')
            console.log(names)
            let user = await db.User.create({
                name: names[0].trim(),
                surname: names[1].trim(),
                email: email.trim(),
                password: bcrypt.hashSync(password, 10),
                profile: 'foto-default.jpg',
                rolId: 1

            })
            console.log('Se creo el usuario')

            req.session.userLogin = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                profile_picture: user.profile,
                rol: user.rolId
            }

            console.log(req.session.userLogin)
            return res.redirect('/')


        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        return res.render('login', { title: "Inicio de sesión" });

    },
    processLogin: async (req, res) => {
        let errors = validationResult(req);

         if(!errors.isEmpty()){
            console.log(errors.mapped())
              return res.render('login', {
                errores: errors.mapped()
              })
             
          }
        let { email, password, remember } = req.body;
        try {
            let user = await db.User.findOne({
                where: {
                    email
                }
            })
            console.log(user)

            req.session.userLogin = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                profile_picture: user.profile,
                rol: user.rolId
            }
            if (remember) {
                res.cookie('InnovArte', req.session.userLogin, { maxAge: 15000 * 60 })
            }
            return res.redirect('/');

               
        } catch (error) {
            console.log(error);
        }

    },
    logout: (req, res) => {

        if (req.cookies.InnovArte) {
            res.cookie('InnovArte', '', { maxAge: -1 })
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
