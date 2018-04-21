'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = 3000
const cors = require('cors')
const app = express()

const accountRoute = require('./Routes/accountRoute')
const sellerRoute = require('./Routes/sellerRoute')
const mainRoute = require('./Routes/mainRoute')
const productRoute = require('./Routes/productSearchRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', mainRoute)
app.use('/api/account', accountRoute)
app.use('/api/product', productRoute)
app.use('/api/seller', sellerRoute)


module.exports = app