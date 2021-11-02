const products = require('../data/products.json');
const fs = require ('fs');
const path = require ('path')

module.exports = {
    index : (req,res) => {
        return res.render('home', {
            products,
            title : "Inicio"
        });
    },
    store : (req,res) => {
        return res.render('store', { 
            products,
            title : "Cesta de compras"
        })
    },
    admin : (req,res) => {
        return res.render('admin',{
            title : "Administración",
            products : JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'))
        })
    }
}