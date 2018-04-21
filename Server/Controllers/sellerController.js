'use strict'

const Product = require('../Models/ProductModel')

function getProduct (req, res, next) {
    Product.find({ owner: req.decoded.user._id })
    .populate('owner').populate('category').exec((err, productsStored) => {
        if (err) return res.status(500).send({ message: 'ERRRO getting Products' })
        else return res.status(200).send({ products: productsStored })
    })
}

function postProduct (req, res, next) {
    console.log(req.file)
    let product = new Product()
    product.owner = req.body.owner
    product.category = req.body.category
    product.title = req.body.title
    product.price = req.body.price
    product.description = req.body.description
    product.image = req.file.location
    product.save()
    return res.status(200).send({ message: 'Seccessfully added the product' })
}

module.exports = {
    getProduct, postProduct
}