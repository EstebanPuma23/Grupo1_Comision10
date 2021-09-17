const products = require('../data/products.json');

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
    }
}