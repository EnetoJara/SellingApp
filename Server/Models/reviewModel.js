'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RevivewSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    rating: String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('review', RevivewSchema)