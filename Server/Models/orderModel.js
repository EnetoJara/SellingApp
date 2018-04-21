'use strict'

const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const Schema = mongoose.Schema

const OrderSchema = Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
    totalPrice: { type: Number, default: 0 },
    products: [{ 
        product: { type: Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 }
    }]
})
OrderSchema.plugin(deepPopulate)
module.exports = mongoose.model('oreder', OrderSchema)