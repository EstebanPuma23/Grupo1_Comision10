const db = require('../database/models');
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;

module.exports ={
    show: async(req,res) =>{
        let response = {
            meta: {
                link: getURL(req)
            },
            data: req.session.carrito
        }
        return res.status(200).json(response);
    },
    add: async(req,res) =>{
        try {

            let product = await db.Product.findByPk(req.params.id, {
                include: ['category', 'images']
            });

            let item = {
                id: product.id,
                nombre: product.name,
                image: product.images[0].file,
                precio: +product.price,
                categoria: product.category.name,
                cantidad: 1,
                total: +product.price,
            }

            //ORDER QUE HIZO EL PROFESOR
            
            if (req.session.carrito.length == 0) {

                let order = await db.Order.findOne({
                    where: {
                        userId: req.session.userLogin.id,
                        status: 'pending'
                    }
                })
                if (!order) {
                    order = await db.Order.create({
                        userId: req.session.userLogin.id,
                        status: "pending"
                    })
                }

                item = {
                    ...item,
                    orderId: order.id
                }
                req.session.carrito.push(item)

                /* guarda los productos en la tabla carrito */
                await db.Cart.create({
                    userId: req.session.userLogin.id,
                    productId: item.id,
                    quantity: 1
                })
            } else {

                let index = productVerify(req.session.carrito, req.params.id)

                let order = await db.Order.findOne({
                    where: {
                        userId: req.session.userLogin.id,
                        status: 'pending'
                    }
                })

                if (index === -1) {
                    item = {
                        ...item,
                        orderId: order.id
                    }
                    req.session.carrito.push(item)

                    /* guarda los productos en la tabla carrito */
                    await db.Cart.create({
                        userId: order.userId,
                        productId: item.id,
                        quantity: 1
                    })

                } else {

                    let product = req.session.carrito[index];

                    product.cantidad++
                    product.total = product.cantidad * product.precio

                    req.session.carrito[index] = product

                    /* actualiza la cantidad del producto en la tabla carrito */

                    await db.Cart.update(
                        {
                            quantity: product.cantidad
                        },
                        {
                            where: {
                               
                                productId: product.id
                            }
                        }
                    )
                }
            }

            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (error) {

        }
    },
    remove: async(req,res) =>{
        try {
            let index = productVerify(req.session.carrito,req.params.id)

            let product = req.session.carrito[index]

            if(product.cantidad > 1){

                product.cantidad--
                product.total = product.cantidad * product.precio
                req.session.carrito[index] = product   

                /* disminuye la cantidad del producto seleccinado */
                await db.Cart.update(
                    {
                        quantity : product.cantidad
                    },
                    {
                        where : {
                           
                            productId : product.id
                        }
                    }
                )

            }else{
                req.session.carrito.splice(index,1);

                /* elimina el producto de la tabla carrito */
                await db.Cart.destroy({
                    where : {
                        productId : product.id,
                       
                    }
                })
            }

            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)

        }
    },
    empty: async(req,res) =>{

        try {
            await db.Order.destroy({
                where : { 
                    userId : req.session.userLogin.id,
                    status : 'pending'
                }
            })

            req.session.carrito = [];
            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)

        }
    }
}