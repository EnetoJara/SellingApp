'use strict'

const api = require('express').Router()
const controller = require('../Controllers/userController')
const checkJWT = require('../middlewares/check-jwt')

api.post('/signup', controller.signUp)
api.post('/login', controller.login)
api.route('/profile').get([ checkJWT ], controller.getProfile).post([ checkJWT ], controller.postProfile)
api.route('/address').get(checkJWT, controller.getAddress).post(checkJWT, controller.postAddress)
api.get('/orders', [ checkJWT ], controller.myOrders)
api.get('/orders/:id', [ checkJWT ], controller.orders)
module.exports = api