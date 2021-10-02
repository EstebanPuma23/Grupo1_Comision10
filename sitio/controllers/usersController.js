const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const users = require(path.join(__dirname,'../data/users.json'));

module.exports = {
    register : (req,res) => {
        return res.render('register', {title: "Registro"});
    },
    processRegister : (req,res) => {
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
        return res.redirect('/')
    },
    login : (req,res) => {
        return res.render('login', {title: "Inicio de sesión"});
    }
}