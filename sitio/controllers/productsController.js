const products = require('../data/products.json');

module.exports = {
    detail : (req,res) => {
        return res.render('product-view', {
            product : products.find(product => product.id === +req.params.id),
        })
    }
}