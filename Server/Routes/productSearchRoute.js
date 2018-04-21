'use strict'
const api = require('express').Router()
const controller = require('../Controllers/productController')

api.get('/', controller.getProducts)

module.exports = api