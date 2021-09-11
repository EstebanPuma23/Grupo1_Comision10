const products = require('../data/products.json');

module.exports = {
    index : (req,res) => {
        return res.render('home');
    },
    store : (req,res) => {
        return res.render('store', { 
            products
        })
    }
}