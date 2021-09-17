const products = require('../data/products.json');
const fs = require ('fs');
const path = require ('path')

module.exports = {
    index : (req,res) => {
        return res.render('home');
    },
    store : (req,res) => {
        return res.render('store', { 
            products
        })
    },
    admin : (req,res) => {
        return res.render('admin',{
            title : "Administración",
            products : JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'))
        })
    }
}