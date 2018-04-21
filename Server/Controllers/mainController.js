'use strict'

const async = require('async')
const config = require('../config')
const stripe = require('stripe')(config.stripeSecretKey)

const Category = require('../Models/categoryModel')
const Product = require('../Models/ProductModel')
const Review = require('../Models/reviewModel')
const Order = require('../Models/orderModel')

function getProducts (req, res, next) {
    const perPage = 10
    const page = req.query.page
    async.parallel([
        function (callback) {
            Product.count({}, (err, count) => { callback(err, count) })
        },
        function (callback) {
            Product.find({}).skip(perPage * page).limit(perPage)
            .populate('category').populate('owner').exec((err, products) => {
                if (err) return next(err)
                else callback(err, products)
            })
        }
    ], function (err, results) {
        const totalProducts = results[0]
        const products = results[1] 
        return res.status(200).send({
            success: true,
            message: 'Category',
            products: products,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)
        })
    })
}

function getCategories (req, res, next) {
    Category.find({}, (err, categories) => {
        if (err) return res.status(500).send({ message: 'ERRROR GETTING CATEGORIES' })
        return res.status(200).send({ categories: categories })
    })
}

function postCategories (req, res, next) {
    let category = new Category()
    category.name = req.body.category
    category.save()
    return res.status(200).send({ message: 'Successfully added' })
}

function getCategory (req, res, next) {
    const perPage = 10
    const page = req.query.page
    async.parallel([
        function (callback) {
            Product.count({ category: req.params.id }, (err, count) => callback(err, count))
        },
        function (callback) {
            Product.find({ category: req.params.id })
            .skip(perPage * page).limit(perPage).populate('category').populate('owner')
            .populate('reviews').exec((err, products) => {
                if (err) return next(err)
                else callback(err, products)
            })
        },
        function (callback) {
            Category.findOne({ _id: req.params.id }, 
                (err, category) => { callback(err, category) })
        }
    ], 
    function (err, results) {
        const totalProducts = results[0]
        const products = results[1]
        const category = results[2]
        return res.status(200).send({ 
            products: products, 
            categoryName: category.name, 
            total: totalProducts, 
            pages: Math.ceil(totalProducts / perPage) 
        })
    })
}

function getProductById (req, res, next) {
    Product.findById({ _id: req.params.id })
    .populate('category').populate('owner')
    .deepPopulate('rewviews.owner').exec((err, product) => {
        if (err) return res.status(500).send({ message: 'ERROR GETTING PRODUCTS' })
        else return res.status(200).send({ product: product })
    })
}

function postReviews (req, res, next) {
    async.waterfall([
        function (callback) {
            Product.findOne({ _id: req.body.productId }, 
                (err, product) => { if (product) callback(err, product) })
        },
        function (product) {
            let review = new Review()
            review.owner = req.decode.user_id
            if (req.body.title) review.title = req.body.title
            if (req.body.description) review.description = req.body.description
            review.rating = req.body.rating
            product.reviews.push(review._id)
            product.save()
            review.save()
            return res.status(200).send({ message: 'Successfully added the review' })
        }
    ])
}

function postPayment (req, res, next) {
    const stripeToken = req.body.stripeToken
    const currentCharges = Math.round(req.body.totalPrice * 100)
    stripe.customers.create({ source: stripeToken.id })
    .then(customer => {
        return stripe.charges.create({
            amount: currentCharges,
            currency: usd,
            customer: customer.id
        })
    }).then(charge => {
        const products = req.body.products
        let order = new Order()
        order.owner = req.decoded.user._id
        order.totalPrice = currentCharges
        products.map(product => {
            order.products.push({ product: product.product, quantity: product.quantity })
        })
        order.save()
        return res.status(200).send({ message: 'Successfully made a payment' })
    }).fail(err => {
        return res.status(500).send({ message: 'ERROR WITH THE PAYMENT' })
    })
}

module.exports = {
    getProducts,
    getCategories,
    postCategories,
    getCategory,
    getProductById,
    postReviews,
    postPayment
}