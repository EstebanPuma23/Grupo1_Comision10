const fs = require('fs');
const path = require('path');
const { validationResult} = require('express-validator')
/* const  products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8')) */

/* BASE DE DATOS */
const db = require('../database/models');
const { Op } = require('sequelize');
module.exports = {
    detail : (req,res) => {
        let product = db.Product.findByPk(req.params.id)
        let features = db.Feature.findAll({
        where : {
        productId : {
        [Op.substring] : req.params.id
        }
        }
        })
        
            Promise.all([product,features])
        
                 .then(([product, features]) =>{
                     return res.render('product-view', {
                         product,
                         features, 
                         title : 'detalle de producto'
                     })
                 } )
    },
    add : (req,res) => {

        db.Category.findAll()
        .then(categories => {
            return res.render('productAdd', {
                categories,
                title: "Agregar producto"
            })
        })
        .catch(error=> console.log(error))
    },
    store : (req,res) => {
        
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const {name,description,price,feactures, category} = req.body;
            
            db.Product.create({
                name: name.trim(),
                description: description.trim(),
                price: price,
                categoryId: category,
                feactures: feactures.trim(),
                image:  req.file ? req.file.filename : "default-product.jpg"
            })
                .then(product => {
                    res.redirect('/admin')
                })
                .catch(errors => console.log(errors))
        } else {
            errors = errors.mapped()
            if (req.fileValidationError) {
                errors = {
                    ...errors,
                    image: {
                        msg: req.fileValidationError,
                    },
                };
            }
            db.Category.findAll()
            .then(categories => {
                return res.render('productAdd', {
                    categories,
                    errors,
                    title: "Agregar producto",
                    old: req.body
                })
            })
            .catch(error => console.log(error))
        }
    },
    edit : (req,res) => {
        
        let product = db.Product.findByPk(req.params.id)
        let categories = db.Category.findAll()

        Promise.all([product,categories])

        .then(([product,categories]) => {
            return res.render('productEdit', {
                categories,
                product,
                title: "Editar producto"
            })
        })
        .catch(error => console.log(error))

    },
    update : (req,res) => {
         /*return res.send(req.file)*/
         let errors = validationResult(req);
         if (errors.isEmpty()) {
            const {name,description,price} = req.body;
            db.Product.update(
                {
                    name : name.trim(),
                    description : description.trim(),
                    price,
                },
                {
                   where : {
                       id : req.params.id
                   } 
                }
            )
            .then(()=>{
                return res.redirect('/admin')
            })
            
         }else{
            let product = db.Product.findByPk(req.params.id)
            let categories = db.Category.findAll()
            Promise.all([product,categories])
            .then(([product,categories])=>{
                return res.render('productEdit', {
                    categories,
                     product,
                      errors:errors.mapped(),
                })
            })
            .catch(error => console.log(error))
         }
    },
    search : (req, res) => {
        let products = db.Product.findAll({
            where: {
                name : {
                    [ Op.substring]: req.query.keyword
                }
            }
        })
            .then(products => {
                return res.render('product-list',{
                    products,
                    title:'Resultado de la búsqueda'
                })
            })
    },

    list : (req,res)=> {
        let products = db.Product.findAll()
        .then(products => {
            return res.render('product-list', {
                products,
                title : "Listado de productos"
            })
        })
        .catch(error => console.log(error))
    },

    destroy : (req, res) => {
        
        let features = db.Feature.destroy({
            where : {
                productId : req.params.id
            }
        })
        
        let product = db.Product.destroy({
                where : {
                    id : req.params.id,
                }
            })

            Promise.all([features, product])
            .then(([features, product])=> {
                return res.redirect('/admin')
            })
            .catch(error => console.log(error))
        }
}