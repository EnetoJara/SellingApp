'use strict'

const api = require('express').Router()
const checkJWT = require('../middlewares/check-jwt')
const controller = require('../Controllers/mainController')
const async = require('async')

api.get('/products', [ checkJWT ], controller.getProducts)
api.route('/categories')
    .get(controller.getCategories)
    .post([ checkJWT ], controller.postCategories)
api.get('/categories/:id', [ checkJWT ], controller.getCategory)
api.get('/product/:id', [ checkJWT ], controller.getProductById)
api.post('/review', [ checkJWT ], controller.postReviews)
api.post('/payment', [ checkJWT ], controller.postPayment)

module.exports = api
