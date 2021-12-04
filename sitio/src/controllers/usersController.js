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


}
