const fs = require('fs');
const path = require('path');
const  products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'))

module.exports = {
    detail : (req,res) => {
        return res.render('product-view', {
            product : products.find(product => product.id === +req.params.id),
            title : "Detalle de producto"
        })
    },
    add : (req,res) => {
        return res.render('productAdd', {title: "Agregar producto"})
    },
    store : (req,res) => {
        const {name,descriptiones,price,image} = req.body;
        let product = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            price : +price,
            descriptiones : product.descriptiones,
            image
        }
        products.push(product);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8');
        return res.redirect('/admin')
    },
    edit : (req,res) => {
        return res.render('productEdit',{
            product : products.find(product => product.id === +req.params.id),
            title: "Editar producto"
        })
    },
    update : (req,res) => {
       
        const {name,description,price,image} = req.body;
        let product = products.find(product => product.id === +req.params.id);
        let productModified = {
            id : +req.params.id,
            name : name.trim(),
            price: +price,
            description : product.description,
            image : product.image
        }

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');
        return res.redirect('/admin')
    },

    destroy : (req, res) => {
            let productsModified = products.filter(product => product.id !== +req.params.id)
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified,null,3), 'utf-8')
            return res.redirect('/admin')
        }
}