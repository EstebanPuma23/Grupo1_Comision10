/* const products = require('../data/products.json');
 */const fs = require ('fs');
const path = require ('path')
const db = require('../database/models')
const { Op } = require('sequelize')

module.exports = {
    index : (req,res) => {
        let ofertas = db.Product.findAll({
           where : {
               discount : {[Op.gte] : 20}
           },
           limit: 4,
        })
        let destacados = db.Product.findAll({
            where : {
                price : {[Op.gte] : 100},
                discount : {[Op.lt] : 20 }
            },
            limit : 6,
        })

        Promise.all([ofertas,destacados])

        .then(([ofertas,destacados])=>{
    
             return res.render('home', {
                ofertas,
                destacados,
                title : "Inicio"
            }) 
        })
        .catch(error => console.log(error)) 
    },
    store : (req,res) => {
        return res.render('store', { 
            products,
            title : "Cesta de compras"
        })
    },
    admin : (req,res) => {

        let products = db.Product.findAll({
        })
        let categories = db.Category.findAll()
        Promise.all([products,categories])
            .then(([products,categories])=>{
                return res.render('admin',{
                    title : "Administración",
                    products,
                    categories
                })
            })
            .catch(error => console.log(error))




        
    }
}